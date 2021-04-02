package com.loafly.hanghaeblog.controller;

import com.loafly.hanghaeblog.models.Comments;
import com.loafly.hanghaeblog.models.Contents;
import com.loafly.hanghaeblog.repository.ContentsRepository;
import com.loafly.hanghaeblog.dto.ContentsRequestDto;
import com.loafly.hanghaeblog.service.CommentsService;
import com.loafly.hanghaeblog.service.ContentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContentsController {

    private final ContentsRepository contentsRepository;
    private final ContentsService contentsService;
    private final CommentsService commentsService;

    @Autowired
    public ContentsController(ContentsRepository contentsRepository, ContentsService contentsService, CommentsService commentsService){
        this.contentsRepository = contentsRepository;
        this.contentsService = contentsService;
        this.commentsService = commentsService;
    }

    @GetMapping("/api/contents")
    public List<Contents> getContents(){
        return  contentsRepository.findAllByOrderByModifiedAtDesc();
    }

    @PostMapping("/api/contents")
    public Contents createContents(@RequestBody ContentsRequestDto requestDto){
        Contents contents = new Contents(requestDto);
        System.out.println(contents);
        return contentsRepository.save(contents);
    }

    @DeleteMapping("/api/contents/{id}")
    public Long deleteContents(@PathVariable Long id){
        Contents contents = contentsService.getContent(id);
        List<Comments> commentsList = commentsService.getComments(contents);

        for (Comments comments : commentsList){
            commentsService.deleteComments(comments.getId());
        }
        contentsRepository.deleteById(id);
        return id;
    }

    @PutMapping("/api/contents/{id}")
    public Long updateContents(@PathVariable Long id, @RequestBody ContentsRequestDto requestDto){
        contentsService.update(id,requestDto);
        return id;
    }
}
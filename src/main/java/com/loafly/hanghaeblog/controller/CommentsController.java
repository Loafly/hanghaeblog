package com.loafly.hanghaeblog.controller;

import com.loafly.hanghaeblog.dto.CommentsRequestDto;
import com.loafly.hanghaeblog.models.Comments;
import com.loafly.hanghaeblog.models.Contents;
import com.loafly.hanghaeblog.repository.CommentsRepository;
import com.loafly.hanghaeblog.service.CommentsService;
import com.loafly.hanghaeblog.service.ContentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentsController {

    private final CommentsRepository commentsRepository;
    private final CommentsService commentsService;
    private final ContentsService contentsService;

    @Autowired
    public CommentsController(CommentsRepository commentsRepository, CommentsService commentsService, ContentsService contentsService){
        this.commentsRepository = commentsRepository;
        this.commentsService = commentsService;
        this.contentsService = contentsService;
    }

    @GetMapping("/api/comments")
    public List<Comments> getComments(@RequestParam("id") Long id){
        Contents contents = contentsService.getContent(id);
        return commentsService.getComments(contents);
    }

    @PostMapping("/api/comments")
    public Comments createComments(@RequestBody CommentsRequestDto requestDto, @RequestParam("id") Long id){
        Contents contents = contentsService.getContent(id);
        Comments comment = new Comments(requestDto, contents);
        return commentsRepository.save(comment);
    }

    @DeleteMapping("/api/comments/{id}")
    public Long deleteComments(@PathVariable Long id){
        commentsService.deleteComments(id);
        return id;
    }

    @PutMapping("/api/comments/{id}")
    public Long updateComments(@PathVariable Long id, @RequestBody CommentsRequestDto requestDto){
        commentsService.update(id,requestDto);
        return id;
    }

}

package com.loafly.hanghaeblog.controller;

import com.loafly.hanghaeblog.models.Contents;
import com.loafly.hanghaeblog.repository.ContentsRepository;
import com.loafly.hanghaeblog.security.UserDetailsImpl;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class ContentController {

    public final ContentsRepository contentsRepository;

    public ContentController(ContentsRepository contentsRepository){
        this.contentsRepository = contentsRepository;
    }

    @GetMapping("/content")
    public String contentPage(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails, @RequestParam Long id){

        Optional<Contents> contents = contentsRepository.findById(id);

        if (userDetails != null)
        {
            model.addAttribute("username", userDetails.getUsername());
        }
        else
        {
            model.addAttribute("username", "guest");
        }

        model.addAttribute("contentId", contents.get().getId());
        model.addAttribute("contentTitle", contents.get().getTitle());
        model.addAttribute("contentCategory", contents.get().getCategory());
        model.addAttribute("contentUsername", contents.get().getUsername());
        model.addAttribute("contentContent", contents.get().getContent());

        return "content";
    }

    @GetMapping("/content/write")
    public String content_writePage(Model model, @AuthenticationPrincipal UserDetailsImpl userDetails){
        model.addAttribute("username",  userDetails.getUsername());
        return "content_write";
    }
}

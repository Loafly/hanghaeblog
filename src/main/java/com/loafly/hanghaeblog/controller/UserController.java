package com.loafly.hanghaeblog.controller;


import com.loafly.hanghaeblog.dto.SignupRequestDto;
import com.loafly.hanghaeblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원 로그인 페이지
    @GetMapping("/user/login")
    public String login() {
        return "login";
    }

    @GetMapping("/user/login/error")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        System.out.println(model);
        return "login";
    }

    // 회원 가입 페이지
    @GetMapping("/user/signup")
    public String signup() {
        return "signup";
    }

    // 회원 가입 요청 처리
    @PostMapping("/user/signup")
    public String registerUser(SignupRequestDto requestDto) {
        try{
            userService.registerUser(requestDto);
            return "redirect:/user/login";
        } catch (Exception e)
        {
            String str_splite = e.toString().split(":")[1];
            System.out.println(e);
            String error = "";
            if (str_splite.contains("중복된 사용자 ID 가 존재합니다.")){
                error = "Duplicate user ID found.";
            }
            return "redirect:/user/signup/error?text=" + error;
        }
    }

    @GetMapping("/user/signup/error")
    public String signupError(Model model, @RequestParam("text") String text) {
        model.addAttribute("signupError", true);
        model.addAttribute("signupErrorText", text);
        return "signup";
    }

    @GetMapping("/user/forbidden")
    public String forbidden() {
        return "forbidden";
    }


    @GetMapping("/user/kakao/callback")
    public String kakaoLogin(String code) {
        // authorizedCode: 카카오 서버로부터 받은 인가 코드
        userService.kakaoLogin(code);

        return "redirect:/";
    }
}
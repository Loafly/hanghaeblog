package com.loafly.hanghaeblog.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ContentsRequestDto {
    private String username;
    private String category;
    private String title;
    private String content;
}
package com.loafly.hanghaeblog.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class CommentsRequestDto {

    private String username;
    private String comment;

}

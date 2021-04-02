package com.loafly.hanghaeblog.models;

import com.loafly.hanghaeblog.dto.CommentsRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class Comments extends Timestamped{

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String username;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Contents contents;

    @Column(nullable = false)
    private String comment;

    public Comments(CommentsRequestDto requestDto, Contents contents) {
        this.username = requestDto.getUsername();
        this.comment = requestDto.getComment();
        this.contents = contents;
    }

    public void update(CommentsRequestDto requestDto) {
        this.comment = requestDto.getComment();
    }


}
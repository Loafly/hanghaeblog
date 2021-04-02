package com.loafly.hanghaeblog.service;

import com.loafly.hanghaeblog.dto.CommentsRequestDto;
import com.loafly.hanghaeblog.models.Comments;
import com.loafly.hanghaeblog.models.Contents;
import com.loafly.hanghaeblog.repository.CommentsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;

    public CommentsService(CommentsRepository commentsRepository)
    {
        this.commentsRepository = commentsRepository;
    }

    public List<Comments> getComments(Contents contents) {
        return commentsRepository.findAllByContentsOrderByModifiedAtDesc(contents);
    }

    @Transactional
    public Long update(Long id, CommentsRequestDto requestDto) {
        Comments comments = commentsRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        comments.update(requestDto);
        return comments.getId();
    }

    @Transactional
    public Long deleteComments(Long id){
        commentsRepository.deleteById(id);
        return id;
    }
}

package com.loafly.hanghaeblog.repository;

import com.loafly.hanghaeblog.models.Comments;
import com.loafly.hanghaeblog.models.Contents;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllByContentsOrderByModifiedAtDesc(Contents contents);
}

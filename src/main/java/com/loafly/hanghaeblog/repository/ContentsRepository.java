package com.loafly.hanghaeblog.repository;

import com.loafly.hanghaeblog.models.Contents;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentsRepository extends JpaRepository<Contents, Long> {
    List<Contents> findAllByOrderByModifiedAtDesc();

    Optional<Contents> findById(Long id);
}

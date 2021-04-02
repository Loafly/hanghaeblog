package com.loafly.hanghaeblog.service;

import com.loafly.hanghaeblog.models.Contents;
import com.loafly.hanghaeblog.repository.ContentsRepository;
import com.loafly.hanghaeblog.dto.ContentsRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
@RequiredArgsConstructor

public class ContentsService {
    private final ContentsRepository contentsRepository;

    @Transactional
    public Long update(Long id, ContentsRequestDto requestDto) {
        Contents contents = contentsRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        contents.update(requestDto);
        return contents.getId();
    }

    public Contents getContent(Long id){
        Optional<Contents> content = contentsRepository.findById(id);
        return content.get();
    }

}

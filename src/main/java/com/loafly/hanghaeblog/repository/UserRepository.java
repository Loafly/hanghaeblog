package com.loafly.hanghaeblog.repository;

import com.loafly.hanghaeblog.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByKakaoId(Long kakaoId);
    // 추가! Email 주소가 같은 사용자 조회
    Optional<User> findByEmail(String email);
}

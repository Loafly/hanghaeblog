package com.loafly.hanghaeblog.service;

import com.loafly.hanghaeblog.dto.SignupRequestDto;
import com.loafly.hanghaeblog.models.User;
import com.loafly.hanghaeblog.models.UserRole;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    UserService userService;

    @Test
    @DisplayName("updateProduct() 에 의해 관심 가격이 3만원으로 변경되는지 확인")
    void updateProduct_Normal() {
        // given

        Long userId = 12345L;
        User user1 = new User();
        user1.setUsername("user1");
        user1.setPassword("password1");
        user1.setEmail("user1@sprata.com");
        user1.setRole(UserRole.USER);

//        SignupRequestDto signupRequestDto = new SignupRequestDto();
//
//        signupRequestDto.setUsername(user);
//
//        when(userService.registerUser())
//                .thenReturn(Optional.of(product));
//
//        // when
//        Product result = productService.updateProduct(productId, requestMyPriceDto);
//
//        // then
//        assertEquals(myprice, result.getMyprice());
    }
}
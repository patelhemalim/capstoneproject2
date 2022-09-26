package com.devMountain.capstoneproject2.services;

import com.devMountain.capstoneproject2.dtos.UserDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    @Transactional
    List<String> addUser(UserDto userDto);


    @Transactional
    List<String> userLogin(UserDto userDto);
}

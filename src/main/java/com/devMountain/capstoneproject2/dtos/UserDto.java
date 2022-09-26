package com.devMountain.capstoneproject2.dtos;


import com.devMountain.capstoneproject2.entites.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

    private Long id;
    private String username;
    private String password;
    private String emailId;
    private Set<PortfolioDto> portfolioDtoSet = new HashSet<>();


    public UserDto(User user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }
        if (user.getUsername() != null) {
            this.username = user.getUsername();
        }
        if (user.getPassword() != null) {
            this.password = user.getPassword();
        }
        if(user.getEmailId() != null) {
            this.emailId = user.getEmailId();
        }
    }
}

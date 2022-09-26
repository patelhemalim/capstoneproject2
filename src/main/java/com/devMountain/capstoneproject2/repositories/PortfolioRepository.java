package com.devMountain.capstoneproject2.repositories;


import com.devMountain.capstoneproject2.entites.Portfolio;
import com.devMountain.capstoneproject2.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {
    List<Portfolio> findAllByUserEquals(User user);
}

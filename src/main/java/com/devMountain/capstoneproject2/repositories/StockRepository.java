package com.devMountain.capstoneproject2.repositories;


import com.devMountain.capstoneproject2.entites.Portfolio;
import com.devMountain.capstoneproject2.entites.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long> {
    List<Stock> findAllByPortfolioEquals(Portfolio portfolio);

}

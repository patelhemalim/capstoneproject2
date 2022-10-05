package com.devMountain.capstoneproject2.services;

import com.devMountain.capstoneproject2.dtos.StockDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface StockService {
    @Transactional
    void addStock(StockDto stockDto);

    @Transactional
    void deleteStockById(Long stockId);

    @Transactional
    List<StockDto> getAllStocksByPortfolioId(Long portfolioId);

    @Transactional
    Optional<StockDto> getStockById(Long stockId);
}

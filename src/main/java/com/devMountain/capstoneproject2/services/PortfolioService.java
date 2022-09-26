package com.devMountain.capstoneproject2.services;

import com.devMountain.capstoneproject2.dtos.PortfolioDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PortfolioService {
    @Transactional
    void addPortfolio(PortfolioDto portfolioDto, Long userId);
    @Transactional
    void deletePortfolioById(Long portfolioId);
    @Transactional
    List<PortfolioDto> getAllPortfoliosByUserId(Long userId);
    @Transactional
    Optional<PortfolioDto> getPortfolioById(Long portfolioId);

    List<PortfolioDto> getAllPortfolioSummaryByUserId(Long userId);
}

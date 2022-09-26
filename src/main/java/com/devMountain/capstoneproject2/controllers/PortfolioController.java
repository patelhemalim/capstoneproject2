package com.devMountain.capstoneproject2.controllers;


import com.devMountain.capstoneproject2.dtos.PortfolioDto;
import com.devMountain.capstoneproject2.services.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;


    @PostMapping("/add/{userId}")
    public void addPortfolio (@RequestBody PortfolioDto portfolioDto,@PathVariable Long userId){
        portfolioService.addPortfolio(portfolioDto,userId);
    }


    @GetMapping("/get_by_user/{userId}")
    public List<PortfolioDto> getPortfolioByUser (@PathVariable Long userId){
        return portfolioService.getAllPortfoliosByUserId(userId);
    }

    @GetMapping("/get_summary_by_user/{userId}")
    public List<PortfolioDto> getPortfolioSummaryByUser (@PathVariable Long userId){
        return portfolioService.getAllPortfolioSummaryByUserId(userId);
    }


    @DeleteMapping("delete_by_id/{portfolioId}")
    public void deletePortfolioById (@PathVariable Long portfolioId){
        portfolioService.deletePortfolioById(portfolioId);
    }


    @GetMapping("/get_by_id/{portfolioId}")
    public Optional<PortfolioDto> getPortfolioById(@PathVariable Long portfolioId){
        return portfolioService.getPortfolioById(portfolioId);
    }





}

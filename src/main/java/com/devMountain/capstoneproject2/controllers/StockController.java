package com.devMountain.capstoneproject2.controllers;


import com.devMountain.capstoneproject2.dtos.StockDto;
import com.devMountain.capstoneproject2.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stocks")
public class StockController {

    @Autowired
    private StockService stockService;


    @PostMapping("/add/{portfolioId}")
    public void addStock(@RequestBody StockDto stockDto, @PathVariable Long portfolioId){
       stockService.addStock(stockDto,portfolioId);
    }


    @GetMapping("/get_by_portfolio/{portfolioId}")
    public List<StockDto> getStocksByPortfolio(@PathVariable Long portfolioId){
        return  stockService.getAllStocksByPortfolioId(portfolioId);
    }


    @DeleteMapping("/delete_by_id/{stockId}")
    public void deleteStockById(@PathVariable Long stockId){
        stockService.deleteStockById(stockId);
    }


    @GetMapping("/get_by_id/{stockId}")
    public Optional<StockDto> getStockById(@PathVariable Long stockId){
        return stockService.getStockById(stockId);
    }
}

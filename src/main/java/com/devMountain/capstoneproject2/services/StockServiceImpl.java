package com.devMountain.capstoneproject2.services;


import com.devMountain.capstoneproject2.dtos.PortfolioDto;
import com.devMountain.capstoneproject2.dtos.StockDto;
import com.devMountain.capstoneproject2.entites.Portfolio;
import com.devMountain.capstoneproject2.entites.Stock;
import com.devMountain.capstoneproject2.entites.User;
import com.devMountain.capstoneproject2.repositories.PortfolioRepository;
import com.devMountain.capstoneproject2.repositories.StockRepository;
import com.devMountain.capstoneproject2.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public  void addStock(StockDto stockDto) {
        if (stockDto.getPortfolioId() != null) {
            Optional<Portfolio> portfolioOptional = portfolioRepository.findById(stockDto.getPortfolioId());
            Stock stock = new Stock(stockDto);
            portfolioOptional.ifPresent(stock::setPortfolio);
            stockRepository.saveAndFlush(stock);
        } else {
            Optional<User> userOptional = userRepository.findById(stockDto.getUserId());
            Portfolio portfolio = new Portfolio(new PortfolioDto(null, stockDto.getPortfolioName(), stockDto.getUserId(), null));
            userOptional.ifPresent(portfolio::setUser);
            Portfolio newPortfolio = portfolioRepository.saveAndFlush(portfolio);
            Stock stock = new Stock(stockDto);
            stock.setPortfolio(newPortfolio);
            stockRepository.saveAndFlush(stock);
        }
    }


    @Override
    @Transactional
    public void deleteStockById(Long stockId){
        Optional<Stock> stockOptional = stockRepository.findById(stockId);
        stockOptional.ifPresent(stock -> stockRepository.delete(stock));
    }



    @Override
    @Transactional
    public List<StockDto> getAllStocksByPortfolioId(Long portfolioId){
        Optional<Portfolio> portfolioOptional = portfolioRepository.findById(portfolioId);
        if(portfolioOptional.isPresent()){
            List<Stock> stockList = stockRepository.findAllByPortfolioEquals(portfolioOptional.get());
            return stockList.stream().map(stock -> new StockDto(stock)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }


    @Override
    @Transactional
    public Optional<StockDto> getStockById(Long stockId){
        Optional<Stock> stockOptional = stockRepository.findById(stockId);
        if(stockOptional.isPresent()){
            return Optional.of(new StockDto(stockOptional.get()));
        }
        return Optional.empty();
    }
}

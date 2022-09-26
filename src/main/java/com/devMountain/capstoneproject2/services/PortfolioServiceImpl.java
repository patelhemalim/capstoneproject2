package com.devMountain.capstoneproject2.services;


import com.devMountain.capstoneproject2.dtos.PortfolioDto;
import com.devMountain.capstoneproject2.dtos.StockDto;
import com.devMountain.capstoneproject2.dtos.StockDetail;
import com.devMountain.capstoneproject2.entites.Portfolio;
import com.devMountain.capstoneproject2.entites.Response;
import com.devMountain.capstoneproject2.entites.User;
import com.devMountain.capstoneproject2.repositories.PortfolioRepository;
import com.devMountain.capstoneproject2.repositories.UserRepository;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PortfolioServiceImpl implements PortfolioService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private StockService stockService;

    @Override
    @Transactional
    public void addPortfolio(PortfolioDto portfolioDto, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Portfolio portfolio = new Portfolio(portfolioDto);
        userOptional.ifPresent(portfolio::setUser);
        portfolioRepository.saveAndFlush(portfolio);
    }


    @Override
    @Transactional
    public void deletePortfolioById(Long portfolioId) {
        Optional<Portfolio> portfolioOptional = portfolioRepository.findById(portfolioId);
        portfolioOptional.ifPresent(portfolio -> portfolioRepository.delete(portfolio));
    }

    @Override
    @Transactional
    public List<PortfolioDto> getAllPortfoliosByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Portfolio> portfolioList = portfolioRepository.findAllByUserEquals(userOptional.get());

            return portfolioList.stream().map(portfolio -> new PortfolioDto(portfolio.getId(), portfolio.getPortfolioName(), userOptional.get().getId(),
                    stockService.getAllStocksByPortfolioId(portfolio.getId()))).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
    @Override
    @Transactional
    public Optional<PortfolioDto> getPortfolioById(Long portfolioId) {
        Optional<Portfolio> portfolioOptional = portfolioRepository.findById(portfolioId);
        if (portfolioOptional.isPresent()) {
            return Optional.of(new PortfolioDto(portfolioOptional.get()));
        }
        return Optional.empty();
    }

    @Override
    public List<PortfolioDto> getAllPortfolioSummaryByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<Portfolio> portfolioList = portfolioRepository.findAllByUserEquals(userOptional.get());
            List<PortfolioDto> portfolios = portfolioList.stream().map(portfolio -> new PortfolioDto(portfolio.getId(), portfolio.getPortfolioName(), userOptional.get().getId(),
                    stockService.getAllStocksByPortfolioId(portfolio.getId()))).collect(Collectors.toList());

            List<String> symbols = new ArrayList<>();

            for(int i = 0; i < portfolios.size();i++){
                List<StockDto> stocks = portfolios.get(i).getStockDto();
                stocks.forEach(stock -> symbols.add(stock.getSymbol()));
            }
            List<StockDetail> stockDetails = getStockPrices(symbols);

            for(int i = 0; i < portfolios.size();i++){
                List<StockDto> stocks = portfolios.get(i).getStockDto();
                for(int j=0; j<stocks.size();j++) {
                    StockDto stock = stocks.get(j);
                    Optional<StockDetail> matchingStockDetail = stockDetails.stream().filter(stockDetail -> stockDetail.getSymbol().equalsIgnoreCase(stock.getSymbol())).findFirst();
                    if (matchingStockDetail.isPresent()){
                        stock.setCurrentPrice(matchingStockDetail.get().getCurrentPrice());
                        stock.setDisplayName(matchingStockDetail.get().getDisplayName());
                    }
                }
            }
            return portfolios;
        }
        return Collections.emptyList();
    }


    public List<StockDetail> getStockPrices(List<String> stocks){
        RestTemplate restTemplate = new RestTemplate();
        String financeURL
                = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=" + StringUtils.join(stocks);
        ResponseEntity<Response> response
                = restTemplate.getForEntity(financeURL, Response.class);
        System.out.println(response);
        List<StockDetail> stockDetailList = response.getBody().getQuoteResponse().getResult().stream().map(result -> new StockDetail(result.getSymbol(),result.getDisplayName(),result.getRegularMarketPrice())).collect(Collectors.toList());
        System.out.println(stockDetailList);
        return stockDetailList;
    }

}

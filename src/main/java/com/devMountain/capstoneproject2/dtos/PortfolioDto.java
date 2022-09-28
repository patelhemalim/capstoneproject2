package com.devMountain.capstoneproject2.dtos;


import com.devMountain.capstoneproject2.entites.Portfolio;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDto implements Serializable {

    private Long id;
    private String portfolioName;
    private Long userId;
    private List<StockDto> stockDto = new ArrayList<>();
    private Double totalGainLoss;
    private Double totalPercentGainLoss;
    private Double currentValue;
    private Double avgCostBasisTotal;

    public PortfolioDto(Portfolio portfolio){
        if(portfolio.getId() != null){
            this.id = portfolio.getId();
        }
        if(portfolio.getPortfolioName() != null){
            this.portfolioName = portfolio.getPortfolioName();
        }
    }

    public PortfolioDto(Long id, String portfolioName, Long userId, List<StockDto> stockDto) {
        if( id != null){
            this.id = id;
        }
        if(portfolioName != null){
            this.portfolioName = portfolioName;
        }
        if(userId != null){
            this.userId = userId;
        }
        if(stockDto != null){
            this.stockDto = stockDto;
        }
    }
}

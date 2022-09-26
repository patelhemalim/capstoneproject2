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

    public PortfolioDto(Portfolio portfolio){
        if(portfolio.getId() != null){
            this.id = portfolio.getId();
        }
        if(portfolio.getPortfolioName() != null){
            this.portfolioName = portfolio.getPortfolioName();
        }
    }
}

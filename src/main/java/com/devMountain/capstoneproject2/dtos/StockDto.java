package com.devMountain.capstoneproject2.dtos;


import com.devMountain.capstoneproject2.entites.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDto implements Serializable {

    private Long id;
    private String symbol;
    private String displayName;
    private double currentPrice;
    private double price;
    private int numberOfStocks;
    private Date purchaseDate;
    private double currentValue;
    private double avgCostBasisTotal;
    private double totalGainLoss;
    private double percentTotalGainLoss;
    //private PortfolioDto portfolioDto;


    public  StockDto(Stock stock){
        if(stock.getId() != null){
            this.id = stock.getId();
        }
        if(stock.getSymbol() != null){
            this.symbol = stock.getSymbol();
        }
        if(stock.getPrice() >= 0.0 ){
            this.price = stock.getPrice();
        }

        if(stock.getNumberOfStocks() > 0){
            this.numberOfStocks = stock.getNumberOfStocks();
        }

        if(stock.getPurchaseDate() != null){
            this.purchaseDate = stock.getPurchaseDate();
        }
    }


}

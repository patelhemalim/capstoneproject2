package com.devMountain.capstoneproject2.entites;

import com.devMountain.capstoneproject2.dtos.StockDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "STOCKS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "symbol")
    private String symbol;


    @Column(name = "stock_purchased_price")
    private double price;


    @Column(name = "number_of_stocks")
    private int numberOfStocks;

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date purchaseDate;


    @ManyToOne
    @JsonBackReference
    private Portfolio portfolio;

    public Stock(StockDto stockDto) {
        if (stockDto.getSymbol() != null) {
            this.symbol = stockDto.getSymbol();
        }
        if (stockDto.getPrice() > 0.0) {
            this.price = stockDto.getPrice();
        }
        if (stockDto.getNumberOfStocks() > 0) {
            this.numberOfStocks = stockDto.getNumberOfStocks();
        }
        if (stockDto.getPurchaseDate() != null) {
            this.purchaseDate = stockDto.getPurchaseDate();
        }
    }
}

package com.devMountain.capstoneproject2.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDetail {
    private String symbol;
    private String displayName;
    private Double currentPrice;
}

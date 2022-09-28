package com.devMountain.capstoneproject2.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummaryDto implements Serializable {

    private List<PortfolioDto> portfolioDtoList;
    private Double currentValue;
    private Double avgCostBasisTotal;
    private Double totalGainLoss;
    private Double percentTotalGainLoss;
}

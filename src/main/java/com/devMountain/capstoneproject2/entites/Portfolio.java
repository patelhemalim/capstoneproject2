package com.devMountain.capstoneproject2.entites;
import com.devMountain.capstoneproject2.dtos.PortfolioDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "PORTFOLIOS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Portfolio {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "portfolio_name")
    private  String portfolioName;

    @ManyToOne
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy="Portfolio", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Stock> stockSet = new HashSet<>();


    public Portfolio(PortfolioDto portfolioDto){
        if(portfolioDto.getPortfolioName() != null){
            this.portfolioName = portfolioDto.getPortfolioName();
        }
    }


}

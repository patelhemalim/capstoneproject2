//package com.devMountain.capstoneproject2.controllers;
//
//import net.minidev.json.JSONObject;
//import org.junit.jupiter.api.Assertions;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.test.web.server.LocalServerPort;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//class StockControllerTest {
//
//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;
//
//
//    @Test
//    public void add_stock_works()
//        throws  Exception {
//            JSONObject json = new JSONObject();
//            json.put("portfolioId", "7");
//            json.put("symbol", "TGT");
//            json.put("purchaseDate", "2022-06-18");
//            json.put("price", "50");
//            json.put("numberOfStocks", "1");
//
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//
//            HttpEntity<String> entity = new HttpEntity<String>(json.toString(), headers);
//           String jsonObject = restTemplate.postForObject("http://localhost:" + port + "/api/v1/stocks/add", entity, String.class);
//
//
//        System.out.println(jsonObject);
//        assertNotNull(jsonObject);
////        assertEquals("/home.html", jsonObject.get(0));
//        assertEquals("1", jsonObject.get(0));
//
//        }
//    }


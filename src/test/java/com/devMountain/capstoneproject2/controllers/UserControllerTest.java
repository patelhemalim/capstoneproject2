package com.devMountain.capstoneproject2.controllers;

import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void login_works()
            throws Exception {
        JSONObject json = new JSONObject();
        json.put("username","minesh");
        json.put("password","minesh");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(json.toString() ,headers);
        List<String> jsonObject = restTemplate.postForObject("http://localhost:" + port + "/api/v1/users/login", entity, List.class);

        System.out.println(jsonObject);
        Assertions.assertNotNull(jsonObject);
        assertEquals("/overview.html", jsonObject.get(0));
        assertEquals("1", jsonObject.get(1));

    }

    @Test
    public void register_works()
            throws Exception {
        JSONObject json = new JSONObject();
        json.put("username","minesh1");
        json.put("password","minesh1");
        json.put("emailId","minesh1@gmail.com");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(json.toString() ,headers);
        List<String> jsonObject = restTemplate.postForObject("http://localhost:" + port + "/api/v1/users/register", entity, List.class);

        System.out.println(jsonObject);
        Assertions.assertNotNull(jsonObject);
        assertEquals("/home.html", jsonObject.get(0));
        //assertEquals("1", jsonObject.get(1));

    }
}
package com.payTabs.System2.Controller;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustemS2 {

    @PostMapping("/s2")
    public ResponseEntity<String> system2(){
        System.out.println("System2 from");
        return ResponseEntity.ok("success");
    }
}

package com.payTabs.Assignment.Controller;

import com.payTabs.Assignment.DTO.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerRequest {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/customerrequests1")
    public ResponseEntity<String> user1(@RequestBody TransactionRequest transactionRequest) {

        // Validate Card Number
        if (transactionRequest.getCardNumber() == null ||
                transactionRequest.getCardNumber().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Card Number Required");
        }

        // Validate PIN
        if (transactionRequest.getPin() == null ||
                transactionRequest.getPin().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("PIN Required");
        }

        // Validate Amount
        if (transactionRequest.getAmount() <= 0) {

            return ResponseEntity.badRequest()
                    .body("Invalid Amount");
        }

        // Validate Transaction Type
        if (!transactionRequest.getTransactionType().equalsIgnoreCase("withdrawal")
                && !transactionRequest.getTransactionType().equalsIgnoreCase("top_up")) {

            return ResponseEntity.badRequest()
                    .body("Invalid Transaction Type");
        }

        // Card Range Validation
        if (!transactionRequest.getCardNumber().startsWith("4")) {

            return ResponseEntity.badRequest()
                    .body("Card Range Not Supported");
        }

        try {

            String url = "http://localhost:8081/card/validation";

            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    transactionRequest,
                    String.class
            );

            return ResponseEntity
                    .status(response.getStatusCode())
                    .body(response.getBody());

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("System 2 Error : " + e.getMessage());

        }

    }

}
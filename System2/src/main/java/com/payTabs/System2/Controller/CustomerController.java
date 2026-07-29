package com.payTabs.System2.Controller;

import com.payTabs.System2.Entity.Transaction;
import com.payTabs.System2.Service.CardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CardService cardService;

    public CustomerController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/balance/{cardNumber}")
    public Double  getBalance(@PathVariable String cardNumber) {
        return cardService.getCustomerBalance(cardNumber);
    }

    @GetMapping("/history/{cardNumber}")
    public List<Transaction> getHistory(@PathVariable String cardNumber) {
        return cardService.getCustomerHistory(cardNumber);
    }
}
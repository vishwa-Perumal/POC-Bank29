package com.payTabs.System2.Controller;

import com.payTabs.System2.Entity.Transaction;
import com.payTabs.System2.Service.CardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CardService cardService;

    public AdminController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return cardService.getAllTransactions();
    }
}
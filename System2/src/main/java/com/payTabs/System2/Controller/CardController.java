package com.payTabs.System2.Controller;

import com.payTabs.System2.Utils.HashUtil;
import com.payTabs.System2.Utils.TransactionRequest;
import com.payTabs.System2.entity.Card;
import com.payTabs.System2.Service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService service;

    public CardController(CardService service) {
        this.service = service;
    }

//    @PostMapping("/validation")
//    public ResponseEntity<String> getCard(@RequestBody Card card) {
//        return service.findCard(card.getCardNumber());
//    }

    @PostMapping("/validation")
    public ResponseEntity<String> validateCard(@RequestBody TransactionRequest request) {
        return service.validateCard(request);

    }

    @RestController
    @RequestMapping("/hash")
    public class HashController {
        @GetMapping("/{pin}")
        public String hash(@PathVariable String pin) {
            return HashUtil.sha256(pin);
        }
    }

}
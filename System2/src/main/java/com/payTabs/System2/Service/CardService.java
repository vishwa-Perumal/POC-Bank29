package com.payTabs.System2.Service;

import com.payTabs.System2.Entity.Transaction;
import com.payTabs.System2.Repository.CardRepository;
import com.payTabs.System2.Repository.TransactionRepository;
import com.payTabs.System2.Utils.HashUtil;
import com.payTabs.System2.Utils.TransactionRequest;
import com.payTabs.System2.entity.Card;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository repository;
    private final SaveTransaction saveTransaction;
    private final TransactionRepository transactionRepository;

    public CardService(CardRepository repository,
                       SaveTransaction saveTransaction, TransactionRepository transactionRepository) {
        this.repository = repository;
        this.saveTransaction = saveTransaction;
        this.transactionRepository = transactionRepository;
    }

    public ResponseEntity<String> validateCard(TransactionRequest request) {

        // Check Card
        String hashedCardNumber = HashUtil.sha256(request.getCardNumber());
        Card card = repository.findById(hashedCardNumber).orElse(null);

        if(card == null){
            return ResponseEntity.badRequest()
                    .body("FAILED : Invalid Card");
        }

        // Check PIN
        String inputHash = HashUtil.sha256(request.getPin());

        if (!inputHash.equals(card.getPinHash())) {
            return ResponseEntity.badRequest().body("FAILED : Invalid PIN");
        }

        // Withdrawal
        if (request.getTransactionType().equalsIgnoreCase("withdrawal")) {
            if (request.getAmount() > card.getBalance()) {
                return ResponseEntity.badRequest()
                        .body("FAILED : Insufficient Balance");
            }

            card.setBalance(card.getBalance() - request.getAmount());
            repository.save(card);

            // Save Transaction
            saveTransaction.saveTransaction(card, request);

            return ResponseEntity.ok(
                    "SUCCESS : Withdrawal Completed\nCurrent Balance : "
                            + card.getBalance());
        }

        // Top Up
        if (request.getTransactionType().equalsIgnoreCase("top_up")) {

            card.setBalance(card.getBalance() + request.getAmount());
            repository.save(card);

            // Save Transaction
            saveTransaction.saveTransaction(card, request);

            return ResponseEntity.ok(
                    "SUCCESS : Top Up Completed\nCurrent Balance : "
                            + card.getBalance());
        }

        // Invalid Transaction Type
        return ResponseEntity.badRequest()
                .body("FAILED : Invalid Transaction Type");
    }

    public Double getCustomerBalance(String cardNumber) {

        Card card = repository.findById(cardNumber).orElse(null);

        if (card == null) {
            return null;
        }

        return card.getBalance();
    }

    public List<Transaction> getCustomerHistory(String cardNumber){

        return transactionRepository.findByCardNumber(cardNumber);

    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

}
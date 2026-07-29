package com.payTabs.System2.Service;

import com.payTabs.System2.Entity.Transaction;
import com.payTabs.System2.Repository.TransactionRepository;
import com.payTabs.System2.Utils.TransactionRequest;
import com.payTabs.System2.entity.Card;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SaveTransaction {

    private final TransactionRepository transactionRepository;

    public SaveTransaction(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void saveTransaction(Card card,
                                TransactionRequest request) {

        Transaction tx = new Transaction();

        tx.setCardNumber(card.getCardNumber());
        tx.setCustomerName(card.getCustomerName());
        tx.setTransactionType(request.getTransactionType().toUpperCase());
        tx.setAmount(request.getAmount());
        tx.setStatus("SUCCESS");
        tx.setTransactionTime(LocalDateTime.now());

        transactionRepository.save(tx);
    }
}
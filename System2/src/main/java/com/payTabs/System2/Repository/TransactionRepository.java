package com.payTabs.System2.Repository;

import com.payTabs.System2.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByCardNumber(String cardNumber);

}
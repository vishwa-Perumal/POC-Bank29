package com.payTabs.System2.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CARD")
public class Card {

    @Id
    private String cardNumber;
    private String pinHash;
    private double balance;
    private String role;
    private String customerName;

    public Card() {
    }

    public String getCardNumber() {
        return cardNumber;
    }
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    public String getPinHash() {
        return pinHash;
    }
    public void setPinHash(String pinHash) {
        this.pinHash = pinHash;
    }
    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
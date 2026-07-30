import axios from "axios";

const API = axios.create();

export const submitTransaction = (data) =>
    API.post(
        "http://localhost:8080/customerrequests1",
        data
    );

export const getBalance = (cardNumber) =>
    API.get(
        `http://localhost:8081/customer/balance/${cardNumber}`
    );

export const getHistory = (cardNumber) =>
    API.get(
        `http://localhost:8081/customer/history/${cardNumber}`
    );

export const getAllTransactions = () =>
    API.get(
        "http://localhost:8081/admin/transactions"
    );
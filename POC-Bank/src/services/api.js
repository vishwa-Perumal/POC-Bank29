import axios from "axios";

const API = axios.create();

export const checkBalanceApi = (cardNumber) =>
  API.get(
    `http://localhost:8081/customer/balance/${cardNumber}`
  );

export const submitTransactionApi = (data) =>
  API.post(
    "http://localhost:8080/customerrequests1",
    data
  );

export const getHistoryApi = (cardNumber) =>
  API.get(
    `http://localhost:8081/customer/history/${cardNumber}`
  );

export const getAllTransactionsApi = () =>
  API.get(
    "http://localhost:8081/admin/transactions"
  );
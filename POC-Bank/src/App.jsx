import { useState } from "react";
import {
  checkBalanceApi,
  submitTransactionApi,
  getHistoryApi,
  getAllTransactionsApi
} from "./services/api";

import Home from "./components/Home";
import Customer from "./components/Customer";
import Admin from "./components/Admin";

function App() {

  const [page, setPage] = useState("home");

  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("withdrawal");

  const [balance, setBalance] = useState("");
  const [history, setHistory] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  const checkBalance = async () => {

    try {

      const response = await checkBalanceApi(cardNumber);

      setBalance(response.data);

    } catch {

      alert("Customer Not Found");

    }

  };

  const submitTransaction = async () => {

    try {

      const response = await submitTransactionApi({

        cardNumber,
        pin,
        transactionType,
        amount: Number(amount)

      });

      alert(response.data);

      checkBalance();

    } catch (error) {

      if (error.response) {

        if (typeof error.response.data === "string") {

          alert(error.response.data);

        } else {

          alert(JSON.stringify(error.response.data));

        }

      } else {

        alert(error.message);

      }

    }

  };

  const getHistory = async () => {

    try {

      const response = await getHistoryApi(cardNumber);

      setHistory(response.data);

    } catch {

      alert("Unable to Load History");

    }

  };

  const getAllTransactions = async () => {

    try {

      const response = await getAllTransactionsApi();

      setAllTransactions(response.data);

    } catch {

      alert("Unable to Load Transactions");

    }

  };

  return (

    <div className="app-container">

      {page === "home" && (

        <Home
          setPage={setPage}
          getAllTransactions={getAllTransactions}
        />

      )}

      {page === "customer" && (

        <Customer

          cardNumber={cardNumber}
          setCardNumber={setCardNumber}

          pin={pin}
          setPin={setPin}

          amount={amount}
          setAmount={setAmount}

          transactionType={transactionType}
          setTransactionType={setTransactionType}

          balance={balance}

          history={history}

          checkBalance={checkBalance}
          submitTransaction={submitTransaction}
          getHistory={getHistory}

          setPage={setPage}

        />

      )}

      {page === "admin" && (

        <Admin

          allTransactions={allTransactions}

          getAllTransactions={getAllTransactions}

          setPage={setPage}

        />

      )}

    </div>

  );

}

export default App;
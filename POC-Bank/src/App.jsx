import { useState } from "react";
import axios from "axios";

function App() {

  // Page Navigation
  const [page, setPage] = useState("home");

  // Customer Form Data
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("withdrawal");

  // Customer Data
  const [balance, setBalance] = useState("");
  const [history, setHistory] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  // ------------------------------
  // Check Balance
  // ------------------------------
  const checkBalance = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8081/customer/balance/${cardNumber}`
      );

      setBalance(response.data);

    } catch (error) {

      alert("Customer Not Found");

    }

  };

  // ------------------------------
  // Submit Transaction
  // ------------------------------
  const submitTransaction = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/customerrequests1",
        {
          cardNumber: cardNumber,
          pin: pin,
          transactionType: transactionType,
          amount: Number(amount)
        }
      );

      alert(response.data);

      checkBalance();

    } catch (error) {

      if (error.response) {

    console.log(error.response.data);

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

  // ------------------------------
  // Transaction History
  // ------------------------------
  const getHistory = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8081/customer/history/${cardNumber}`
      );

      setHistory(response.data);

    } catch (error) {

      alert("Unable to Load History");

    }

  };

  // ------------------------------
// Admin - Get All Transactions
// ------------------------------
const getAllTransactions = async () => {

  try {

    const response = await axios.get(
      "http://localhost:8081/admin/transactions"
    );

    setAllTransactions(response.data);

  } catch (error) {

    alert("Unable to Load Transactions");

  }

};

  return (

    <div>

      {/* Home */}

      {page === "home" && (

        <>

          <h1>🏦 Banking System</h1>

          <button onClick={() => setPage("customer")}>
            Customer
          </button>

          <button onClick={() => {
              setPage("admin");
              getAllTransactions();
            }}
          >
           Admin
          </button>

        </>

      )}

      {/* Customer */}

      {page === "customer" && (

        <>

          <h1>Customer Portal</h1>

          <br />

          <input
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <br /><br />

          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >

            <option value="withdrawal">
              Withdrawal
            </option>

            <option value="top_up">
              Top Up
            </option>

          </select>

          <br /><br />

          <button onClick={checkBalance}>
            Check Balance
          </button>

          <button onClick={submitTransaction}>
            Submit Transaction
          </button>

          <button onClick={getHistory}>
            Transaction History
          </button>

          <br /><br />

          <h3>
            Balance : {balance}
          </h3>

          <hr />

          <h2>Transaction History</h2>

          <table border="1" cellPadding="10">

            <thead>

              <tr>

                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>

              </tr>

            </thead>

            <tbody>

              {history.map((tx) => (

                <tr key={tx.id}>

                  <td>{tx.transactionType}</td>

                  <td>{tx.amount}</td>

                  <td>{tx.status}</td>

                  <td>{tx.transactionTime}</td>

                </tr>

              ))}

            </tbody>

          </table>

          <br />

          <button onClick={() => setPage("home")}>
            Back
          </button>

        </>

      )}

      {/* Admin */}

      {/* Admin */}

{page === "admin" && (

  <>

    <h1>Admin Portal</h1>

    <button onClick={getAllTransactions}>
      Refresh & Transcations
    </button>

    <br /><br />

    <table border="1" cellPadding="10">

      <thead>

        <tr>

          <th>Card Number</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Transaction Time</th>

        </tr>

      </thead>

      <tbody>

        {allTransactions.map((tx) => (

          <tr key={tx.id}>

            <td>{tx.cardNumber}</td>

            <td>{tx.transactionType}</td>

            <td>{tx.amount}</td>

            <td>{tx.status}</td>

            <td>{tx.transactionTime}</td>

          </tr>

        ))}

      </tbody>

    </table>

    <br />

    <button onClick={() => setPage("home")}>
      Back
    </button>

  </>

)}

    </div>

  );

}

export default App;
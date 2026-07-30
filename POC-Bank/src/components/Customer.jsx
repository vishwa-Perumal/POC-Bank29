function Customer({

  cardNumber,
  setCardNumber,

  pin,
  setPin,

  amount,
  setAmount,

  transactionType,
  setTransactionType,

  balance,

  history,

  checkBalance,
  submitTransaction,
  getHistory,

  setPage

}) {

  return (

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

  );

}

export default Customer;
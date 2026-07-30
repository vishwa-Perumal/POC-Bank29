function Admin({

  allTransactions,
  getAllTransactions,
  setPage

}) {

  return (

    <>

      <h1>Admin Portal</h1>

      <button onClick={getAllTransactions}>
        Refresh Transactions
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

  );

}

export default Admin;
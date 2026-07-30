function Home({ setPage, getAllTransactions }) {

    return (
        <>
            <h1>🏦 Banking System</h1>

            <button onClick={() => setPage("customer")}>
                Customer
            </button>

            <button
                onClick={() => {
                    setPage("admin");
                    getAllTransactions();
                }}
            >
                Admin
            </button>
        </>
    );

}

export default Home;
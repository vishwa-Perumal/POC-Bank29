# Banking System POC

A simplified banking application built with Spring Boot and React. It demonstrates transaction routing between System1 and System2, secure SHA-256 PIN validation, customer transaction management, and a Super Admin monitoring dashboard.

**Tech Stack:** Java, Spring Boot, React, H2 Database, REST API, SHA-256.

Withdrawal
curl -X POST http://localhost:8080/customerrequests1 \
-H "Content-Type: application/json" \
-d '{
  "cardNumber":"4123456789012345",
  "pin":"1234",
  "transactionType":"withdrawal",
  "amount":200
}'

Top-up
curl -X POST http://localhost:8080/customerrequests1 \
-H "Content-Type: application/json" \
-d '{
  "cardNumber":"4123456789012345",
  "pin":"1234",
  "transactionType":"top_up",
  "amount":500
}'

UI Access Instructions
Start System2 on http://localhost:8081.
Start System1 on http://localhost:8080.
Start the React application using npm run dev.
Open http://localhost:5173 in your browser to access the Customer and Super Admin portal.

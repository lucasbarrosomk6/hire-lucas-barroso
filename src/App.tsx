// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TransactionsPage from "./components/TransactionsPage/TransactionsPage";
import TransactionDetailsPage from "./components/TransactionDetailsPage/TransactionDetailsPage";
import "./App.module.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route
          path="/transaction-details/:network/:hash"
          element={<TransactionDetailsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;

"use client"

import { useEffect, useState } from "react"

export default function AdminOrders() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/transactions/get/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();

        setTransactions(data.transactions.map((transaction) => ({
          ...transaction,
          selectedStatus: transaction.status
        })));
      } catch (error) {
        console.log(error)
      }
    }

    fetchTransactions()
  }, [])

  const handleStatusChange = async (transactionId) => {
    try {
      const transaction = transactions.find((transaction) => transaction.id === transactionId);

      const res = await fetch(`http://localhost:3000/api/transactions/status/${transactionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: transaction.selectedStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setTransactions(data.allTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onStatusSelect = (transactionId, selectedStatus) => {
    setTransactions((prevTransaction) =>
      prevTransaction.map((transaction) => transaction.id === transactionId ? { ...transaction, selectedStatus } : transaction))
  }

  return (
    <div className="orders-container">
      <h1>All orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>User ID</th>
            <th>User Info</th>
            <th>Products</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.userId}</td>
              <td>
                <div>
                  <strong>First Name:</strong> {transaction.user.firstName}
                </div>
                <div>
                  <strong>Last Name:</strong> {transaction.user.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {transaction.user.email}
                </div>
                <div>
                  <strong>Phone Number:</strong> {transaction.user.phone}
                </div>
                <div>
                  <strong>Address:</strong> {transaction.user.address}
                </div>
              </td>
              <td>
                {transaction.products.map((product) => (
                  <div key={product.productId}>
                    <strong>{product.title}</strong> (Quantity: {product.quantity})
                  </div>
                ))}
              </td>
              <td>
                {transaction.products.map((product) => (
                  <div key={product.productId}>
                    {product.price} RSD
                  </div>
                ))}
              </td>
              <td>{transaction.status}</td>
              <td>
                <select
                  value={transaction.selectedStatus}
                  onChange={(e) => onStatusSelect(transaction.id, e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="DENIED">DENIED</option>
                </select>
                <button
                  onClick={() => handleStatusChange(transaction.id)}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
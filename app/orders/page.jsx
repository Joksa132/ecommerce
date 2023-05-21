"use client"

import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"

export default function UserOrders() {
  const { user } = useContext(UserContext)
  const [transactionInfo, setTransactionInfo] = useState({})

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/transactions/get/${user.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json();
        setTransactionInfo(data.transaction)
        console.log(transactionInfo)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div className="orders-container">
      <h1>Your orders</h1>
      {transactionInfo.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionInfo.map((transaction) =>
              transaction.products.map((product) => (
                <tr key={product.transactionId + product.title}>
                  <td>{transaction.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price} RSD</td>
                  <td>{product.quantity}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : <span>No orders found</span>}
    </div>
  )
}
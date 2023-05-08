"use client"

import { useState } from 'react'
import styles from './info.module.css'

export default function EditInfo() {
  const [selectedInfo, setSelectedInfo] = useState(null)
  let inputElement = null;

  const handleButtonClick = (e) => {
    setSelectedInfo(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (selectedInfo) {
    switch (selectedInfo) {
      case "email":
        inputElement = (
          <input type="email" id={selectedInfo} name={selectedInfo} />
        );
        break;
      case "first-name":
        inputElement = (
          <input type="text" id={selectedInfo} name={selectedInfo} />
        );
        break;
      case "last-name":
        inputElement = (
          <input type="text" id={selectedInfo} name={selectedInfo} />
        );
        break;
      case "address":
        inputElement = (
          <input type="text" id={selectedInfo} name={selectedInfo} />
        );
        break;
      case "phone":
        inputElement = (
          <input type="number" id={selectedInfo} name={selectedInfo} />
        );
        break;
      case "password":
        inputElement = (
          <input type="password" id={selectedInfo} name={selectedInfo} />
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <h2>Choose which info to change</h2>
      <div className={styles["button-container"]}>
        <button
          className={styles["choose-button"]}
          value="email"
          onClick={handleButtonClick}
        >
          Email
        </button>
        <button
          className={styles["choose-button"]}
          value="first-name"
          onClick={handleButtonClick}
        >
          First Name
        </button>
        <button
          className={styles["choose-button"]}
          value="last-name"
          onClick={handleButtonClick}
        >
          Last Name
        </button>
        <button
          className={styles["choose-button"]}
          value="address"
          onClick={handleButtonClick}
        >
          Address
        </button>
        <button
          className={styles["choose-button"]}
          value="phone"
          onClick={handleButtonClick}
        >
          Phone
        </button>
        <button
          className={styles["choose-button"]}
          value="password"
          onClick={handleButtonClick}
        >
          Password
        </button>
      </div>
      <div className="form-container">
        <div className="form-container-header">
          <h2>Edit {selectedInfo}</h2>
        </div>
        <form className="form-input-container" onSubmit={handleSubmit}>
          {inputElement}
          <button type='submit' className='submit-button'>Save</button>
        </form>
      </div>
    </div>
  )
}
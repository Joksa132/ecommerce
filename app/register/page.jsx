import Link from "next/link"

export default function Register() {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-header">
          <h2>Register</h2>
          <span className="link-msg">Already have an account? <Link href="/login" className="login-click">Login here!</Link></span>
        </div>
        <form className="register-input-container">
          <label htmlFor="first-name">First Name *</label>
          <input type="text" name="first-name" id="first-name" />
          <label htmlFor="last-name">Last Name *</label>
          <input type="text" name="last-name" id="last-name" />
          <label htmlFor="email">Email address *</label>
          <input type="text" name="email" id="email" required />
          <label htmlFor="password">Password *</label>
          <input type="password" name="password" id="password" required />
          <button className="register-button">Register</button>
        </form>
      </div>
    </div>
  )
}
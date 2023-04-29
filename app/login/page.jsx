import Link from "next/link"

export default function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-container-header">
          <h2>Login</h2>
          <span className="link-msg">Don't have an account? <Link href="/register" className="register-click">Register here!</Link></span>
        </div>
        <form className="login-input-container">
          <label htmlFor="email">Email address *</label>
          <input type="text" name="email" id="email" required />
          <label htmlFor="password">Password *</label>
          <input type="password" name="password" id="password" required />
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  )
}
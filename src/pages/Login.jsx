import React from "react";
import "../styles/Login.css"

export default function Login() {
    return (
        <div className="wrapper">
        <div className="left-panel">
            <h1 className="logo">Ubani</h1>
            <div className="left-content">
                <h2>Let's get started</h2>
                <p>Join thousands of farmers selling directly to trusted buyers</p>
                <button className="signup-btn" type="button">Sign up</button>
            </div>
        </div>

        <div className="right-panel">
            <h2>Sign in</h2>

            <div className="role-toggle">
                <span className="role-label">I am a</span>
                <div className="role-buttons">
                    <button className="active" type="button">Farmer</button>
                    <button type="button">Buyer</button>
                </div>
            </div>

            <form>
                <div className="input-group">
                    <input type="text" placeholder="Your username" required />
                </div>

                <div className="input-group">
                    <input type="email" placeholder="Your email" required />
                </div>

                <div className="input-group">
                    <input type="password" placeholder="Password" required />
                </div>

                <label className="remember">
                    <input type="checkbox" />
                    Remember my password
                </label>

                <button className="signin-btn" type="submit">Sign in</button>

                <a href="#" className="forgot">Forgot password?</a>
            </form>
        </div>
        </div>
    )
}
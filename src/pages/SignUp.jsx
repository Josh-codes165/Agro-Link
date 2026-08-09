import React from "react";
import "../styles/SignUp.css"

export default function SignUp() {
    return (

        <div className="card">
            <h2>Create an account</h2>

            <div className="role-toggle">
                <button className="active" type="button">
                Farmer
                </button>
                <button type="button">Buyer</button>
            </div>

            <form>
                <div className="input-group">
                    <input type="text" placeholder="Your name" required />
                </div>

                <div className="input-group">
                    <input type="email" placeholder="Your email" required />
                </div>

                <div className="input-group">
                    <input type="password" placeholder="Create password" required />
                </div>

                <div className="input-group">
                    <input type="password" placeholder="Confirm password" required />
                </div>

                <label className="terms">
                    <input type="checkbox" required />
                I agree to the <a href="#">Terms of service</a> and{" "}
                <a href="#">Privacy policy</a>
                </label>

                <button className="signup-btn" type="submit">
                Sign up
                </button>
            </form>
        </div>
    )
}

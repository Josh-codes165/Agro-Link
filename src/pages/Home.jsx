import React from "react";
import "../styles/Home.css";
import { 
  Scale, 
  BookOpenCheck, 
  ShieldCheck, 
  TrendingUp, 
  Tag, 
  Users, 
  ShieldPlus, 
  ClipboardList, 
  ShoppingCart, 
  Wallet, 
  Sprout 
} from 'lucide-react';
import HeroImage from "../assets/farmer.png"; 

export default function Home() {
  return (
    <div className="page-container">
      {/* Header & Hero */}
      <header className="hero-header">
        <nav className="navbar">
          <h1 id="logo">Ubani</h1>
          <ul className="nav-links">
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/market">Market</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/resources">Resources</a></li>
          </ul>
          <div className="btnDiv">
            <button className="btn-login">
              <a href="/login">Log In</a>
            </button>
            <button className="btn-signup">
              <a href="/signup">Sign Up</a>
            </button>
          </div>
        </nav>

        <section className="hero-content">
          <div className="hero-text">
            <h1>
              Sell better. <br />
              Grow your farm. <br />
              Reach <span className="highlight">more</span> buyers.
            </h1>
            <p>Join thousands of farmers selling directly to trusted buyers</p>
            <button className="btn-primary">Get started</button>
          </div>
          <div className="hero-image-wrapper">
            <img
              src={HeroImage}
              alt="Farmer with fresh produce"
              className="hero-image"
            />
          </div>
        </section>
      </header>

      <main>
        {/* Features Bar */}
        <section className="features-bar">
          <div className="feature-item">
            <Scale size={32} color="#2E7D32" />
            <span>Fair prices</span>
          </div>
          <div className="feature-item">
            <BookOpenCheck size={32} color="#2E7D32" />
            <span>Trusted buyers</span>
          </div>
          <div className="feature-item">
            <ShieldCheck size={32} color="#2E7D32" />
            <span>Secure payments</span>
          </div>
          <div className="feature-item">
            <TrendingUp size={32} color="#2E7D32" />
            <span>Market insights</span>
          </div>
        </section>

        {/* How it works */}
        <section className="how-it-works-section">
          <div className="how-it-works-card">
            <div className="section-header">
              <h2>How Ubani works</h2>
              <p>Simple steps to connect your farm to more buyers</p>
            </div>
            
            <div className="steps-container">
              {/* Step 1 */}
              <div className="step-item">
                <div className="icon-badge">
                  <ClipboardList size={28} color="#2E7D32" />
                </div>
                <div className="step-number">1</div>
                <h3>List produce</h3>
                <p>Add your produce and set your price in minutes</p>
              </div>

              <div className="step-arrow"></div>

              {/* Step 2 */}
              <div className="step-item">
                <div className="icon-badge">
                  <ShoppingCart size={28} color="#2E7D32" />
                </div>
                <div className="step-number">2</div>
                <h3>Receive requests</h3>
                <p>Buyers discover your produce and send purchase requests</p>
              </div>

              <div className="step-arrow"></div>

              {/* Step 3 */}
              <div className="step-item">
                <div className="icon-badge">
                  <Wallet size={28} color="#2E7D32" />
                </div>
                <div className="step-number">3</div>
                <h3>Get paid</h3>
                <p>Confirm the order and receive payments securely</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us-section">
          <div className="section-header">
            <h2>Why Farmers Choose us?</h2>
            <p>Tools and benefits designed to help your farm grow</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="icon-badge">
                <Tag size={28} color="#2E7D32" />
              </div>
              <h3>Fair market prices</h3>
              <p>Get the best value for your produce.</p>
            </div>

            <div className="benefit-card">
              <div className="icon-badge">
                <Users size={28} color="#2E7D32" />
              </div>
              <h3>Verified buyers</h3>
              <p>Connect with serious and trusted buyers.</p>
            </div>

            <div className="benefit-card">
              <div className="icon-badge">
                <ShieldPlus size={28} color="#2E7D32" />
              </div>
              <h3>Secure payments</h3>
              <p>Receive safe and timely payments every time.</p>
            </div>

            <div className="benefit-card">
              <div className="icon-badge">
                <TrendingUp size={28} color="#2E7D32" />
              </div>
              <h3>Market insights</h3>
              <p>Make smarter decisions with real time data.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <Sprout size={48} color="#2E7D32" className="cta-icon" />
            <div className="cta-text">
              <h2>Ready to grow your farm business?</h2>
              <p>Join Ubani today and connect with thousands of buyers.</p>
            </div>
          </div>
          <button className="btn-primary">Get started</button>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h1 className="footer-logo">Ubani</h1>
            <p>Grow better. Sell better.<br />Live better.</p>
          </div>

          <div className="footer-nav">
            <div className="footer-column">
              <h3>Navigation</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/market">Market</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/resources">Resources</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/privacy">Privacy policy</a></li>
                <li><a href="/terms">Terms of service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="copyright">Copyright 2026 Ubani. All rights reserved.</p>
      </footer>
    </div>
  );
}
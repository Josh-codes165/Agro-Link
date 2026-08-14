import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.username.trim())
      return setError('Please enter your username.');
    if (!formData.email.trim()) return setError('Please enter your email.');
    if (!formData.password) return setError('Please enter your password.');

    // Mock check against the account created in SignUp (no backend yet)
    const storedUser = localStorage.getItem('ubaniUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        user.email !== formData.email ||
        user.password !== formData.password
      ) {
        return setError('Incorrect email or password.');
      }
    }
    // If no stored user exists yet, we let it through for now since there's no real backend.

    localStorage.setItem(
      'ubaniSession',
      JSON.stringify({ email: formData.email, role }),
    );

    navigate('/dashboard');
  };

  return (
    <div className="wrapper">
      <div className="left-panel">
        <h1 className="logo">Ubani</h1>
        <div className="left-content">
          <h2>Let's get started</h2>
          <p>Join thousands of farmers selling directly to trusted buyers</p>
          <button
            className="switch-btn"
            type="button"
            onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div>
      </div>

      <div className="right-panel">
        <h2>Sign in</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="role-toggle">
          <span className="role-label">I am a</span>
          <div className="role-buttons">
            <button
              type="button"
              className={role === 'farmer' ? 'active' : ''}
              onClick={() => setRole('farmer')}>
              Farmer
            </button>
            <button
              type="button"
              className={role === 'buyer' ? 'active' : ''}
              onClick={() => setRole('buyer')}>
              Buyer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="remember">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember my password
          </label>

          <button className="signin-btn" type="submit">
            Sign in
          </button>

          <a href="#" className="forgot">
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
}

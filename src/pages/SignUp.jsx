import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../styles/SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
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

    if (!formData.name.trim()) return setError('Please enter your name.');
    if (!formData.email.trim()) return setError('Please enter your email.');
    if (!formData.password) return setError('Please create a password.');
    if (formData.password.length < 6)
      return setError('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword)
      return setError('Passwords do not match.');
    if (!formData.agreed)
      return setError('You must agree to the Terms and Privacy policy.');

    // Mock account creation (no backend yet)
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role,
    };
    localStorage.setItem('ubaniUser', JSON.stringify(newUser));

    navigate('/login');
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
            onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </div>

      <div className="right-panel">
        <h2>Create an account</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="role-toggle">
          <span className="role-label">I am a</span>
          <div className="role-buttons">
            <button
              type="button"
              className={role === 'farmer' ? 'active' : ''}
              onClick={() => setRole('farmer')}>
              Farmer
              <span className="role-subtitle">I want to sell my produce</span>
            </button>
            <button
              type="button"
              className={role === 'buyer' ? 'active' : ''}
              onClick={() => setRole('buyer')}>
              Buyer
              <span className="role-subtitle">I want to buy produce</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
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
              placeholder="Create password"
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

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowConfirmPassword((v) => !v)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="terms">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              required
            />
            I agree to the <a href="#">Terms of service</a> and{' '}
            <a href="#">Privacy policy</a>
          </label>

          <button className="signup-btn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

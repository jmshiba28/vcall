import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Use useNavigate instead of useHistory
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/Input/input';
import Button from '../components/Button/button';
import { login } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }
      navigate('/dashboard');  // Replace history.push with navigate
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Remember Me</label>
          </div>
          <Button type="submit" label="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

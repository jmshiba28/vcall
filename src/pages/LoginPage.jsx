import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/Input/input';
import Button from '../components/Button/button';
import { login } from '../api/authApi';
import styles from '../styles/LoginPage.module.css'; // Import external styles

const LoginPage = () => {
  const [email, setEmail] = useState(localStorage.getItem('rememberMe') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberMe'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill email if 'rememberMe' exists
    if (rememberMe && email) {
      setEmail(localStorage.getItem('rememberMe'));
    }
  }, [rememberMe, email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Navbar />
      <div className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoFocus
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>Remember Me</label>
          </div>
          <Button type="submit" label={loading ? 'Logging in...' : 'Login'} disabled={loading} />
        </form>
        <div className={styles.links}>
          <p>
            Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
          </p>
          <p>
            <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

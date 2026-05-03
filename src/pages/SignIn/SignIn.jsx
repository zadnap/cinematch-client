import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import logo from '@/assets/logo.png';
import styles from './SignIn.module.scss';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import Divider from '../../components/Divider/Divider';

const SignIn = () => {
  const location = useLocation();
  const message = location.state?.message;
  const { signIn, loading, error } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const buttonDisabled = !form.username || !form.password || loading;

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn(form);
  };

  return (
    <section className={styles.signIn}>
      <form onSubmit={handleSubmit}>
        <p className={styles.brandName}>
          CineMatch
          <img className={styles.appLogo} src={logo} alt="" />
        </p>
        <h1>Sign In</h1>
        {message && <p className={styles.success}>{message}</p>}

        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button
          accent
          type="submit"
          className={styles.submitBtn}
          disabled={buttonDisabled}
          loading={loading}
        >
          Sign In
        </Button>

        <footer>
          <p className={styles.authSwitch}>
            <span className={styles.text}>Don't have an account?</span>{' '}
            <Link to="/auth/sign-up" className={styles.linkText}>
              Sign Up
            </Link>
          </p>
          <Divider />
          <p className={styles.authSwitch}>
            <span className={styles.text}>Just exploring?</span>{' '}
            <Link to="/" className={styles.linkText}>
              Try as guest
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
};

export default SignIn;

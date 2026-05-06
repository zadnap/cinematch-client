import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import logo from '@/assets/logo.png';
import styles from './SignUp.module.scss';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import Divider from '../../components/Divider/Divider';
import {
  validateUsername,
  validatePassword,
  validatePasswordMatch,
} from '@/utils/validators';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loading, error } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    passwordConfirmation: null,
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    passwordConfirmation: false,
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = null;

    if (name === 'username') error = validateUsername(value);
    if (name === 'password') error = validatePassword(value);
    if (name === 'passwordConfirmation') {
      error =
        form.password || value
          ? validatePasswordMatch(form.password, value)
          : null;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);
    const confirmError = validatePasswordMatch(
      form.password,
      form.passwordConfirmation
    );

    setErrors({
      username: usernameError,
      password: passwordError,
      passwordConfirmation: confirmError,
    });

    if (usernameError || passwordError || confirmError) return;

    const res = await signUp(form);
    if (res.success) {
      navigate('/auth/sign-in', {
        state: {
          message: 'Account created successfully, you can sign in now',
        },
      });
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  return (
    <section className={styles.signUp}>
      <form onSubmit={loading ? undefined : handleSubmit}>
        <p className={styles.brandName}>
          CineMatch
          <img className={styles.appLogo} src={logo} alt="" />
        </p>
        <h1>Sign Up</h1>

        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username && (
            <p className={styles.error}>{errors.username}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <Input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className={styles.error}>{errors.password}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <Input
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <p className={styles.error}>{errors.passwordConfirmation}</p>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <Button
          accent
          type="submit"
          className={styles.submitBtn}
          disabled={
            !form.username ||
            !form.password ||
            !form.passwordConfirmation ||
            loading ||
            errors.username ||
            errors.password ||
            errors.passwordConfirmation
          }
          loading={loading}
        >
          Sign Up
        </Button>

        <footer>
          <p className={styles.authSwitch}>
            <span className={styles.text}>Already have an account?</span>{' '}
            <Link to="/auth/sign-in" className={styles.linkText}>
              Sign In
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

export default SignUp;

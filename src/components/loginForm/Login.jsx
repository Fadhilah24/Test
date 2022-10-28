import { useState } from "react";
import clsx from "clsx";
import styles from "./LoginForm.module.css";
import { useLoginFormValidator } from "./hooks/useLoginFormValidator";

const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    console.log(JSON.stringify(form, null, 2));
	alert(JSON.stringify(form, null, 2));
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
	 <h1>Login to your Account</h1>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email Address</label>
        <input
          className={clsx(
            styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError
          )}
          type="text"
          aria-label="Email field"
          name="email"
          value={form.email}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.email.dirty && errors.email.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password</label>
        <input
          className={clsx(
            styles.formField,
            errors.password.dirty &&
              errors.password.error &&
              styles.formFieldError
          )}
          type="password"
          aria-label="Password field"
          name="password"
          value={form.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.password.dirty && errors.password.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.password.message}
          </p>
        ) : null}
      </div>
      
      <div className={styles.formActions}>
        <button className={styles.formSubmitBtn} type="submit">
          Login
        </button>
      </div>
	  <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register</button>
	  <button className="link-btn"  >Forgotten your password? Recover Password</button>
    </form>
	
  );
};

export default Login;

import { useState } from "react";
import clsx from "clsx";
import styles from "./RegisterForm.module.css";
import { useRegisterFormValidator } from "./hooks/useRegisterFormValidator";
const Register = props => {
  const [form, setForm] = useState({
    firstname: "",
	lastname: "",
	email: "",
    password: "",
  });
  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

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
	 
	
	 <h1>Create Your Account</h1>
	 <div className={styles.formGroup}>
        <label className={styles.formLabel}>First Name</label>
        <input
          className={clsx(
            styles.formField,
            errors.firstname.dirty && errors.firstname.error && styles.formFieldError
          )}
          type="text"
          aria-label="First Name"
          name="firstname"
          value={form.firstname}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.firstname.dirty && errors.firstname.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.firstname.message}</p>
        ) : null}
      </div>
	  <div className={styles.formGroup}>
        <label className={styles.formLabel}>Last Name</label>
        <input
          className={clsx(
            styles.formField,
            errors.lastname.dirty && errors.lastname.error && styles.formFieldError
          )}
          type="text"
          aria-label="Last Name"
          name="lastname"
          value={form.lastname}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.lastname.dirty && errors.lastname.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.lastname.message}</p>
        ) : null}
      </div>
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
          Register
        </button>
      </div>
	       
	  <button className="link-btn\" onClick={() => props.onFormSwitch('login')}>Already has an account? Sign in</button>
    </form>
	
  );
};

export default Register;

import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT-nlXCzkCnocMGFkyoCe5NNLSABbvfQQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json", // so that API knows that json data is coming
          },
        }
      )
        .then((res) => {
          if (res.ok) {
          } else {
            return res.json().then((data) => {
              // console.log(data);
              // console.log(data.error.message);
              throw new Error(data.error.message); // it is used to create a new Error object with the error message received from the server (data.error.message). This error is thrown to signal that an error occurred during the API request.
            });
          }
        })
        .catch((error) => {
          // console.error("Error:", error);
          alert(error.message); // Displays the error message from the Error object (error) in an alert dialog box.
        })
        .finally(() => {
          setIsLoading(false); // the finally block ensures that the setIsLoading(false) statement is executed after the fetch request completes, regardless of whether the request was successful, encountered an error, or was rejected.
        });
    }
    // setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            // autoComplete="off"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            // autoComplete="off"
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoading
              ? "Sending request..."
              : isLogin
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

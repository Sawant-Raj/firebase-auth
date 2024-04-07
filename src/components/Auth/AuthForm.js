import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate(); // Initialize the navigate function

  const authCtx = useContext(AuthContext);

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

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT-nlXCzkCnocMGFkyoCe5NNLSABbvfQQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT-nlXCzkCnocMGFkyoCe5NNLSABbvfQQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json", // so that API knows that json data is coming
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(); // If the response is successful, this statement returns a promise that resolves with the JSON representation of the response body. In other words, it converts the response body into JSON format.
        } else {
          return res.json().then((data) => {
            // The first .then() block returns a promise that resolves with the JSON data extracted from the response body.
            // console.log(data);
            // console.log(data.error.message);
            throw new Error(data.error.message); // it is used to create a new Error object with the error message received from the server (data.error.message). This error is thrown to signal that an error occurred during the API request.
            // data object ke andar error (first purple) key which has nested object which has a message key
          });
        }
      })
      .then((data) => {
        // The second .then() block allows you to handle this resolved JSON data, providing you with access to it for further processing or actions.
        
        // console.log(data);
        authCtx.login(data.idToken);
        navigate('/'); // Redirect to the "/" route
      })
      .catch((error) => {
        // console.error("Error:", error);
        alert(error.message); // Displays the error message from the Error object (error) in an alert dialog box.
      })
      .finally(() => {
        setIsLoading(false); // the finally block ensures that the setIsLoading(false) statement is executed after the fetch request completes, regardless of whether the request was successful, encountered an error, or was rejected.
      });

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

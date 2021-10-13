import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { NotificationManager } from "react-notifications";

function Login({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const createNotification = (type) => NotificationManager.error(type);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    // send the username and password to the server
    axios
      .post("http://localhost:5000/login", user)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        loginUser(true);
      })
      .catch((error) => {
        if (error.response) {
          createNotification(error.response.data.message);
        } else if (error.message === "Network Error") {
          createNotification(
            "Couldn't connect to the server, Please check your internet connection"
          );
        }
      });
  };

  return (
    <main className="form-signin">
      <form>
        <img
          className="mb-4"
          src="https://arconsegypt.com/wp-content/uploads/2020/03/400x300dpi.jpg"
          alt=""
          width="100"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <Button
          title="Sign in"
          classTitle="w-100 btn-lg btn-primary"
          onClick={onSubmit}
          disabled={!validateForm()}
        />

        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form>
    </main>
  );
}

export default Login;

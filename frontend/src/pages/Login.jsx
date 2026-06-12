import { useState, useRef } from "react";
import { useLoginMutation } from "../redux/authApi";
import { useNavigate } from "react-router-dom";
import style from "../style/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const intervalRef = useRef(null);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const startCountdown = (seconds) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let time = seconds;
    setCountdown(time);

    intervalRef.current = setInterval(() => {
      time -= 1;
      setCountdown(time);

      if (time <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  };

const handleSubmit = async (e) => {
  e.preventDefault(); 
  try {
    const res = await login({ username, password }).unwrap();
    localStorage.setItem("authToken", res.token);
    
    if (res.refreshToken) {
      localStorage.setItem("refreshToken", res.refreshToken);
    }
    if (res.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }
    
    navigate("/dashboard");
  } catch (err) {
    const data = err?.data;
    if (data?.retryAfter) {
      setCountdown(data.retryAfter);
      startCountdown(data.retryAfter);
      setErrorMessage(data.message || "Too many login attempts");
    } else {
      setErrorMessage(data?.message || "Login failed");
    }
  }
};

  return (
    <div className={style.container}>
      <h2 className={style.title}>Login</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        <input
            className={style.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

        <input
            className={style.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <button
          type="submit"
          className={style.button}
          disabled={countdown > 0 || isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {errorMessage && <p className={style.error}>{errorMessage}</p>}
      {countdown > 0 && (
        <p className={style.warning}>Try again in {countdown}s</p>
      )}
    </div>
  );
}

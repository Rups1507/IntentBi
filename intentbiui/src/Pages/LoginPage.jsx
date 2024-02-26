import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({setIsLoggedIn}) {

    const navigate = useNavigate();
//useState for Login credentials
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/user/signin", {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.accessToken) {
        alert("Login Successful");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert("Incorrect Username / Password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="login_form" onSubmit={handleLogin}>
      <label>
        Username <t>: </t>
        <input
          type="text"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, username: e.target.value })
          }
        />
      </label>
      <label>
        Password <t>: </t> 
        <input
          type="password"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

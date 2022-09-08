import { useState } from "react";
import { Navigate } from "react-router-dom";
import { loginUser } from "../utils/authUtils";
import { toast } from "react-toastify";


const Login = ({ isAuthenticated, setIsAuthenticated, setToken })=> {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        if (!email || !password) return alert("Please fill out all the fields");
        const { data, error } = await loginUser({ email, password });
        if (error) {
          throw new Error(error.response?.data.error || error.message);
        }
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } catch (error) {
        toast.error(error.message);
      }
    };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-4">
        <form className="form-signin" onSubmit={handleSubmit}>
         <h2>Fill a login form</h2>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

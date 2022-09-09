import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../utils/authUtils";

const Register = ({ isAuthenticated, setIsAuthenticated, setToken }) => {
  const [{ user_name, password, email}, setFormState] = useState({
    user_name: "",
    password: "",
    email: "",
  });

 
  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          if (!user_name || !password || !email )
            return alert("Please fill out all the fields");
          const { data, error } = await registerUser({
            user_name,
            password,
            email
          });
          if (error) {
            throw new Error(error.response?.data.error || error.message);
          }
          localStorage.setItem("token", data.token);
          console.log(data.token);
          setToken(data.token);
          setIsAuthenticated(true);
        } catch (error) {
          toast.error(error.message);
        }
      };

  // if (isAuthenticated) return <Navigate to="/" replace />;
  if (isAuthenticated) return <p>Sucess</p>;

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-md-4">
        <form className="form-signin" onSubmit={handleSubmit}>
            <h2>Fill a signup form</h2>
          <label htmlFor="inputEmail" className="sr-only">
            First name
          </label>
          <input
            id="user_name"
            className="form-control"
            placeholder="First Name"
            value={user_name}
            onChange={handleChange}
          />
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else if (error.response && error.response.data) {
        setError(
          error.response.data.error || "Login failed. Please try again."
        );
      } else if (error.message) {
        setError(`Network error: ${error.message}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center -mt-10 sm:-mt-16">
        <div
          className="
        w-full max-w-md
        flex flex-col justify-center
        border-2 shadow-lg shadow-primary border-primary rounded-4xl
        px-4 py-8 sm:px-8
        bg-black bg-opacity-80
      "
        >
          <h3 className="text-xl font-semibold text-white">Welcome Back!</h3>
          <p className="text-xs text-blue-300 mt-1 mb-6">
            Please enter your details to login
          </p>

          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johnsmith@gmail.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            {error && <p className="text-red-600 text-xs pb-2.5">{error}</p>}

            <button
              type="submit"
              className="btn-primary cursor-pointer w-full mt-2"
            >
              LOGIN
            </button>

            <p className="text-[13px] text-slate-200 mt-3 text-center">
              Don't have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

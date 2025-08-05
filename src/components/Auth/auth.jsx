import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import "./auth.css";
import loginImg from "../../assets/Login.jpg";
import signupImg from "../../assets/SignUp.jpg";

// Initialize Supabase client directly in this file
const SUPABASE_URL = "https://ttolhbhuburbnhnlzhqj.supabase.co";      // your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0b2xoYmh1YnVyYm5obmx6aHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTcyMDMsImV4cCI6MjA2ODk5MzIwM30.Mv7JX2HTz2HDNoFQzzJ1QvU5FUNBhIIPwseKbfVzA7s"; // your anon/public key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Auth = () => 
{
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate(); 
  
  
  const showNotification = (message, type) => 
  {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleLogin = async (e) => 
  {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", formData.username)
      .single();

    if (error || !data) 
    {
      showNotification("User not found. Please Sign Up.", "error");
      return;
    }

    if (data.password === formData.password) 
    {
      // Removed setUsername and navigation on success
      showNotification("Login Successful!", "success");
      navigate('/landing');
    } 
    else
    {
      showNotification("Incorrect Password", "error");
    }
  };

  const handleSignup = async (e) => 
  {
    e.preventDefault();

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", formData.username)
      .single();

    if (existingUser) 
    {
      showNotification("User already exists. Redirecting to login...", "error");
      setTimeout(() => setIsLogin(true), 2000);
      return;
    }

    const { error } = await supabase
      .from("users")
      .insert([{ username: formData.username, password: formData.password }]);

    if (error) 
    {
      showNotification("Signup failed. Try again.", "error");
    } 
    else
    {
      // Removed setUsername and navigation on success
      showNotification("Signup Successful!", "success");
    }
  };

  const handleInputChange = (e) => 
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="whole">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="auth-container">
        <div className="auth-left">
          <img
            src={isLogin ? loginImg : signupImg}
            alt="Auth Visual"
            className="auth-image"
          />
        </div>

        <div className="right">
          <div className="auth-right">
            <div className="tab-header">
              <button
                className={isLogin ? "active" : ""}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? "active" : ""}
                onClick={() => setIsLogin(false)}
              >
                Signup
              </button>
            </div>

            <form
              className="auth-form"
              onSubmit={isLogin ? handleLogin : handleSignup}
            >
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">{isLogin ? "Login" : "Signup"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

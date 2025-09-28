import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Leaf } from "lucide-react";
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import { LoginFormData, User } from "../types/auth"; // Assuming you have this types file
import api from "../api/api"; // Your central API client

// Define the shape of the successful API response from your backend
interface LoginApiResponse {
  token: string;
  user: User;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "Admin", // Default role to match your backend ('Admin', 'Doctor')
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage("");

    try {
      // --- Use the API client to make the real login request ---
      const { data } = await api.post<LoginApiResponse>("/auth/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // --- LOGIN SUCCESS ---
      setLoginMessage(`Welcome ${data.user.name}! Redirecting...`);

      // 1. Save the token to local storage
      localStorage.setItem("token", data.token);

      // 2. Redirect based on the user's role
      if (data.user.role === "Admin") {
        // If Admin dashboard is in the same app, use internal navigation
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else if (data.user.role === "Doctor") {
        // If Doctor UI is on a different server, do a full page redirect with the token
        const doctorAppUrl = "http://localhost:5174"; // IMPORTANT: Use your Doctor UI's actual URL
        setTimeout(() => {
          window.location.href = `${doctorAppUrl}/auth/callback?token=${data.token}`;
        }, 1000);
      }
    } catch (err: any) {
      // --- LOGIN FAILED ---
      setLoginMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Medical Image (UI is unchanged) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 z-10"></div>
        <img
          src="/doc.jpg"
          alt="Medical professional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Natural Healthcare</h2>
            </div>
            <p className="text-lg text-white/90">
              Combining modern medical expertise with natural wellness
              approaches.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (UI is unchanged) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Please sign in to your healthcare portal
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <RoleSelector
              selectedRole={formData.role}
              onRoleChange={(role) => setFormData({ ...formData, role })}
            />

            <LoginForm
              email={formData.email}
              password={formData.password}
              rememberMe={formData.rememberMe}
              isLoading={isLoading}
              onEmailChange={(email) => setFormData({ ...formData, email })}
              onPasswordChange={(password) =>
                setFormData({ ...formData, password })
              }
              onRememberMeChange={(rememberMe) =>
                setFormData({ ...formData, rememberMe })
              }
              onSubmit={handleSubmit}
            />

            {loginMessage && (
              <div
                className={`mt-4 p-4 rounded-xl text-sm ${
                  loginMessage.includes("Welcome")
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {loginMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

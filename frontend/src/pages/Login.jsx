import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const [useEmail, setUseEmail] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "http://localhost:8000";

    const handleClick = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => {
            const newFormData = { ...prev, [name]: value };
            // console.log('Updated formData:', newFormData);
            return newFormData;
        });

        if (error) {
            console.log("Clearing error");
            setError("");
        }
    };

    const loginUser = async (userData) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                userName: userData.email, // Backend expects userName
                password: userData.password,
            }),
            credentials: "include",
        });
        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/feed");
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    };
    const registerUser = async (userData) => {
        const jsonString = JSON.stringify({
            email: userData.email,
            name: userData.name,
            password: userData.password,
        });
        console.log(jsonString);
        const response = await fetch(`${API_URL}/citizen/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: jsonString,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
    };
    const validateInput = () => {
        if (!isLogin) {
            if (!formData.name.trim()) {
                throw new Error("Full name is required");
            }
            if (!formData.email.trim()) {
                throw new Error("Email is required");
            }
            if (!formData.password.trim()) {
                throw new Error("Password is required");
            }
            if (formData.password.length < 6) {
                throw new Error("Password length atleast be 6 characters");
            }
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Password do not match");
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            validateInput();
            if (isLogin) {
                const result = await loginUser(formData);
                console.log("Login successful:", result);
            } else {
                const result = await registerUser(formData);
                console.log("Registration successful", result);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            userName: "",
        });
        setError("");
    };
    const toggleMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    return (
        <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex justify-center">
                    <div className="w-full max-w-md">
                        <div className="card">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold mb-2 text-black">
                                    {isLogin
                                        ? "Welcome Back"
                                        : "Create Account"}
                                </h1>
                                <p className="text-gray-600">
                                    {isLogin
                                        ? "Sign in to your CiviChain account"
                                        : "Join CiviChain to start making a difference"}
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <div className="flex items-center justify-center mb-8">
                                <div className="bg-gray-100 rounded-full p-1 flex">
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                            isLogin
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-gray-600 hover:text-gray-800"
                                        }`}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                            !isLogin
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-gray-600 hover:text-gray-800"
                                        }`}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">{error}</span>
                                        <button
                                            onClick={() => setError("")}
                                            className="text-red-700 hover:text-red-900 font-bold text-lg"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!isLogin && (
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            placeholder="Enter your full name"
                                            required={!isLogin}
                                            value={formData.name}
                                            disabled={loading}
                                            onChange={handleClick}
                                        />
                                    </div>
                                )}

                                {!useEmail && (
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Username
                                        </label>

                                        <input
                                            type={"text"}
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder={"Enter your username"}
                                            required
                                            value={formData.userName}
                                            disabled={loading}
                                            onChange={handleClick}
                                        />
                                    </div>
                                )}

                                {useEmail && (
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            type={"email"}
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder={"Enter your email"}
                                            required
                                            value={formData.email}
                                            disabled={loading}
                                            onChange={handleClick}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        disabled={loading}
                                        onChange={handleClick}
                                        required
                                    />
                                </div>

                                {!isLogin && (
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="form-input"
                                            placeholder="Confirm your password"
                                            required={!isLogin}
                                            onChange={handleClick}
                                            value={formData.confirmPassword}
                                            disabled={loading}
                                        />
                                    </div>
                                )}

                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Remember me
                                            </span>
                                        </label>
                                        <button
                                            className="text-sm text-primary hover:text-primary-light transition-colors"
                                            onClick={() =>
                                                setUseEmail(!useEmail)
                                            }
                                        >
                                            {useEmail
                                                ? "Official Login"
                                                : "Login through email"}
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary w-full"
                                >
                                    {isLogin ? "Sign In" : "Create Account"}
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"></div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-600">
                                    {isLogin
                                        ? "Don't have an account? "
                                        : "Already have an account? "}
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-primary hover:text-primary-light font-medium transition-colors"
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

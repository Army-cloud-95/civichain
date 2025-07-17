import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="card">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-black">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Sign in to your CiviChain account' 
                    : 'Join CiviChain to start making a difference'
                  }
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1 flex">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      isLogin 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      !isLogin 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <form className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-input"
                      placeholder="Confirm your password"
                      required={!isLogin}
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
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary hover:text-primary-light transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
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

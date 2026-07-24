"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../../store/features/portfolioApi";
import { selectIsAuthenticated, logout } from "../../store/features/authSlice";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError("");

    try {
      const response = await login({
        userName,
        password,
      }).unwrap();

      console.log("Login successful:", response);

      setUserName("");
      setPassword("");
      setIsOpen(false);
    } catch (err) {
      setLoginError(err?.data?.message || "Invalid credentials");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer
                   p-[2px] rounded-2xl
                   bg-gradient-to-r from-[#070943] to-[#02043A]
                   border border-white/20
                   w-[300px] h-[300px]
                   flex items-center justify-center"
      >
        <div className="relative w-[250px] h-[250px] rounded-2xl overflow-hidden">
          <Image
            src="/profile_picture.png"
            alt="Adarsh"
            fill
            className="object-cover object-[50%_20%]
                       transition-all duration-300
                       group-hover:brightness-75"
          />

          <div className="absolute inset-0 pointer-events-none scan-effect" />

          <div
            className="absolute inset-0 flex items-center justify-center
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"
          >
           
          </div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl
                       bg-white/5 backdrop-blur-xl
                       border border-white/10
                       shadow-[0_0_40px_rgba(139,92,246,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {isAuthenticated ? (
              <div className="text-center space-y-6">
                <div className="text-4xl">🔓</div>

                <div>
                  <h2 className="text-white text-xl font-semibold">
                    Admin Access Active
                  </h2>

                  <p className="text-white/50 text-sm mt-1">
                    You can manage your portfolio
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl
                             border border-red-500/30
                             text-red-400 text-sm
                             hover:bg-red-500/10
                             transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-white text-xl font-semibold">
                    Admin Login
                  </h2>

                  <p className="text-white/40 text-sm mt-1">
                    Enter credentials to unlock admin access
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl
                               bg-white/5 border border-white/10
                               text-white placeholder-white/30 text-sm
                               focus:outline-none
                               focus:border-purple-500/50
                               transition-colors duration-200"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl
                               bg-white/5 border border-white/10
                               text-white placeholder-white/30 text-sm
                               focus:outline-none
                               focus:border-purple-500/50
                               transition-colors duration-200"
                  />
                </div>

                {loginError && (
                  <p className="text-red-400 text-xs text-center">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl
                             bg-purple-600 hover:bg-purple-500
                             disabled:opacity-50
                             disabled:cursor-not-allowed
                             text-white text-sm font-medium
                             transition-colors duration-200
                             shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4
                         text-white/30
                         hover:text-white/70
                         transition-colors duration-200
                         text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

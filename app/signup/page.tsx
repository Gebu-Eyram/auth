"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "verify">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setSuccess(
        "Registration successful! Please check your email for the OTP code."
      );
      console.log("Registration successful:", data);

      // Move to OTP verification step
      setTimeout(() => {
        setStep("verify");
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token: otp,
          type: "email",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "OTP verification failed");
      }

      setSuccess("Email verified successfully! Redirecting to login...");
      console.log("OTP verification successful:", data);

      // Redirect to login page after successful verification
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred during OTP verification");
      console.error("OTP verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-600 via-purple-600 to-blue-400 items-center  p-12">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/auth/login-image.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between text-white max-w-md">
          <div className="mb-8">
            <div className="text-6xl mb-4">✱</div>
          </div>
          <p className="text-lg mb-6 opacity-90 mt-auto">You can easily</p>
          <h1 className="text-3xl font-medium leading-tight">
            Get access your personal hub for clarity and productivity
          </h1>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 ">
        <div className="w-full max-w-md p-8 shadow-none border-0">
          <div className="mb-8">
            <div className="text-purple-600 text-3xl mb-4">✱</div>
            <h2 className="text-3xl font-bold mb-2">
              {step === "register" ? "Create an account" : "Verify your email"}
            </h2>
            <p className="text-gray-500 dark:text-muted-foreground text-sm">
              {step === "register"
                ? "Access your programs, courses, and materials anytime, anywhere - and keep everything flowing in one place."
                : `We've sent an 8-digit OTP code to ${email}. Please enter it below to verify your email.`}
            </p>
          </div>

          {step === "register" ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-muted-foreground font-medium"
                >
                  Your email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="karashaeloi19@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-muted-foreground font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg h-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Get Started"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="otp"
                  className="text-gray-700 dark:text-muted-foreground font-medium"
                >
                  Enter OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="12345678"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="rounded-lg h-12 text-center text-lg tracking-widest"
                  maxLength={8}
                  required
                />
                <p className="text-xs text-gray-500 text-center">
                  Enter the 8-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium"
                disabled={isLoading || otp.length !== 8}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("register")}
                className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Back to registration
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signin"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

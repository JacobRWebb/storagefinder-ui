import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authApi";
import { useAuthStore } from "../store/useAuthStore";
import type { LoginRequest } from "../types/auth";
import { useNavigate } from "@tanstack/react-router";

const LoginPage: React.FC = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate({ to: "/" });
    },
    onError: () => {
      // Optionally handle error, e.g., show toast
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            {...register("password", { required: "Password is required" })}
            autoComplete="current-password"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={isSubmitting || mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Logging in..." : "Login"}
        </button>
        {mutation.isError && (
          <div className="text-red-600 text-sm text-center mt-2">Login failed. Check your credentials.</div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;

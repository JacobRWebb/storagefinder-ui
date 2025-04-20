import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../services/authApi";
import type { RegisterRequest } from "../types/auth";
import { useNavigate } from "@tanstack/react-router";

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterRequest>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      // Optionally auto-login or redirect
      navigate({ to: "/login" });
    },
    onError: () => {
      // Optionally handle error
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
            autoComplete="new-password"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium mb-1">Display Name</label>
          <input
            id="displayName"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            {...register("displayName", { required: "Display name is required" })}
          />
          {errors.displayName && <span className="text-red-500 text-xs">{errors.displayName.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={isSubmitting || mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Registering..." : "Register"}
        </button>
        {mutation.isError && (
          <div className="text-red-600 text-sm text-center mt-2">Registration failed. Try again.</div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;

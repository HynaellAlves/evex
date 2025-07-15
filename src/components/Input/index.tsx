"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : isPassword ? "text" : type;

  return (
    <div className="input-container">
      <input
        type={inputType}
        {...props}
        className={`${props.className ?? ""} ${isPassword ? "has-eye" : ""}`}
      />
      {isPassword && (
        <span className="eye-icon" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
}

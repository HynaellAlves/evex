"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from './input.module.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : isPassword ? "text" : type;

  return (
    <div className={styles.input_container}>
      <input
        type={inputType}
        {...props}
        className={`${props.className ?? ""} ${isPassword ? "has-eye" : ""}`}
      />
      {isPassword && (
        <span className={styles.eye_icon} onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
}

"use client";

import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./input.module.css"

type inputProps = React.InputHTMLAttributes<HTMLInputElement>


const Input = forwardRef<HTMLInputElement, inputProps>(({ type, ...props }, ref) => {

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && !showPassword ? "password" : isPassword ? "text" : type;

    return (
        <div className={styles.input_container}>
            <input
                type={inputType}
                ref={ref}
                {...props}
                className={`${styles.input} ${props.className?? ""} ${isPassword ? "has-eye" : ""}`} />
            {isPassword && (
                <div className={styles.showPassword_content}>
                    <span className={styles.eye_icon} onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            )}
        </div>
    )

});

export default Input;
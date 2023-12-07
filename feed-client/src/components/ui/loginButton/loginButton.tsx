import { MouseEventHandler } from "react";
import styles from "./loginButton.module.css";

interface loginButtonProps {
  variant?: "default" | "dark";
  label: string;
  onClick: MouseEventHandler;
}

function LoginButton({ variant, label, onClick }: loginButtonProps) {
  const variantClass = styles[`${variant}`];
  return (
    <div className={`${styles.main} ${variantClass}`} onClick={onClick}>
      {label}
    </div>
  );
}

export default LoginButton;

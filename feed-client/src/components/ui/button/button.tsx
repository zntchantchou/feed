import { CSSProperties, HTMLAttributes, MouseEventHandler } from "react";
import styles from "./button.module.css";

interface loginButtonProps {
  variant?: "default" | "dark";
  onClick: MouseEventHandler;
  children: JSX.Element;
  width?: string;
  style?: CSSProperties;
}

function Button({
  variant = "default",
  onClick,
  children,
  style,
}: loginButtonProps) {
  const variantClass = styles[`${variant}`];
  return (
    <div
      className={`${styles.main} ${variantClass}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}

export default Button;

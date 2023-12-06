import styles from "./loginButton.module.css";

interface loginButtonProps {
  variant?: "default" | "dark";
  label: string;
}

function LoginButton({ variant, label }: loginButtonProps) {
  const variantClass = styles[`${variant}`];
  return <div className={`${styles.main} ${variantClass}`}> {label} </div>;
}

export default LoginButton;

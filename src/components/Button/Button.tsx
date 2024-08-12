import React from "react";
import classes from "./Button.module.css";

export default function Button({
  className,
  onClick,
  children,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button onClick={onClick} className={`${classes.button} ${className}`}>
      {children}
    </button>
  );
}

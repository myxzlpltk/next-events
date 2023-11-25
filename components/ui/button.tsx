import Link from "next/link";
import React, { ReactNode, MouseEvent } from "react";
import classes from "./button.module.css";

const Button = ({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent) => void;
}) => {
  if (href != undefined) {
    return (
      <Link href={href} className={classes.btn}>
        {children}
      </Link>
    );
  } else if (onClick != undefined) {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;

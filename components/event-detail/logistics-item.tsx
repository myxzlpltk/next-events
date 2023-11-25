import React, { ElementType, ReactNode } from "react";
import classes from "./logistics-item.module.css";

const LogisticsItem = ({
  children,
  ...props
}: {
  icon: ElementType;
  children: ReactNode;
}) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <props.icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;

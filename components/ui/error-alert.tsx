import classes from "./error-alert.module.css";
import React, { ReactNode } from "react";

const ErrorAlert = ({ children }: { children: ReactNode }) => (
  <div className={classes.alert}>{children}</div>
);

export default ErrorAlert;

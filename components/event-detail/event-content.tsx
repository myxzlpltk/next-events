import React, { ReactNode } from "react";
import classes from "./event-content.module.css";

const EventContent = ({ children }: { children: ReactNode }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;

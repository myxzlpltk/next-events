import { AppEvent } from "@/dummy-data";
import React from "react";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = ({ items }: { items: AppEvent[] }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
};

export default EventList;

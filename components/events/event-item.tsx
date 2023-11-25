import { AppEvent } from "@/dummy-data";
import Image from "next/image";
import React from "react";
import classes from "./event-item.module.css";
import Button from "@/components/ui/button";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import DateIcon from "@/components/icons/date-icon";

const EventItem = ({ item }: { item: AppEvent }) => {
  return (
    <li className={classes.item}>
      <Image src={`/${item.image}`} alt={item.title} width={200} height={300} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>
              {new Date(item.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{item.location.replace(", ", "\n")}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={`/events/${item.id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;

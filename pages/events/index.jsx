import React from "react";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

const EventListPage = () => {
  const router = useRouter();
  const allEvents = getAllEvents();

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventListPage;

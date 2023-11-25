import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data";
import React from "react";

const Home = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default Home;

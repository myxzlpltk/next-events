import React from "react";
import EventList from "../../components/events/event-list";
import { AppEvent } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllEvents } from "@/helpers/api-utils";

interface Props {
  events: AppEvent[];
}

const EventListPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = (async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 600, // 10 minutes
  };
}) satisfies GetStaticProps<Props>;

export default EventListPage;

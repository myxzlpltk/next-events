import React, { Fragment } from "react";
import EventList from "../../components/events/event-list";
import { AppEvent } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllEvents } from "@/helpers/api-utils";
import Head from "next/head";

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
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="All events for upgrading your skills"
        />
      </Head>
      <div>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={events} />
      </div>
    </Fragment>
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

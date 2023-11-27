import EventList from "@/components/events/event-list";
import { AppEvent } from "@/dummy-data";
import { getFeaturedEvents } from "@/helpers/api-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";

interface Props {
  events: AppEvent[];
}

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps = (async () => {
  const events = await getFeaturedEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800, // 1 hour
  };
}) satisfies GetStaticProps<Props>;

export default Home;

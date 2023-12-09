import EventList from "@/components/events/event-list";
import { AppEvent } from "@/dummy-data";
import { getFeaturedEvents } from "@/helpers/api-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import NewsletterRegistration from "@/components/input/newsletter-registration";

interface Props {
  events: AppEvent[];
}

const Home = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <title>Featured Events</title>
        <meta
          name="description"
          content="Featured events for upgrading your skills"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </Fragment>
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

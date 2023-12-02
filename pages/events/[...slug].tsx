import React, { Fragment } from "react";
import { AppEvent } from "@/dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getFilteredEvents } from "@/helpers/api-utils";

interface Props {
  events: AppEvent[];
  date: String;
}

const EventListFilterPage = ({
  events,
  date,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(date)}></ResultsTitle>
      <EventList items={events} />
    </Fragment>
  );
};

export const getServerSideProps = (async (context) => {
  const filterData = context.params?.slug;

  if (!filterData) {
    return { notFound: true };
  }

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (isNaN(filterYear) || isNaN(filterMonth)) {
    return { notFound: true };
  }

  const date = new Date(filterYear, filterMonth - 1).toISOString();
  const events = await getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  return {
    props: {
      events,
      date,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default EventListFilterPage;

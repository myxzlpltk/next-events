import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const EventListFilterPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No Data</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (isNaN(filterYear) || isNaN(filterMonth)) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">Invalid filter</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default EventListFilterPage;

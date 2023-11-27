import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { AppEvent } from "../../dummy-data";

interface Props {
  event: AppEvent;
}

const EventDetailPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!event) {
    return (
      <div className="center">
        <p className="center">Loading....</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticPaths = (async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  // Get event id
  const eventId = context.params?.id?.toString();
  if (!eventId) return { notFound: true };
  // Get event
  const event = await getEventById(eventId);
  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
    revalidate: 60, // 1 minute
  };
}) satisfies GetStaticProps<Props>;

export default EventDetailPage;

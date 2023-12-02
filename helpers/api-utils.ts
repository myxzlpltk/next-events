import { AppEvent } from "@/dummy-data";

const baseURL =
  "https://track-watchlist-default-rtdb.asia-southeast1.firebasedatabase.app";

const objectToAppEvents = (data: { [key: string]: any }): AppEvent[] => {
  const events = [];
  for (const id in data) {
    events.push({
      id,
      ...data[id],
    });
  }

  return events;
};

export async function getAllEvents(): Promise<AppEvent[]> {
  const apiURL = `${baseURL}/events.json`;
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => objectToAppEvents(data));
}

export async function getFeaturedEvents(): Promise<AppEvent[]> {
  const apiURL = `${baseURL}/events.json?orderBy="isFeatured"&equalTo=true`;
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => objectToAppEvents(data));
}

export async function getFilteredEvents({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<AppEvent[]> {
  const yearString = year.toString().padStart(2, "0");
  const monthString = month.toString().padStart(2, "0");
  const apiURL = `${baseURL}/events.json?orderBy="date"&startAt="${yearString}-${monthString}"`;
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => objectToAppEvents(data));
}

export async function getEventById(id: string): Promise<AppEvent | undefined> {
  const apiURL = `${baseURL}/events/${id}.json`;
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => data && { id, ...data });
}

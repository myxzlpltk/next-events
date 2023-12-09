// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CommentData } from "@/components/input/new-comment";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { MONGO_URL } from "@/helpers/mongo-utils";

type Response = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | CommentData[] | string>,
) {
  const { eventId } = req.query;
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      email.toString().trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.toString().trim() === "" ||
      !text ||
      text.toString().trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();
    await db.collection("comments").insertOne({ eventId, email, name, text });
    await client.close();

    res.status(200).json({ message: "Comment saved!" });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();
    const docs = await db
      .collection("comments")
      .find({ eventId })
      .sort({ _id: -1 })
      .toArray()
      .then((data) =>
        data.map((e) => ({
          name: e.name,
          email: e.email,
          text: e.text,
        })),
      );
    await client.close();

    return res.status(200).json(docs);
  }

  res.status(405).send("Method Not Allowed");
}

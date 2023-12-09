// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { MONGO_URL } from "@/helpers/mongo-utils";

type Response = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>,
) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();
    await db.collection("newsletters").insertOne({ email });
    await client.close();

    return res.status(200).json({ message: "Signed Up!" });
  }

  res.status(405).send("Method Not Allowed");
}

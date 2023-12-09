// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CommentData } from "@/components/input/new-comment";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
};

export default function handler(
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

    res.status(200).json({ message: "Comment saved!" });
  }

  if (req.method === "GET") {
    return res.status(200).json([
      {
        name: "Saddam Azy",
        email: "myxzlpltk@gmail.com",
        text: "Lorem ipsum dolor sit amet",
      },
    ]);
  }

  res.status(405).send("Method Not Allowed");
}

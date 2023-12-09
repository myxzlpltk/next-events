// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>,
) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    return res.status(200).json({ message: "Signed Up!" });
  }

  res.status(405).send("Method Not Allowed");
}

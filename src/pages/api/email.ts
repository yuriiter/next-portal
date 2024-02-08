// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendMail, buildEmailText } from "@/utils/mailer";
import type { NextApiRequest, NextApiResponse } from "next";

type ContactData = {
  name: string;
  email: string;
  query: string;
};

const validateBody = (body: Partial<ContactData>) => {
  if (body === undefined) return;
  const { name, email, query } = body;

  if ([typeof name, typeof email, typeof query].some((t) => t !== "string"))
    return false;
  if (
    name!.length < 1 ||
    name!.length > 100 ||
    email!.length < 1 ||
    email!.length > 100 ||
    query!.length > 1000
  )
    return false;
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const body = JSON.parse(req.body);
    if (!validateBody(body)) {
      return res.status(400).json({ message: "Bad parameters" });
    }
    const { name, email, query } = body;
    await sendMail(buildEmailText(name, email, query));
    return res.json({ message: "Successfully sent an email" });
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json({ message: "Error sending an email" });
  }
}

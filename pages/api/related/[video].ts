import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import fetchApi from "../../../lib/fetchApi";

const secret = process.env.NEXTAUTH_SECRET;

const options = {
  part: "snippet",
  type: "video",
  regionCode: "GB",
  maxResults: "12",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  const { video } = req.query as { video: string };
  const params = new URLSearchParams({ ...options, relatedToVideoId: video });
  const { success, status, data } = await fetchApi(
    `search?${params.toString()}`,
    token.accessToken
  );

  if (success) res.status(200).json(data.items);
  else res.status(status).json({});
}

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import fetchApi from "../../../lib/fetchApi";

const secret = process.env.NEXTAUTH_SECRET;

const options = {
  part: "snippet",
  chart: "mostPopular",
  regionCode: "GB",
  maxResults: "20",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  const { id } = req.query as { id: string };
  const params = new URLSearchParams({ ...options, videoCategoryId: id });
  const data = await fetchApi(`videos?${params.toString()}`, token.accessToken);

  res.status(200).json(data.items);
}

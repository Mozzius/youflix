import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import fetchApi from "../../lib/fetchApi";

const secret = process.env.NEXTAUTH_SECRET;

const options = {
  part: "snippet",
  regionCode: "GB",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });

  const params = new URLSearchParams(options);
  const data = await fetchApi(`videoCategories?${params.toString()}`, token.accessToken);

  res
    .status(200)
    .json(data.items);
}

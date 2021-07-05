export default async function fetchApi(url, token) {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/${url}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    if (res.status >= 400) throw res;
    return await res.json();
  } catch (err) {
    try {
      console.error(await err.json());
    } catch (_) {
      console.error(err);
    } finally {
      return [];
    }
  }
}

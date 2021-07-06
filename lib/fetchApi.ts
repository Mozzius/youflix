export default async function fetchApi(
  url,
  token
): Promise<{ success: boolean; status: number; data?: any }> {
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
    return {
      success: true,
      status: res.status,
      data: await res.json(),
    };
  } catch (err) {
    try {
      console.error(await err.json());
    } catch (_) {
      console.error(err);
    } finally {
      return { success: false, status: err.status };
    }
  }
}

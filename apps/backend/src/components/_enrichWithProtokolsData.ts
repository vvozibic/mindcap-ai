export async function enrichWithProtokolsData(username: string) {
  try {
    const res = await fetch(
      `https://public-api.protokols.io/api/v1/profile/${username}/stats?timeframe=30d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PROTOKOLS_API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn(`Protokols enrich failed for ${username}:`, err);
    return null;
  }
}

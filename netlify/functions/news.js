import fetch from "node-fetch";

export async function handler(event, context) {
  const { q, from, to } = event.queryStringParameters;

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&pageSize=100&language=en&apiKey=${process.env.NEWS_API_KEY}`,
  );

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

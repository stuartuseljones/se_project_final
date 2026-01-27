export async function handler(event) {
  try {
    const { q, from, to } = event.queryStringParameters;

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${to}&pageSize=100&language=en&apiKey=${process.env.NEWS_API_KEY}`,
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

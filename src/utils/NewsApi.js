class NewsApi {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "/.netlify/functions/news" // <- call the Netlify function in production
        : "https://newsapi.org/v2/everything";

    this._apiKey = process.env.NODE_ENV === "production" ? null : NEWS_API_KEY;
  }

  getNews(keyword, from, to) {
    const url =
      process.env.NODE_ENV === "production"
        ? `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}`
        : `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}&apiKey=${this._apiKey}&pageSize=100&language=en`;

    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default new NewsApi();

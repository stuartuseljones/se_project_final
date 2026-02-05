import { NEWS_API_KEY } from "./constants";

class NewsApi {
  constructor() {
    this._baseUrl =
      import.meta.env.MODE === "production"
        ? "/.netlify/functions/news" // <- call the Netlify function in production
        : "https://newsapi.org/v2/everything";

    this._apiKey = import.meta.env.MODE === "production" ? null : NEWS_API_KEY;
  }

  getNews(keyword, from, to) {
    const url =
      import.meta.env.MODE === "production"
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

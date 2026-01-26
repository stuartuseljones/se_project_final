import { NEWS_API_KEY } from "./constants";

class NewsApi {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://nomoreparties.co/news/v2/everything"
        : "https://newsapi.org/v2/everything";

    this._apiKey = NEWS_API_KEY;
  }

  getNews(keyword, from, to) {
    return fetch(
      `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}&apiKey=${this._apiKey}&pageSize=100&language=en`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default new NewsApi();

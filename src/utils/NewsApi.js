class NewsApi {
  constructor() {
    this._baseUrl = "/.netlify/functions/news";
  }

  getNews(keyword, from, to) {
    const url = `${this._baseUrl}?q=${keyword}&from=${from}&to=${to}`;

    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default new NewsApi();

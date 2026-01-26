let savedArticles = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    title: "Some news article",
    url: "https://example.com",
    source: "Example News",
    imageUrl: "https://via.placeholder.com/400x200",
    date: "2025-01-01",
  },
];

export const getItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedArticles);
    }, 500);
  });
};

export const saveArticle = (article) => {
  return new Promise((resolve) => {
    const saved = {
      ...article,
      _id: crypto.randomUUID(),
    };

    savedArticles = [saved, ...savedArticles];
    resolve(saved);
  });
};

export const deleteArticle = (id) => {
  return new Promise((resolve) => {
    savedArticles = savedArticles.filter((a) => a._id !== id);
    resolve();
  });
};

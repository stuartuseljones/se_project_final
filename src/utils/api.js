let savedArticles = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    title:
      "Rats 'the size of small dog' seen in town as NI plagued by thousands of rodents",
    url: "https://www.bbc.com/news/articles/cr57q4lzje4o?xtor=AL-72-%5Bpartner%5D-%5Byahoo.north.america%5D-%5Bheadline%5D-%5Bnews%5D-%5Bbizdev%5D-%5Bisapi%5D",
    source: "BBC News",
    imageUrl:
      "https://ichef.bbci.co.uk/news/1024/cpsprodpb/0a9b/live/3fe7a3d0-f31a-11f0-a422-4ba8a094a8fa.jpg.webp",
    date: "2026-01-21",
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

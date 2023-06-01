document.addEventListener('DOMContentLoaded', fetchNews);

function fetchNews() {
  const rssUrl = 'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml';
  const feedContainer = document.getElementById('rss-feed');

  fetch(rssUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');

      const items = xmlDoc.getElementsByTagName('item');
      const categories = {};

      for (const item of items) {
        const category = item.getElementsByTagName('category')[0].textContent;
        const title = item.getElementsByTagName('title')[0].textContent;
        const link = item.getElementsByTagName('link')[0].textContent;

        if (!categories[category]) {
          categories[category] = [];
        }

        categories[category].push({ title, link });
      }

      for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.textContent = category;

        feedContainer.appendChild(categoryDiv);

        const articles = categories[category];

        for (const article of articles) {
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article');

          const linkElement = document.createElement('a');
          linkElement.href = article.link;
          linkElement.textContent = article.title;

          articleDiv.appendChild(linkElement);
          feedContainer.appendChild(articleDiv);
        }
      }
    })
    .catch(error => {
      console.error('Errore durante il recupero del feed RSS:', error);
    });
}

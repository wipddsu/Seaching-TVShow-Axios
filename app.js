const form = document.getElementById('searchForm');
const listContainer = form.querySelector('.listContainer');

const getShows = async () => {
  const searchTerm = form.elements.query.value;
  const config = {
    params: { q: searchTerm },
  };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

  return res.data;
};

const printShows = async (e) => {
  e.preventDefault();
  listContainer.innerHTML = '';

  const showsList = await getShows();
  const showsImg = showsList.map((item) => {
    const images = item.show.image;
    const src = images ? images.medium : '';

    if (images) {
      return `<li><p><img src="${src}"/></p></li>`;
    } else {
      return `<li><p><span>${item.show.name}</span></p></li>`;
    }
  });

  listContainer.innerHTML = showsImg.join('\n');
  form.elements.query.value = '';
};

form.addEventListener('submit', printShows);

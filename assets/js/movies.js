import {
  addMovieToList,
  clearMoviesMarkup,
  createMarkup,
  createStyle,
  inputSearch,
  movieList,
  triggerMode
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const debounce = (() => {
  let timer = 0;

  return (cb, ms) => {
      clearTimeout(timer);
      timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch(url)
  .then((response) => response.json())
  .then((json) => {
      if (!json || !json.Search) throw Error('Сервер вернул неправильный объект');

      return json.Search;
  });

const inputSearchHandler = (e) => {
  debounce(() => {
      const searchString = e.target.value.trim();

      if (searchString && searchString.lenght > 3 && searchString !== searchLast) {
          if (!triggerMode) clearMoviesMarkup(movieList);

          getData(`${siteUrl}?apikey=379c8492&s=${searchString}`)
              .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
              .catch((err) => console.log(err));
      }

      searchLast = searchString;

  }, 2000);
};

export const appInit = (url) => {
  createMarkup();
  createStyle();
  siteUrl = url;

  inputSearch.addEventListener('keyup', inputSearchHandler);

};
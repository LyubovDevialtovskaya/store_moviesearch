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
  let timer = null;


  return (cb, ms) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(cb, ms);
  };
})();

const getData = (url) => fetch(url)
  .then((response) => response.json())
  .then((json) => {
      if (!json || !json.Search) throw Error('Сервер вернул неправильный объект');


      return json.Search;
  });

const inputSeachHandler = (e) => {
  debounce(() => {
      const searchString = e.target.value.trim();

      if (searchString && searchString.length > 3 && searchString !== searchLast) {
          if (!triggerMode) clearMoviesMarkup(movieList);


          getData(`${siteUrl}?apikey=5be607b4=${searchString}`)
              .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
              .catch((err) => console.error(err));
      }

      searchLast = searchString;

  }, 2000);
};



export const appInit = (url) => {
  createMarkup();
  createStyle();
  siteUrl = url;

  inputSearch.addEventListener('keyup', inputSeachHandler);

};
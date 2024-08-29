const moviesContainer = document.querySelector(".movies");
const searchBar = document.querySelector(".search__bar");
const yearInput = document.querySelector('input[type="number"]');
const moviesLoading = document.querySelector(".movies__loading");

let movieResRaw = null;
let movieResFilter = null;

async function filterMovies(year) {
  if (year) {
    movieResFilter = await movieResRaw.filter((movie) => movie.Year === year);

    moviesContainer.innerHTML = movieResFilter
      .map((movie) => movieHTML(movie))
      .join("");
  } else {
    moviesContainer.innerHTML = movieResRaw
      .map((movie) => movieHTML(movie))
      .join("");
  }
}

async function loadMovies(searchTerm) {
  try {
    moviesContainer.innerHTML = `<div class="movies__loading">
                    <i class="fas fa-spinner movies__loading--spinner"></i>
                </div>`;

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=ed88fe15&s=${searchTerm}`
    );
    const moviesData = await response.json();

    if (moviesData.Search) {
      movieResRaw = moviesData.Search;

      moviesContainer.innerHTML = moviesData.Search.map((movie) =>
        movieHTML(movie)
      ).join("");
    } else {
      moviesContainer.innerHTML = `<p class="no__movies">No movies found.</p>`;
    }
  } catch (error) {
    console.log("Error fetching movies: ", error);
  }
}

function movieHTML(movie) {
  return `<div class="movie">
            <figure class="movie__img--wrapper">
              <img src="${movie.Poster}" alt="${movie.Title}" class="movie__img">
            </figure>
            <div class="movie__desc">
              <div class="movie__title">
                ${movie.Title}
              </div>
              <div class="movie__year">
                ${movie.Year}
              </div>
            </div>
          </div>`;
}
const moviesContainer = document.querySelector(".movies");
const searchBar = document.querySelector(".search__bar--container");
const typeInput = document.querySelector(".select__type");
const moviesLoading = document.querySelector(".movies__loading");

let movieResRaw = null;
let movieResFilter = null;

async function filterMovies(Type) {
  if (Type !== "all results") {
    movieResFilter = await movieResRaw.filter((movie) => movie.Type === Type);
    console.log(movieResFilter);

    if (movieResFilter.length === 0) {
      moviesContainer.innerHTML = `<p class="no__movies">No movies found.</p>`;
    } else {
      moviesContainer.innerHTML = movieResFilter
        .map((movie) => movieHTML(movie))
        .join("");
    }
  } else {
    movieResFilter = null;
    moviesContainer.innerHTML = movieResRaw
      .map((movie) => movieHTML(movie))
      .join("");
  }
}

async function loadMovies(event) {
  event.preventDefault();
  try {
    const searchTerm = document.getElementById("searchInput").value;
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
      movieResRaw = null;
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
              <div class="movie__Type">
                ${movie.Type}
              </div>
            </div>
          </div>`;
}
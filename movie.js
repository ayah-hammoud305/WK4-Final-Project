const moviesContainer = document.querySelector(".movies");
const searchBar = document.querySelector(".search__bar--container"); 
// ^^Changed to target the form instead of the input, still works..somewhat.
const typeInput = document.querySelector(".select__type");
// ^^ Changed to target the select instead of the input.
const moviesLoading = document.querySelector(".movies__loading");

let movieResRaw = null;
let movieResFilter = null;

async function filterMovies(Type) {
  if (Type) {
    movieResFilter = await movieResRaw.filter((movie) => movie.Type === Type);
// ^^Changed everything that said "Year" to "Type". It works once the search bar is used, however line 23 won't run for some reason.
    moviesContainer.innerHTML = movieResFilter
      .map((movie) => movieHTML(movie))
      .join("");
  } else {
    moviesContainer.innerHTML = movieResRaw
      .map((movie) => movieHTML(movie))
      .join("");
  }
  //  else if {
  //   moviesContainer.innerHTML = `<p class="no__movies">No movies found.</p>`;
  // }
  // No IDEA WHY THE ABOVE ISNT WORKING.
  
}

// Search bar is working 50% of the time, however, when it does work, it is showing results for "Undefined" instead of the search term.
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
              <div class="movie__Type">
                ${movie.Type}
              </div>
            </div>
          </div>`;
}
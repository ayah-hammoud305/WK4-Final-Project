const moviesSearchBox = document.querySelectorAll(".search__bar")
const title = localStorage.getItem("title")
const year = localStorage.getItem("year")

async function filterMovies(event) {
    const year = event.target.value;
    loadMovies(searchTerm)
}

async function loadMovies(searchTerm) {
    const movies= await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=ed88fe15&s=${searchTerm}`)
    const moviesData = await movies.json();
    moviesSearchBox.innerHTML = moviesData.map(movie => movieHTML(movie)).join('');
    
}



function movieHTML(movie) {
    return `<div class="movie">
                        <figure class="movie__img--wrapper">
                            <img src="assets/catching fire poster.jpg" class="movie__img">
                        </figure>
                        <div class="movie__desc">
                            <div class="movie__title">
                                ${search.title}
                            </div>
                            <div class="movie__year">
                                ${search.year}
                            </div>
                        </div>
                    </div>`
}
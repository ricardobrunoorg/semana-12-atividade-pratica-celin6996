const API_KEY = "SUA_CHAVE_AQUI";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MOVIES_DATA = [
  {
    id: 278,
    title: "Um Sonho de Liberdade",
    release_date: "1994-09-23",
    vote_average: 9.3,
    genre: "drama",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    overview: "Andy Dufresne, um banqueiro inocente condenado por assassinato, encontra redenção e esperança dentro das muralhas da Prisão Estadual de Shawshank ao longo de duas décadas."
  },
  {
    id: 238,
    title: "O Poderoso Chefão",
    release_date: "1972-03-24",
    vote_average: 9.2,
    genre: "crime",
    poster_path: "/3bhkrj58Vtu7enYsLeBHKhxN1gc.jpg",
    overview: "O envelhecido patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante."
  },
  {
    id: 155,
    title: "Batman: O Cavaleiro das Trevas",
    release_date: "2008-07-18",
    vote_average: 9.0,
    genre: "acao",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview: "Quando o Coringa emerge de seu passado misterioso e semeia o caos e a destruição em Gotham City, Batman deve enfrentar uma das maiores provas psicológicas de sua capacidade de lutar contra a injustiça."
  },
  {
    id: 240,
    title: "O Poderoso Chefão: Parte II",
    release_date: "1974-12-20",
    vote_average: 9.0,
    genre: "crime",
    poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    overview: "A história inicial e a ascensão de um jovem Vito Corleone são contadas em paralelo com os negócios cada vez mais poderosos de seu filho Michael nos anos 1950."
  },
  {
    id: 389,
    title: "12 Homens e uma Sentença",
    release_date: "1957-04-10",
    vote_average: 9.0,
    genre: "drama",
    poster_path: "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
    overview: "Um homem é acusado de matar o pai. Parece um caso simples para os 12 jurados — onze votam culpado — exceto pelo Jurado 8, que levanta dúvidas sobre as evidências."
  }
];

const searchInput  = document.getElementById("search");
const btnSearch    = document.getElementById("btnSearch");
const filterSelect = document.getElementById("filter");
const movieList    = document.getElementById("movie-list");
const message      = document.getElementById("message");

async function fetchMovies(query = "") {
  showMessage("⏳ Carregando...");
  movieList.innerHTML = "";

  await new Promise(r => setTimeout(r, 300));

  let results = [...MOVIES_DATA];

  const genre = filterSelect.value;
  if (genre !== "all") {
    results = results.filter(m => m.genre === genre);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(m => m.title.toLowerCase().includes(q));
  }

  return results;
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  const posterSrc = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : "https://placehold.co/500x750/1a1a2e/e0e0e0?text=Sem+Poster";

  const year = movie.release_date ? movie.release_date.substring(0, 4) : "—";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const overview = movie.overview
    ? (movie.overview.length > 130 ? movie.overview.substring(0, 130) + "…" : movie.overview)
    : "Sem sinopse disponível.";

  const ratingClass = movie.vote_average >= 8.5 ? "gold"
    : movie.vote_average >= 7 ? "high"
    : movie.vote_average >= 5 ? "mid" : "low";

  card.innerHTML = `
    <div class="card-poster">
      <img src="${posterSrc}" alt="Poster de ${movie.title}" loading="lazy"
           onerror="this.src='https://placehold.co/500x750/1a1a2e/e0e0e0?text=Sem+Poster'" />
      <span class="rating-badge ${ratingClass}">★ ${rating}</span>
    </div>
    <div class="card-info">
      <h3 class="card-title">${movie.title}</h3>
      <p class="card-year">📅 ${year}</p>
      <p class="card-overview">${overview}</p>
    </div>
  `;

  return card;
}

function renderMovies(movies) {
  movieList.innerHTML = "";
  if (!movies || movies.length === 0) {
    showMessage("🔍 Nenhum filme encontrado.");
    return;
  }
  showMessage("");
  movies.forEach((movie, i) => {
    const card = createMovieCard(movie);
    card.style.animationDelay = `${i * 80}ms`;
    movieList.appendChild(card);
  });
}

function showMessage(text) {
  message.textContent = text;
}

async function init() {
  const movies = await fetchMovies();
  renderMovies(movies);
}

btnSearch.addEventListener("click", async () => {
  const movies = await fetchMovies(searchInput.value);
  renderMovies(movies);
});

searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const movies = await fetchMovies(searchInput.value);
    renderMovies(movies);
  }
});

filterSelect.addEventListener("change", async () => {
  searchInput.value = "";
  const movies = await fetchMovies();
  renderMovies(movies);
});

init();
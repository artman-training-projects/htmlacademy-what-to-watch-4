const filmAdapter = (film) => ({
  id: film.id,
  title: film.name,
  poster: film.poster_image,
  previewImg: film.preview_image,
  bg: film.background_image,
  bgc: film.background_color,
  src: film.video_link,
  previewSrc: film.preview_video_link,
  description: film.description,
  rating: film.rating,
  votes: film.scores_count,
  director: film.director,
  starring: film.starring,
  time: film.run_time,
  genre: film.genre,
  year: film.released,
  isFavorite: film.is_favorite,
});

export default filmAdapter;

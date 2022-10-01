import { FC } from "react";

const Ratings = {
	BAD: `Bad`,
	NORMAL: `Normal`,
	GOOD: `Good`,
	VERY_GOOD: `Very good`,
	AWESOME: `Awesome`,
};

const getRating = (rating) => {
	if (rating < 3) {
		return Ratings.BAD;
	} else if (rating < 5) {
		return Ratings.NORMAL;
	} else if (rating < 8) {
		return Ratings.GOOD;
	} else if (rating < 10) {
		return Ratings.VERY_GOOD;
	} else {
		return Ratings.AWESOME;
	}
};

interface Props {
	description: string;
	director: string;
	rating: number;
	starring: string[];
	votes: number;
}

const MovieNavOverview: FC<Props> = (props: Props) => {
	const { description, director, rating, starring, votes } = props;

	return (
		<>
			<div className="movie-rating">
				<div className="movie-rating__score">{rating}</div>
				<p className="movie-rating__meta">
					<span className="movie-rating__level">
						{getRating(rating)}
					</span>
					<span className="movie-rating__count">{votes} ratings</span>
				</p>
			</div>

			<div className="movie-card__text">
				<p>{description}</p>

				<p className="movie-card__director">
					<strong>Director: {director}</strong>
				</p>
				<p className="movie-card__starring">
					<strong>
						Starring: {starring.map((star) => star).join(`, `)} and
						other
					</strong>
				</p>
			</div>
		</>
	);
};

export default MovieNavOverview;

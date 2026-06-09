"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, PlayIcon, Link } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Button } from "lightswind";
import { Arrow } from "radix-ui/internal";  



interface MovieDetailsType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; name: string }[];
  production_countries: { id: number; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: boolean;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Demo = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [crew, setCrew] = useState<any[]>([]);
  const [cast, setCast] = useState<any[]>([]);
  const [similarMovies, setSimilarMovies] = useState<[]>([]);
  const [watchkey, setWatchKey] = useState("");
  const [isTrailerShowed, setIsTrailerShowed] = useState(false);
  const router = useRouter();


  const pushToSimilarPage = () => {
    router.push(`/movie/${params.id}/similar`);
  };

  useEffect(() => {
    if (!params.id) return;

    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
      })
      .then((response) => {
        setMovie(response.data);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
      })
      .then((response) => {
        const mainStaff = response.data.crew.filter(
          (member: any) => member.job === "Director" || member.job === "Writer",
        );
        setCrew(mainStaff);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
      })
      .then((response) => {
        setCast(response.data.cast);
      });

    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/similar`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
      })
      .then((response) => {
        setSimilarMovies(response.data.results.slice(0, 5));
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,
        {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
        },
      )
      .then((response) => {
        setWatchKey(response.data.results[0]?.key);
        console.log(response.data);
      });
  }, [params.id]);

  const handleOnClick = () => {
    setIsTrailerShowed((isTrailerShowed) => !isTrailerShowed);
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 py-10 bg-white text-zinc-900">
      
      <div className="flex flex-col gap-6 w-[1080px]">
        
        <div className="w-full flex justify-between items-end border-b border-zinc-100 pb-4">
          <div>
            <h1 className="text-zinc-900 font-inter text-[32px] font-bold leading-tight tracking-[-0.9px]">
              {movie?.title}
            </h1>
            <p className="text-zinc-500 font-inter text-[16px] font-normal mt-2 flex items-center gap-2">
              <span>{movie?.release_date?.split("-")[0] || movie?.release_date}</span>
              <span>•</span>
              <span>{movie?.softcore ? "Softcore" : "R-Rated"}</span>
              <span>•</span>
              <span>{movie?.runtime} min</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-zinc-400 font-inter text-[13px] font-semibold uppercase tracking-wider">
              Rating
            </p>
            <div className="flex gap-1.5 items-center">
              <Star fill="#EAB308" stroke="#EAB308" width={24} height={24} />
              <span className="text-zinc-900 font-inter text-[20px] font-bold leading-none">
                {movie?.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
              </span>
              <span className="text-zinc-400 font-inter text-[15px] font-normal">
                /10
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              {movie?.vote_count?.toLocaleString()} votes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative w-[290px] h-[428px] rounded-xl overflow-hidden shadow-md bg-zinc-100 flex-shrink-0">
            {movie?.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                alt="Movie Poster"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="w-[760px] h-[428px] rounded-xl overflow-hidden bg-black shadow-lg relative flex-shrink-0">
            {isTrailerShowed ? (
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${watchkey}`}
                width="100%"
                height="100%"
                volume={1}
                playing={true}
                controls={true}
              />
            ) : (
              <div 
                onClick={handleOnClick}
                className="absolute inset-0 w-full h-full cursor-pointer group"
              >
                {movie?.backdrop_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt="Movie Backdrop"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <PlayIcon className="w-7 h-7 text-black fill-black ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-[1080px]">       
        <div className="flex flex-wrap items-center gap-2">
          {movie?.genres?.map((genre: { id: number; name: string }) => (
            <span
              key={genre.id}
              className="bg-zinc-100 text-zinc-800 font-inter text-[13px] px-4 py-1.5 rounded-full border border-zinc-200 hover:bg-zinc-200 transition-all cursor-pointer font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="w-full">
          <p className="text-zinc-800 font-inter text-[16px] font-normal leading-[26px] tracking-[0.2px] text-justify">
            {movie?.overview || "No description available for this movie."}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6">
          {crew.length > 0 ? (
            crew.slice(0, 3).map((member: any, index: number) => (
              <div key={index} className="flex items-center gap-4 py-1 border-b border-zinc-100 last:border-none">
                <span className="text-zinc-900 font-inter text-[16px] font-bold w-[120px] flex-shrink-0">
                  {member.job}
                </span>
                <span className="text-zinc-600 font-inter text-[15px] font-normal">
                  {member.name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 text-[14px]">Staff information not available.</p>
          )}

          <div className="flex items-start gap-4 py-1">
            <span className="text-zinc-900 font-inter text-[16px] font-bold w-[120px] flex-shrink-0">
              Stars
            </span>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {cast.length > 0 ? (
                cast.slice(0, 4).map((actor, idx) => (
                  <span key={actor.id} className="text-zinc-600 font-inter text-[15px] font-normal">
                    {actor.name}{idx < Math.min(cast.length, 4) - 1 ? "," : ""}
                  </span>
                ))
              ) : (
                <p className="text-zinc-400 text-[14px]">No cast information available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[1080px] pt-8 border-t border-zinc-200 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-zinc-900 font-inter text-[22px] font-bold tracking-tight">
            More like this
          </h3>
         <button
          onClick={pushToSimilarPage}
          type="button"
          className="w-[145px] h-[40px] flex px-4 py-2 justify-center items-center gap-[8px] bg-[#FAFAFA] rounded-lg text-sm font-inter font-medium leading-4"
        >
          <p className="decoration-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px] text-black">
            See more
          </p>
       
        </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {similarMovies.length > 0 ? (
            similarMovies.map((simMovie: any) => (
              <div
                key={simMovie.id}
                className="flex flex-col gap-3 group cursor-pointer rounded-xl overflow-hidden bg-zinc-50 p-2.5 shadow-sm hover:shadow-md transition-all duration-200 border border-zinc-100"
                onClick={() => (window.location.href = `/movie/${simMovie.id}`)}
              >
                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-zinc-200 shadow-inner">
                  {simMovie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342/${simMovie.poster_path}`}
                      alt={simMovie.title}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[12px]">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-col px-1">
                  <div className="flex items-center gap-1.5">
                    <Star fill="#EAB308" stroke="#EAB308" width={14} height={14} />
                    <span className="text-[13px] font-bold text-zinc-700">
                      {simMovie.vote_average ? simMovie.vote_average.toFixed(1) : "0.0"}
                    </span>
                    <span className="text-zinc-400 text-[12px]">/10</span>
                  </div>
                  <span className="text-[14px] font-semibold text-zinc-900 line-clamp-1 group-hover:text-blue-600 mt-1 transition-colors">
                    {simMovie.title}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 text-[14px] col-span-5 text-center py-6">
              No similar movies found.
            </p>
          )}
        </div>
      </div>

    </div>
    
  );
};

export default Demo;

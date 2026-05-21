import MovieCard from "./ui/MovieCard"; 
import type { movieType } from "@/app/page";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, } from "react";
import axios from "axios";

interface GroupMovieProps {
  title: string;       
  endpoint: string;   
}

 const GroupMovie = ({title, endpoint }: GroupMovieProps) => {

  const [movies, setMovies] = useState<movieType[]>([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWIyNDA3YThmZTE3YWQxYTc0MGRlNzNhMjA0ZmU4YSIsIm5iZiI6MTc3OTI1MzA4MC41MTcsInN1YiI6IjZhMGQzZjU4MTUwYmEwNmE5OGY4ZGJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zUURUYV-k6UOaY1jL5sPf77fdeRXack5TVr6cD0IMA0"
    }
  }).then(response => {
    setMovies(response.data.results);
  });
  }, [endpoint]);

  return (
          <div className="flex flex-col gap-8 p-[80px]">
             <div className="flex w-[1214px] justify-between items-start">
        <p className="font-semibold font-inter text-2xl font-normal text-[32px]/[133.333%] tracking-[-0.6px]">{title}</p>
        <button type="button" className="w-[145px] h-[40px] flex px-4 py-2 justify-center items-center gap-[8px] bg-[#FAFAFA] rounded-lg text-sm font-inter font-medium leading-4">
                       
                       <p className="decoration-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px]">See more</p>
                       <ArrowRight className="w-4 h-4" /> 
                      </button>
             </div>   
        <div className="flex flex-wrap  justify-center gap-4 w-[1214px] mx-auto">
        {movies.map((movie) => {
          return (
            <MovieCard
            key={movie.id}
            movie={movie}
            />
          );
        })}

      </div>
      </div>
  );
}
export default GroupMovie;
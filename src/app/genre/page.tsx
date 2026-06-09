"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "@/components/ui/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "next/navigation";
import { movieType } from "@/app/page";

const GenrePage = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("id");
  const params = useParams();
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    setPage(1);
  }, [params.category]);

  const prevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) setPage(page - 1);
  };

  const nextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);

  const getVisiblePages = () => {
    if (page === 1) return [1, 2, 3].filter((p) => p <= totalPages);
    if (page === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages].filter((p) => p > 0);
    return [page - 1, page, page + 1].filter((p) => p <= totalPages);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-[1214px] mx-auto flex flex-col gap-8 py-10 px-4 bg-white">
      <div className="flex w-[1214px] justify-between items-start">
        <p className="font-semibold font-inter text-2xl font-normal text-[32px]/[133.333%] tracking-[-0.6px]">Search results: {movies[0]?.genre_ids?.[0] || "Genre"}
        </p>
      </div>
      <div className="flex flex-wrap  justify-center gap-4 w-[1214px] mx-auto">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={prevPage}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>
          {visiblePages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
                isActive={page === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={nextPage}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GenrePage;

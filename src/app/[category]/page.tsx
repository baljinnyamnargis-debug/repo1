"use client";
import React, { useState, useEffect } from "react";
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

const Upcoming = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

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
    if (!params.category) return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [page, params.category]);

  const getVisiblePages = () => {
    if (page === 1) return [1, 2, 3].filter((p) => p <= totalPages);
    if (page === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages].filter((p) => p > 0);
    return [page - 1, page, page + 1].filter((p) => p <= totalPages);
  };

  const visiblePages = getVisiblePages();

  const formatCategoryName = (category: string | string[] | undefined) => {
    if (!category || typeof category !== "string") return "";
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-[1214px] mx-auto flex flex-col gap-8 py-10 bg-white">
      <div className="w-full">
        <h1 className="font-semibold font-inter text-zinc-950 text-[32px]/[133.333%] tracking-[-0.6px] capitalize">
          {formatCategoryName(params.category)} Movies
        </h1>
      </div>

      <div className="w-full grid grid-cols-5 gap-6 min-h-[600px]">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      {movies.length > 0 && (
        <div className="w-full flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={prevPage}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
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
      )}
    </div>
  );
};

export default Upcoming;

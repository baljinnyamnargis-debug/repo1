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
import { Skeleton } from "@/components/ui/skeleton";

const Upcoming = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    
    setIsLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      })
      .catch((error) => {
        console.error("Error fetching category movies:", error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, [page, params.category]);

  const getVisiblePages = () => {
    if (page === 1) return [1, 2, 3].filter((p) => p <= totalPages);
    if (page === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages].filter((p) => p > 0);
    return [page - 1, page, page + 1].filter((p) => p <= totalPages);
  };

  const visiblePages = getVisiblePages();

  const formatCategoryName = (category: string | string[]) => {
    if (!category || typeof category !== "string") return "";
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex flex-col gap-8 py-10 px-4 bg-white">
      <div className="w-[1214px] mx-auto">
        <h1 className="font-semibold font-inter text-zinc-950 text-[32px] tracking-[-0.6px] leading-tight capitalize">
          {formatCategoryName(params.category ?? "")} Movies
        </h1>
      </div> 
      <div className="flex flex-wrap justify-center gap-6 w-[1214px] mx-auto min-h-[600px]">
        {isLoading
          ? 
            Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          :
            movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
      </div>    
      {!isLoading && movies.length > 0 && (
        <Pagination className="mt-6">
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
      )}
    </div>
  );
};

export default Upcoming;
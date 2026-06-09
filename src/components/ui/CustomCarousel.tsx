"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; 
import { Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import type { movieType } from "@/app/page";
import Image from "next/image";

interface CustomCarouselProps {
  title: string;
  endpoint: string;
}

const CustomCarousel = ({ title, endpoint }: CustomCarouselProps) => {
  const [movies, setMovies] = useState<movieType[]>([]);
  
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      )
      .then((response) => {
        setMovies(response.data.results || []);
      });
  }, [endpoint]);

  const handleWatchTrailer = async (movieId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );

      const videos = response.data.results || [];
      
      const officialTrailer = videos.find(
        (vid: any) => vid.site === "YouTube" && (vid.type === "Trailer")
      );

      const videoToPlay = officialTrailer || videos[0];

      if (videoToPlay && videoToPlay.key) {
        setActiveVideoKey(videoToPlay.key); 
        setIsVideoOpen(true); 
      } else {
        alert("Уучлаарай, энэ кинонд трэйлер олдсонгүй.");
      }
    } catch (error) {
      console.error("Трэйлер татахад алдаа гарлаа:", error);
    }
  };

  return (
    <div className="w-full relative">
      <Carousel className="w-full mx-auto relative rounded-xl overflow-hidden">
        <CarouselContent>
          {movies.map((movie, index: number) => {
            return (
              <CarouselItem key={movie.id} className="basis-full">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-[600px] items-center justify-center p-0 overflow-hidden w-full relative">
                      {movie.backdrop_path || movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                          alt={"Movie Poster"}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : null}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <span className="absolute bottom-4 left-4 text-4xl font-semibold text-white drop-shadow-md">
                        {index + 1}
                      </span>
                      
                      <div className="w-[404px] h-[264px] flex flex-col items-start gap-4 absolute left-[140px] bottom-[158px] z-10">
                        <div className="text-white">
                          <p className="font-inter text-[16px] font-normal leading-[24px] opacity-80">
                            {title}
                          </p>
                          <h4 className="font-inter font-bold text-[36px] leading-[40px] tracking-[-0.9px] my-1">
                            {movie.title}
                          </h4>
                          <div className="flex gap-1 items-center">
                            <Star fill="yellow" stroke="yellow" width={20} height={20} />
                            <span className="font-inter text-[18px] font-normal leading-[28px] ml-1">
                              {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="text-zinc-400 font-inter text-[16px] font-normal leading-[24px]">
                              /10
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-zinc-200 w-[302px] text-xs font-inter font-normal leading-4 line-clamp-3">
                          {movie.overview}
                        </p>
    
                        <button 
                          onClick={() => handleWatchTrailer(movie.id)}
                          className="w-[145px] h-[40px] flex px-4 py-2 justify-center items-center gap-[8px] bg-[#FAFAFA] hover:bg-zinc-200 transition-colors rounded-lg text-sm font-inter font-medium text-black"
                        >
                          <Play className="w-4 h-4 fill-black" />
                          <span className="font-inter text-[14px] font-medium leading-[20px]">
                            Watch Trailer
                          </span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20" />
        <CarouselNext className="right-4 z-20" />
      </Carousel>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="w-full  bg-black border-none p-0 overflow-hidden aspect-video">
          <DialogTitle className="sr-only">
            {movies.find(m => m.id.toString() === activeVideoKey)?.title || "Movie Trailer"}
          </DialogTitle>
          {activeVideoKey && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoKey}?autoplay=1`} 
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomCarousel;

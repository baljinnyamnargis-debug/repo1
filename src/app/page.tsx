"use client";
import { use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from "@/components/ui/MovieCard";
import { Play, Star } from "lucide-react";


const Home = () => {
   const moviesData = [
    {
      id: 1,
      image: "/Slide 4_3 - 1.png",
      title: "Dear Santa",
      rating: 6.9
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (1).png",
      title: "How To Train Your Dragon Live Action",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (2).png",
      title: "Alien Romulus",
      rating: 7.5
    },
     {
      id: 2,
      image: "/Slide 4_3 - 1 (3).png",
      title: "From the Ashes",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (4).png",
      title: "Space Dogg",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (5).png",
      title: "The order",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (6).png",
      title: "Y2K",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (7).png",
      title: "Solo Leveling: ReAwakening",
      rating: 7.5
    },
    {
      id: 2,
      image: "/Slide 4_3 - 1 (8).png",
      title: "Get Away",
      rating: 7.5
    },
     {
      id: 2,
      image: "/Slide 4_3 - 1 (9).png",
      title: "Sonic the Hedgehog 3",
      rating: 7.5
    },
    
    
    
  ]
  return (
    <div className="w-full h-[4000px] flex flex-col gap-8">
      <Carousel className="w-full h-unique-carousel-container relative">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-xl relative">
                    <Image src={"/Feature.png"} alt="Feature image" fill className="object-cover priority={index === 0}" />
                    <span className="absolute bottom-4 left-4 text-4xl font-semibold text-white drop-shadow-md">{index + 1}</span>
                    <div className="w-[404px] h-[264px] flex flex-col items-start gap-4 absolute left-[140px] bottom-[158px]">
                      <div className="text-white">
                        <p className=" font-inter decoration-[#FFFFFF] text-[16px]; not-italic font-normal leading-[24px]">Now Playing:</p>
                        <h4 className="decoration-[#FFF] font-inter font-bold text-[36px] font-normal leading-[40px] tracking-[-0.9px]">Wicked</h4>
                        <div className="flex gap-1 items-center">
                          <Star fill="yellow" stroke="yellow" width={28} height={28} />

                          <span className=" decoration-[#FAFAFA] font-inter text-[18px] not-italic font-normal leading-[28px]">6.9</span>
                          <span className="decoration-[#71717A] font-inter text-[16px] not-italic font-normal leading-[24px]">/10</span>
                        </div>
                      </div>
                      <p className="text-white w-[302px] decoration-[#FAFAFA] text-xs font-inter font-normal leading-4">
                        Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.
                      </p>
                      <button className="w-[145px] h-[40px] flex p-[8px] p-[16px] justify-center items-center gap-[8px] bg-[#FAFAFA] rounded-lg text-sm font-inter font-medium leading-4">
                       <Play className="w-4 h-4" />
                       <p className="decoration-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px]">Watch Trailer</p>
                      </buttongo>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4"/>
      <CarouselNext className="right-4"/>
    </Carousel>
        {/* 230 * 5 = 1150 + 16 * 4 = 1214d */}
        <div className="flex flex-wrap  justify-center gap-4 w-[1214px] mx-auto">
        {moviesData.map((item) => (
          <MovieCard
          key={item.id}
          image={item.image}
          title={item.title}
          rating={item.rating}
          />
        ))}
      </div>

    </div>
    
    
  );
}
export default Home;


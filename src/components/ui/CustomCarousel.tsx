// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { Play, Star } from "lucide-react";
// import { useEffect, useState, } from "react";
// import axios from "axios";
// import { movieType } from "@/app/page";
// import Image from "next/image";

// interface CustomCarouselProps {
 
// }

// const CustomCarousel = () => {
//      const [movies, setMovies] = useState<movieType[]>([]);

//   useEffect(() => {
//     axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, {
//     headers: {
//       "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWIyNDA3YThmZTE3YWQxYTc0MGRlNzNhMjA0ZmU4YSIsIm5iZiI6MTc3OTI1MzA4MC41MTcsInN1YiI6IjZhMGQzZjU4MTUwYmEwNmE5OGY4ZGJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zUURUYV-k6UOaY1jL5sPf77fdeRXack5TVr6cD0IMA0"
//     }
//   }).then(response => {
//     setMovies(response.data.results);
//   });
//   }, []);



//     return (
//         <Carousel className="w-full mx-auto relative rounded-xl overflow-hidden">
//       <CarouselContent>
//         {movies.map((movie, index: number) => {
//           return (
//             <CarouselItem key={movie.id} className="basis-full">
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex h-[600px]  items-center justify-center p-0 overflow-hidden w-full relative ">
//                     {movie.poster_path && (
//                       <Image 
//                         src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//                         alt={"Movie Poster"} 
//                         fill 
//                         className="object-cover" 
//                     priority={index === 0} />
//                     )}
//                     <span className="absolute bottom-4 left-4 text-4xl font-semibold text-white drop-shadow-md">{index + 1}</span>
//                     <div className="w-[404px] h-[264px] flex flex-col items-start gap-4 absolute left-[140px] bottom-[158px]">
//                       <div className="text-white">
//                         <p className=" font-inter decoration-[#FFFFFF] text-[16px] not-italic font-normal leading-[24px]">Now Playing:</p>
//                         <h4 className="decoration-[#FFF] font-inter font-bold text-[36px] font-normal leading-[40px] tracking-[-0.9px]">{movie.title}</h4>
//                         <div className="flex gap-1 items-center">
//                           <Star fill="yellow" stroke="yellow" width={28} height={28} />

//                           <span className=" decoration-[#FAFAFA] font-inter text-[18px] not-italic font-normal leading-[28px]">{movie.vote_average.toFixed(1)}</span>
//                           <span className="decoration-[#71717A] font-inter text-[16px] not-italic font-normal leading-[24px]">/10</span>
//                         </div>
//                       </div>
//                       <p className="text-white w-[302px] decoration-[#FAFAFA] text-xs font-inter font-normal leading-4">{movie.overview}
                
//                       </p>
//                       <button className="w-[145px] h-[40px] flex px-4 py-2 justify-center items-center gap-[8px] bg-[#FAFAFA] rounded-lg text-sm font-inter font-medium leading-4">
//                        <Play className="w-4 h-4" />
//                        <p className="decoration-[#18181B] font-inter text-[14px] not-italic font-medium leading-[20px]">Watch Trailer</p>
//                       </button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           );
//         })}
//       </CarouselContent>
//       <CarouselPrevious className="left-4"/>
//       <CarouselNext className="right-4"/>
//      </Carousel>


//     );
// }

// export default CustomCarousel;
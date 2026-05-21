"use client";
import GroupMovie from "@/components/GroupMovie";
// import CustomCarousel from "@/components/ui/CustomCarousel";


export interface movieType {
   "adult": boolean,
   "backdrop_path": string,
   "genre_ids": number[],
            "id": number,
            "title": string,
            "original_language": string,
            "original_title": string,
            "overview": string,
            "popularity": number,
            "poster_path": string,
            "release_date": string,
            "softcore": boolean,
            "video": boolean,
            "vote_average": number,
            "vote_count": number
}

const Home = (movies: movieType[]) => {

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* <CustomCarousel /> */}
        <div className="inline-flex flex-col items-center gap-[52px]">
  
        <GroupMovie title="Upcoming" endpoint="upcoming"/>
        <GroupMovie title="Top Rated" endpoint="top_rated"/>
        <GroupMovie title="Popular" endpoint="popular"/>  
      
      </div>

    </div>
    
    
  );
}
export default Home;


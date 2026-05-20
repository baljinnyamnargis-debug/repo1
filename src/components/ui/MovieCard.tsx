
import Image from "next/image"
import { Card, CardContent } from "./card";
import { Star } from "lucide-react";

interface MovieCardProps {
    image: string;
    title: string;
    rating: number;
}

const MovieCard = ({ image, title, rating }: MovieCardProps) => {
  return (


    // 
        <Card className="w-[230px] h-[439px] flex flex-col rounded-lg bg-[#F4F4F5]">
    <CardContent className="flex flex-col gap-2 p-0">
      <div className="w-[230px] h-[340px] relative">
        <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-1">
      <p className="flex gap-1 items-center">
            <Star fill="yellow" stroke="yellow" size={16} />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-400 text-sm">/10</span>
        </p>
        <p className="font-semibold">{title}</p>
      </div>
    </CardContent>
</Card>
    
    
  );
     
  }
  
  export default MovieCard;

 
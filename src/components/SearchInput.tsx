"use client";
import { useState, useEffect } from "react";
import { Search, X, Clock } from "lucide-react"; 
import Input from "./ui/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MovieType {
  id: number;
  title: string;
}

const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [foundMovies, setFoundMovies] = useState<MovieType[]>([]);
  const [open, setOpen] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("movie_search_history");
    if (savedHistory) {
      setRecentSearches(JSON.parse(savedHistory));
    }
  }, []);

  const saveSearchToHistory = (searchWord: string) => {
    if (!searchWord.trim()) return;

    const filtered = recentSearches.filter((item) => item !== searchWord.trim());
    const newHistory = [searchWord.trim(), ...filtered].slice(0, 5); 

    setRecentSearches(newHistory);
    localStorage.setItem("movie_search_history", JSON.stringify(newHistory));
  };

  const deleteFromHistory = (e: React.MouseEvent, wordToDelete: string) => {
    e.stopPropagation(); 
    const updatedHistory = recentSearches.filter((item) => item !== wordToDelete);
    setRecentSearches(updatedHistory);
    localStorage.setItem("movie_search_history", JSON.stringify(updatedHistory));
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    if (inputValue.trim().length === 0 && recentSearches.length > 0) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setFoundMovies([]);
      setOpen(recentSearches.length > 0);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchMovie(inputValue);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, recentSearches]);

  const searchMovie = async (value: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      
      const results = response.data.results || [];
      setFoundMovies(results);
      setOpen(results.length > 0 || recentSearches.length > 0);
    } catch (error) {
      console.error("Хайлт хийхэд алдаа гарлаа:", error);
    }
  };

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative flex items-center cursor-text">
            <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <Input
              placeholder="Search movies..."
              value={inputValue}
              onChange={handleType}
              onFocus={handleInputFocus}
              className="w-[200px] h-[36px] rounded-lg bg-[#F4F4F5] px-3 text-black pl-8 focus:w-[250px] transition-all pointer-events-auto relative z-10"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent 
          align="start" 
          sideOffset={6} 
          className="w-[250px] bg-white rounded-lg shadow-lg border border-zinc-200 p-1 z-50"
          onInteractOutside={() => setOpen(false)}
        >
          {inputValue.trim().length === 0 && recentSearches.length > 0 ? (
            <>
              <div className="px-2 py-1.5 text-xs font-semibold text-zinc-400">
                Recent Searches
              </div>
              {recentSearches.map((searchWord, index) => (
                <DropdownMenuItem 
                  key={index}
                  onClick={() => {
                    setInputValue(searchWord); 
                  }}
                  className="flex items-center justify-between cursor-pointer hover:bg-zinc-100 px-3 py-2 text-sm text-zinc-700 font-medium rounded-md group"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{searchWord}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteFromHistory(e, searchWord)}
                    className="p-1 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-zinc-200 transition-opacity"
                  >
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-600" />
                  </button>
                </DropdownMenuItem>
              ))}
            </>
          ) : (
            <>
              {foundMovies.slice(0, 5).map((movie) => (
                <DropdownMenuItem 
                  key={movie.id}
                  onClick={() => {
                    saveSearchToHistory(inputValue); 
                    router.push(`/movie/${movie.id}`);
                    setOpen(false);
                    setInputValue("");
                  }} 
                  className="cursor-pointer hover:bg-zinc-100 px-3 py-2 text-sm text-black font-medium rounded-md"
                >
                  {movie.title}
                </DropdownMenuItem>
              ))}
              
              {foundMovies.length > 0 && (
                <DropdownMenuItem 
                  onClick={() => {
                    saveSearchToHistory(inputValue); 
                    router.push(`/movies?search=${inputValue}`);
                    setOpen(false);
                  }} 
                  className="cursor-pointer text-center justify-center font-semibold text-indigo-600 hover:bg-indigo-50 text-xs py-2 border-t border-zinc-100 rounded-b-md mt-1"
                >
                  See more
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchInput;

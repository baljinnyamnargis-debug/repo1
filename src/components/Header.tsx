"use client";
import Image from "next/image";
import { ToggleTheme } from "@/components/lightswind/toggle-theme";
import Input from "@/components/ui/Input";
import { Search } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchInput from "./SearchInput";

const Header = () => {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );

        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenres();
  }, []);

  return (
    <header className="flex w-full min-h-[59px] md:h-[64px] px-4 justify-between items-center">
      <div className="flex items-center w-[1440px] justify-between mx-auto flex-wrap md:flex-nowrap gap-3 md:gap">
        <div className="flex items-center">
          <Image src="/film.png" alt="Logo" width={20} height={20} />
          <p className="font-bold text-xl ml-2 text-color:var(--Indigo-700, #4338CA)">
            Movie Z
          </p>
        </div>
        <nav className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Genre</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {genres?.map((genre) => (
                    <NavigationMenuLink
                      key={genre.id}
                      href={`/genre?id=${genre.id}`}
                    >
                      {genre.name}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <SearchInput />
        </nav>
        <ToggleTheme animationType="swipe-left" />
      </div>
    </header>
  );
};

export default Header;

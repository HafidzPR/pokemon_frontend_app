import React, { useEffect, useState } from "react";
import CardImg from "../../components/card/pokeball/CardImg";

const Pokeball: React.FC = () => {
  const [caughtPokemons, setCaughtPokemons] = useState<
    { name: string; nickname: string; sprite: string }[]
  >([]);

  useEffect(() => {
    const storedPokemons = JSON.parse(
      localStorage.getItem("myPokemons") || "[]"
    );
    setCaughtPokemons(storedPokemons);
  }, []);

  const removePokemon = (nickname: string) => {
    const updatedPokemons = caughtPokemons.filter(
      (pokemon) => pokemon.nickname !== nickname
    );
    setCaughtPokemons(updatedPokemons);
    localStorage.setItem("myPokemons", JSON.stringify(updatedPokemons));
  };

  return (
    <div className="flex flex-col w-full mt-10 mb-8 md:mb-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-5 shadow-xl rounded-lg">
      <section className="flex flex-col py-10">
        <h1 className="text-center text-white text-3xl font-extrabold drop-shadow-lg">
          My Pokemon
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] place-items-center gap-5 md:gap-15 p-6">
          {caughtPokemons.map((pokemon, index) => (
            <div
              key={index}
              className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg animate-pulse hover:animate-none"
            >
              <CardImg data={pokemon} onRemove={removePokemon} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pokeball;

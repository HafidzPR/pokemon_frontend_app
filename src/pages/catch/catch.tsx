import React, { useState } from "react";
import { useParams } from "react-router";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import background from "../../assets/pokemon-background.jpg";

const Catch: React.FC = () => {
  const { name } = useParams();
  const { detailpokemon } = usePokemonDetail(name || "");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [, setCatchResult] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleCatchClick = () => {
    const chance = Math.random();
    if (chance < 0.5) {
      setCatchResult(true);
      setIsPopupOpen(true);
    } else {
      alert(`${name} has escaped! TRY AGAIN!`);
    }
  };

  const savePokemon = () => {
    if (nickname.trim() === "") return;

    const storedPokemons = JSON.parse(
      localStorage.getItem("myPokemons") || "[]"
    );
    const newPokemon = {
      nickname,
      name,
      sprite:
        detailpokemon?.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
    };
    storedPokemons.push(newPokemon);
    localStorage.setItem("myPokemons", JSON.stringify(storedPokemons));

    setIsPopupOpen(false);
    alert(`${nickname} has successfully been added to the collection!`);
  };

  return (
    <div
      className="flex flex-col items-center pt-20 min-h-screen pb-25 bg-no-repeat bg-center bg-cover md:bg-contain hover:bg-red-950 transition-colors transition-all duration-1000"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="rounded-xl shadow-md p-4 border-2 border-white bg-cyan-500 text-[10px] hover:bg-cyan-400 transition-colors">
        Wild {detailpokemon?.name} Appeared!
      </div>
      <div className="grow pt-50">
        <img
          src={
            detailpokemon?.sprites.versions["generation-v"]["black-white"]
              .animated.front_default
          }
          alt={name}
          className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform"
        />
      </div>
      <div className="flex flex-row gap-8">
        <div className="rounded-xl shadow-md p-4 border-2 border-white bg-blue-500 text-[10px] hover:bg-yellow- transition-colors">
          What will you do?
        </div>
        <div className="flex justify-center rounded-xl shadow-md p-4 border-2 border-white bg-red-700 text-[10px] hover:bg-yellow-300 transition-colors">
          <button
            onClick={handleCatchClick}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            Attempt to Catch!
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-gray-600 p-6 rounded-lg shadow-lg text-center w-80 text-white">
            <h2 className="text-xl font-bold mb-4">
              You Caught {detailpokemon?.name}
            </h2>
            <p className="text-start">Nickname:</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={savePokemon}
                className="w-32 h-12 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="w-32 h-12 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catch;

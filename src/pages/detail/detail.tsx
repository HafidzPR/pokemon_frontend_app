import React from "react";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { useNavigate, useParams } from "react-router";
import CardStats from "../../components/card/detail/stats/CardStats";
import CardImg from "../../components/card/detail/img/CardImg";
import CardName from "../../components/card/detail/name/CardName";
import CardAbility from "../../components/card/detail/ability/CardAbility";
import CardMove from "../../components/card/detail/move/CardMove";

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { detailpokemon } = usePokemonDetail(name || "");

  const handleCatch = (name: string) => {
    navigate(`/catch/${name}`);
  };

  if (!detailpokemon)
    return <div className="text-white text-xl">Loading...</div>;
  return (
    <div className="flex flex-col items-center pt-18 mb-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-5 shadow-xl rounded-lg">
      <div className="w-[400px] space-y-3 bg-gray-800 p-6 rounded-lg shadow-2xl">
        <div className="flex flex-row space-x-3">
          <div className="hover:scale-105 transition-transform">
            <CardImg data={detailpokemon} />
          </div>
          <div className="hover:scale-105 transition-transform">
            <CardStats data={detailpokemon} />
          </div>
        </div>
        <div className="text-center text-yellow-300 text-2xl font-bold drop-shadow-lg">
          <CardName data={detailpokemon} />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="hover:scale-105 transition-transform">
            <CardAbility data={detailpokemon} />
          </div>
          <div className="hover:scale-105 transition-transform">
            <CardMove data={detailpokemon} />
          </div>
        </div>
        <div>
          <button
            onClick={() => handleCatch(detailpokemon.name)}
            className="h-[50px] rounded-xl shadow-lg p-4 border-2 border-yellow-400 bg-gray-700 w-full text-yellow-300 font-bold hover:bg-yellow-500 hover:text-gray-900 transition-colors"
          >
            Catch!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

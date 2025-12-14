import { IMG_URL } from "../utils/api";

export default function CastCard({ person }){
  return (
    <div className="min-w-[140px] bg-gray-800 rounded-lg p-2 text-center">
      <img
        src={person.profile_path ? IMG_URL + person.profile_path : "https://via.placeholder.com/140x200?text=No+Image"}
        alt={person.name}
        className="w-full h-40 object-cover rounded"
      />
      <h4 className="text-white mt-2 text-sm font-semibold">{person.name}</h4>
      <p className="text-gray-300 text-xs">{person.character}</p>
    </div>
  );
}

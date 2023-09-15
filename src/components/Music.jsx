import { NavLink } from "react-router-dom";

const Music = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <NavLink to="/album">
          <button
            className={`font-bold text-center text-2xl cursor-pointer border rounded-lg border-8 hover:border-blue-500 bg-gradient-to-r from-purple-500 to-pink-500 mt-5 p-2
            
            }`}
          >
            Albums
          </button>
        </NavLink>
        <NavLink to="/playlist">
          <button
            className={`font-bold text-center text-2xl cursor-pointer border rounded-lg border-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:border-blue-500 mt-5 p-2 `}
          >
            Playlist
          </button>
        </NavLink>
        <NavLink to="/search">
          <button
            className={`font-bold text-center text-2xl cursor-pointer border rounded-lg border-8 hover:border-blue-500 bg-gradient-to-r from-purple-500 to-pink-500 mt-5 p-2
            
            }`}
          >
            search
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Music;

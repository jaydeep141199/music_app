import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Album = () => {
  const [Data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://saavn.me/modules?language=hindi,english")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.albums);
      });
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <div
        className={`${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } transition-colors duration-500`}
      >
        <div className="flex items-end justify-end mt-4 mr-2">
          <button
            onClick={toggleDarkMode}
            className={`${
              darkMode ? "bg-blue-500 text-white" : "bg-white text-black"
            } rounded-full border border-zinc-600 p-2`}
          >
            {darkMode ? (
              <span role="img" aria-label="moon">
                &#9728;
              </span>
            ) : (
              <span role="img" aria-label="sun">
                &#127769;
              </span>
            )}
          </button>
        </div>
        <div>
          <p className="font-bold pl-5 text-xl">List Of Album</p>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 py-5">
            {Data.map((item) => (
              <div
                className="main-div border rounded-lg border-4 border-orange-500 hover:bg-emerald-300 hover:text-white"
                key={item.id}
              >
                <div>
                  <NavLink to={`/albums/${item.id}`}>
                    <img
                      src={item.image[2].link}
                      alt="album"
                      className="w-full hover:scale-75 duration-1000 ease-in-out"
                    />
                  </NavLink>

                  <h2
                    className="text-lg font-bold mb-2 text-center truncate"
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  />
                  <p className="text-center font-bold">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

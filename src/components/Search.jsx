import React, { useState, useRef, useEffect } from "react";
import img from '../images/10second f.jpeg'
import img1 from '../images/10secondrewind.jpeg'

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongAudioUrl, setCurrentSongAudioUrl] = useState(""); 
  const [currentTime, setCurrentTime] = useState(0);
  const currentSongRef = useRef(null);
  const audioRef = useRef(null);

  const handleSearch = () => {
    fetch(`https://saavn.me/search/songs?query=${searchTerm}`)
      .then((response) => response.json())
      .then((responseData) => {
        setSearchResults(responseData.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (currentSong) {
      const delay = 500; // Delay in milliseconds (3 seconds)
      const timeoutId = setTimeout(() => {
        window.location.href = "#songlist";
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [currentSong]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const playSong = (song) => {
   
      setCurrentSong(song);
      setCurrentSongAudioUrl(song.downloadUrl[4]?.link || "");
      setCurrentTime(0); // Reset current playing time when a new song starts
    audioRef.current.currentTime = 0; // Reset the audio element's currentTime to 0
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Rewind by 10 seconds
    }
  }; const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Forward by 10 seconds
    }
  };

  return (
    <>
      <div className="grid  grid-cols-1 md:grid-cols-2 pt-5">
        <input
          type="text"
          id="myInputField"
          placeholder="Search songs..."
          className=" rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:pl-4  placeholder:text-black border w-full"
          value={searchTerm}
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white  rounded-lg transition-colors duration-300  hover:ring-1 hover:ring-black w-32 hover:w-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div
        className={`${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } transition-colors duration-500`}
      >
        {" "}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-5">
            {searchResults.map((item) => (
              <div
                className="main-div border rounded-lg border-4 border-orange-500 hover:bg-emerald-300 hover:text-white"
                key={item.id}
              >
                <div  onClick={() => playSong(item)}>
                  <img
                    src={item.image[2].link}
                    alt="album"
                    className="w-full hover:scale-75 duration-1000 ease-in-out"
                  />

                  <div className="text-center font-medium">
                    <h2
                      className="text-lg font-bold mb-2 text-center truncate"
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                    <p>{item.type}</p>
                  </div>

                  {/* <button
                    className="bg-blue-500 text-white px-6 py-2 mx-28 my-4 rounded"
                   
                  >
                    {itemValue}
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        {currentSong && (
          <div
            id="songlist"
            className="bg-gray-900 text-white py-4 px-8 sticky"
            ref={currentSongRef}
          >
            <div className="container mx-auto">
              <div className="grid  grid-cols-1 lg:grid-cols-2">
                <div className="flex pl-12">
                  <img
                    src={currentSong.image[2].link}
                    alt="albums"
                    className="rounded-full w-14 inline-block"
                  />
                  <div className="marquee flex items-center justify-center">
                    <p className="text-lg font-bold truncate">
                      {currentSong.name} 
                    </p>
                  </div>
                </div>
                <div className="flex">
              <button className="mr-2" onClick={handleRewind}>
              <img src={img1} alt="" className="border  rounded-full w-16" />
            </button>
              <audio  ref={audioRef} key={currentSongAudioUrl} controls className="w-full"  onTimeUpdate={handleTimeUpdate}>
                <source src={currentSongAudioUrl} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
              <button className="ml-2" onClick={handleForward}><img src={img} alt="" className="border  rounded-full w-16"/></button>
              <p hidden>Current Time:{currentTime.toFixed(2)}</p>  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

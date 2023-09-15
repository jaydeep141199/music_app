
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import img from '../images/10second f.jpeg'
import img1 from '../images/10secondrewind.jpeg'

const PlayList = () => {
  const [song, setSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongAudioUrl, setCurrentSongAudioUrl] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const { id } = useParams();
  const currentSongRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch(`https://saavn.me/playlists?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSong(data.data);
      });
  }, [id]);

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

  const playSong = (song) => {
    setCurrentSong(song);
    setCurrentSongAudioUrl(song.downloadUrl[4]?.link || ""); setCurrentTime(0); // Reset current playing time when a new song starts
    audioRef.current.currentTime = 0; // Reset the audio element's currentTime to 0
  };
  const handleTimeUpdate = () => {
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
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          PlayList Details
        </h1>
        <div>
          <img
            src={song?.image[2].link}
            alt=""
            className="object-cover p-5 mb-4 rounded-lg mx-auto hover:opacity-75"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {song &&
            song.songs &&
            song.songs.map((item) => (
              <div
                key={item.id}
                className="bg-pink-700 p-4 shadow rounded-lg text-center"
                onClick={() => playSong(item)}
              >
                <img
                  src={item.image[2].link}
                  alt="albums"
                  className="rounded-full w-14 inline-block"
                />
                <h2 className="text-lg font-bold mb-2 text-center">
                  {item.name}
                </h2>
                <div>
                  {item.album ? (
                    <>
                      <p className="">
                        <span className="font-bold">Album:</span>{" "}
                        {item.album.name}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">Album details not available</p>
                  )}
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
                  <p className="text-lg font-bold">{currentSong.name} ......</p>
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
              <p hidden>Current Time:{currentTime.toFixed(2)}</p>    </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayList;

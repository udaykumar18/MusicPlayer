import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "./styles/App.scss";

import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[6]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songinfo, setSongInfo] = useState({
    currentTime: 0,
    durationTime: 0,
  });

  const animationPercentage =
    (songinfo.currentTime / songinfo.durationTime) * 100;

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songinfo,
      currentTime: current,
      durationTime: duration,
    });
  };
  // const songEndHandler = async () => {
  //   let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //   await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

  //   if (isPlaying) {
  //     audioRef.current.play();
  //   }
  // };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songinfo={songinfo}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        animationPercentage={animationPercentage}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
      ></audio>
    </div>
  );
}

export default App;

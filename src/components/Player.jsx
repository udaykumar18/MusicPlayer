import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songinfo,
  songs,
  setCurrentSong,
  setSongs,
  animationPercentage,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newsongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newsongs);
  };

  //Event Handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songinfo, currentTime: e.target.value });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songinfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]} )`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songinfo.durationTime || 0}
            value={songinfo.currentTime}
            onChange={dragHandler}
          />
          <div
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
            className="animate-track"
          ></div>
        </div>
        <p>{songinfo.durationTime ? getTime(songinfo.durationTime) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="skip-back"
          size="2x"
          onClick={() => {
            skipTrackHandler("skip-back");
          }}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className="play"
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          className="skip-forward"
          size="2x"
          onClick={() => {
            skipTrackHandler("skip-forward");
          }}
        />
      </div>
    </div>
  );
};

export default Player;

import React from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  const { playerId, url, muted, playing } = props;
  return (
    <>
      <ReactPlayer key={playerId} url={url} muted={muted} playing={playing} />
    </>
  );
};

export default Player;

import React from "react";
import axios from "axios";

const ArtistPreview = ({ artistName, artistId, tracks }) => {
  const addToSpotify = () => {
    axios.post("/api/add-tracks", {
      trackURIs: tracks.map(track => track.uri)
    }).then((response) => {
      alert("Tracks added successfully!");
    }).catch((err) => {
      // if err is no playlist id error then show spotify modal.
      // else log the error.
      console.log(err.toString());
    });
  };
  return (
    <div>
      <h1>{artistName}</h1>
      <img
        alt="artist image"
        className="artist-img"
        src={`https://images.sk-static.com/images/media/profile_images/artists/${artistId}/huge_avatar`} />
      <ol>
        {tracks.length > 0 && tracks.map(track => (<li key={track.uri}>{track.name}</li>))}
      </ol>
      <button id="addTracks" onClick={addToSpotify}>Add to my Playlist</button>
    </div>
  )
};

export default ArtistPreview;

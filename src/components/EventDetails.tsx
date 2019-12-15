import React, { useState, useEffect } from "react";
import "./login.css";
import { EventDetailsProps, SongkickEvent } from "../../interfaces";
import racoonLoader from "../loading-graphics/racoon.gif";
import axios from "axios";
import ArtistPreview from "./ArtistPreview";
import { navigate } from "hookrouter";

const EventDetails = ({eventId, user}: EventDetailsProps) => {
  if (!user) {
    navigate("/");
  }

  const [event, setEvent] = useState({} as SongkickEvent);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data: eventData } = await axios
          .get<SongkickEvent>("/api/event", {
            params: {
              eventId
            }
          });

        setEvent(eventData);

        const artistNames = eventData.performance
          .map(performance => performance.artist.displayName)
          .join(",");

        const { data: topTracksData } = await axios
          .get("/api/top-tracks", {
            params: {
              artistNames
            }
          });

        setTopTracks(topTracksData);
        setLoading(false);

      } catch (err) {
        setLoading(false);
        console.log(err.response.data);
      }
    })();
  }, [eventId])

  return (
    <div className="wrapper">
      {loading && (
        <img
          style={{ display: "block", margin: "auto" }}
          alt="Loading..."
          src={racoonLoader}
        />
      )}
      {event && !loading &&
        <div>
          <h1 className="text-black text-3xl">Event Details</h1>
          {event.performance && event.performance.map(performance => {

            const [artistData] = topTracks
              .filter(artistTopTrack =>
                artistTopTrack.artistName === performance.artist.displayName);

            return <ArtistPreview
              key={performance.artist.id}
              artistName={performance.artist.displayName}
              artistId={performance.artist.id}
              tracks={artistData.topTracks}/>
          })}
        </div>
      }
    </div>
  );
};

export default EventDetails;

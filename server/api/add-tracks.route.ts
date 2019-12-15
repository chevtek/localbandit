import spotifyClient from "../utils/spotify-client";

export default async (req, res) => {
  try {
    const { trackURIs } = req.body;
    const spotifyApi = spotifyClient(req, res);
    console.log(JSON.stringify(req.user));
    console.log(JSON.stringify(trackURIs));
    const response = await spotifyApi.addTracksToPlaylist(
      req.user.spotify.playlist.id,
      trackURIs
    );
    console.log(response);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

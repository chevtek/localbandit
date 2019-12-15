import spotifyClient from "../utils/spotify-client";

export default async (req, res) => {
  try {
    if (!req.user.spotify) {
      return res.status(200).json(false);
    }
    const { id: playlistId } = req.user.spotify;

    const spotifyApi = spotifyClient(req, res);

    const response = await spotifyApi.areFollowingPlaylist(playlistId, [req.user.spotify.id]);

    if (response.body.length === 0 || !response.body[0]) {
      return res.status(200).json(false);
    }

    res.status(200).json(true);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

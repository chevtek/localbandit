import axios from "axios";

export default {

  user: null,
  modals: null,

  async createPlaylist(name) {
    try {
      await axios.post("/api/create-playlist", { name });

      await this.modals.result.open({
        success: true,
        title: "Playlist Created",
        body: `Successfully created playlist "localband.it: ${name} on your Spotify account!`
      });
    } catch (err) {
      this.handleError(err);
    }
  },

  async playlistFollowed() {
    try {
      const response = await axios.get("/api/playlist-followed");
      return response.data;
    } catch (err) {
      return false;
    }
  },

  async topTracks(artistNames) {
    try {
      const response = await axios.get("/api/top-tracks", {
        params: { artistNames }
      });

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  },

  async addTracks(trackURIs) {
    try {
      const playlistFollowed = await this.playlistFollowed();

      if (!playlistFollowed) {
        await this.modals.createPlaylist.open({ user: this.user });
      }

      await axios.post("/api/add-tracks", { trackURIs });

      await this.modals.result.open({
        success: true,
        title: "Tracks Added",
        body: `Successfully added ${trackURIs.length} tracks to your Spotify playlist!`
      });
    } catch (err) {
      this.handleError(err);
    }
  },

  async event(eventId) {
    try {
      const response = await axios.get("/api/event", { params: { eventId } });

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  },

  async events(city, state, startDate, endDate) {
    try {
      const response = await axios.get("/api/events", {
        params: {
          city,
          state,
          startDate,
          endDate
        }
      });

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  },

  async getUser() {
    try {
      const response = await axios.get("/auth/user");

      return response.data;
    } catch (err) {
      this.handleError(err);
    }
  },

  async handleError(err) {
    await this.modals.result.open({
      success: false,
      title: `${err.status} Error!`,
      body: `An error has occurred. ${err.toString()}`
    });
    throw err;
  }

};

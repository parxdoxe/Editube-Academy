const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: "AIzaSyCZuuNyAsmQR3LjQcBqevfBHsbRKQ5DUEE",
});

exports.searchVideos = async (query) => {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 1,
    });
    return response.data.items.map((item) => {
      return {
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url,
      };
    });
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
};

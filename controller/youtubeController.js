const youtubeService = require("../service/youtubeService");
const openaiService = require("../service/openaiService");

function splitGptResponse(response) {
  return response
    .split(/\d+\./)
    .map((s) => s.trim())
    .filter(Boolean);
}

exports.getSearch = async (req, res) => {
  try {
    const question = req.body.question;
    const answer = await openaiService.queryGPT(question);

    const searchTerms = splitGptResponse(answer);

    const youtubeResults = [];
    for (let term of searchTerms) {
      const videos = await youtubeService.searchVideos(term);
      youtubeResults.push({
        searchTerm: term,
        videos: videos,
      });
    }

    res.json({ answer, youtubeResults });
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos from YouTube" });
  }
};

import { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import ProgressBar from "../component/ProgressBar";
import Sidebar from "../component/Sidebar";
import InputSearch from "../component/InputSearch";
import { useSearch } from "../context/SearchContext";

function App() {
  const { results } = useSearch();

  const [quiz, setQuiz] = useState(false);
  const [resultsQuiz, setResultsQuiz] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const [viewVideo, setViewVideo] = useState(new Set());
  const [progress, setProgress] = useState(0);

  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (resultsQuiz) {
      const individualQuizzes = resultsQuiz.trim().split("\n\n");
      const parsedQuizzes = individualQuizzes.map((quiz) => {
        const lines = quiz.split("\n");
        const question = lines[0];
        const answers = lines.slice(1);
        return { question, answers };
      });

      setQuizzes(parsedQuizzes);
    }

    console.log(quizzes);
  }, [resultsQuiz]);

  const fetchQuiz = async (title) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/openai/query-gpt",
        {
          params: {
            prompt: `Proposez moi un quiz de 5 questions sur le thème ${title}, avec 3 réponses par questions.`,
          },
        }
      );
      setResultsQuiz(response.data.answer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVideoEnd = async (videoId, title) => {
    const totalVideos = results.reduce(
      (sum, result) => sum + result.videos.length,
      0
    );

    if (!viewVideo.has(videoId)) {
      setProgress((prev) => prev + Math.round(100 / totalVideos));
      setViewVideo((prev) => new Set([...prev, videoId]));

      await fetchQuiz(title);
      setQuiz(true);
    }
  };

  return (
    <div className="flex bg-gray-800">
      <Sidebar />
      <div className="flex-1 ps-20 pe-20">
        <div>
          <InputSearch />

          <ProgressBar progress={progress} />
          <div>
            {results.map((result, idx) => (
              <div key={idx}>
                <h2>{result.searchTerm}</h2>
                {result.videos.map((video, videoIdx) => (
                  <div key={videoIdx}>
                    <YouTube
                      opts={videoOptions}
                      videoId={video.videoId}
                      title={video.title}
                      onEnd={() => handleVideoEnd(video.videoId, video.title)}
                    />
                  </div>
                ))}
              </div>
            ))}
            {quiz && (
              <div>
                {quizzes.map((result, id) => (
                  <form class=" relative ">
                    <label for="name-with-label" class="text-gray-700">
                      {result.question}
                    </label>
                    {result.answers.map((answer, id) => (
                      <label className="flex items-center mb-3 space-x-3">
                        <input
                          type="checkbox"
                          name="checked-demo"
                          class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                        />
                        <span className="font-normal text-gray-700 dark:text-white">
                          {answer}
                        </span>
                      </label>
                    ))}
                  </form>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

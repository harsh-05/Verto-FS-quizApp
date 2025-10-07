import axios from "axios";
import { useEffect, useState } from "react";
import { getToken, URL } from "./configs";
import { useNavigate } from "react-router";

function formatTime(seconds: number) {
  const second = Number(seconds);
  const m = Math.floor(second / 60);
  const s = second % 60;
  return s === 0 ? `${m} min` : `${m}m ${s}s`;
}

export default function Quizes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function fetchdata() {
      try {
        const response = await axios.get(`${URL}/quizes`, {
          headers: { Authorization: getToken() },
        });
        if (!mounted) return;
        setQuizzes(response.data || []);
      } catch (e) {
        if (!mounted) return;
        setError("Unable to load quizzes");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchdata();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Available Quizzes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a quiz and press <span className="font-medium">Start</span>.
          </p>
        </header>

        {loading && (
          <div className="py-12 text-center text-gray-500">
            Loading quizzes…
          </div>
        )}
        {!loading && error && (
          <div className="text-sm text-red-600 mb-4">{error}</div>
        )}

        {!loading && !error && quizzes.length === 0 && (
          <div className="py-12 text-center text-gray-500 bg-white rounded-md border">
            No quizzes found.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizzes.map(
            (q: { id: number; quizDesc: string; time_limit: number }) => (
              <div
                key={q.id}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between border"
              >
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {q.quizDesc}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Duration: {formatTime(q.time_limit)}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Quiz ID: {q.id}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button onClick={ ()=>(navigate(`/quiz/${q.id}`))} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    Start
                  </button>
                  <div className="text-xs text-gray-400">
                    {/* optional small hint */}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

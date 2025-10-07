import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { getToken, URL } from "./configs";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

interface Option {
  id: number;
  optionDesc: string;
}

interface Question {
  id: number;
  quesdesc: string;
  quesScore: number;
  questionoptions: Option[];
}

interface QuizType {
  quizDesc?: string;
  time_limit: number;
  questions: Question[];
}

export default function Quiz() {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState<Record<number, number | null>>({}); // { questionId: optionId | null }
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  // fetch quiz
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
          setLoading(true);
          console.log(quizId)
          console.log(URL);
          
        const res = await axios.get(`${URL}/quiz/${quizId}`, {
          headers: { Authorization: getToken() },
        });
        if (!mounted) return;
        setQuiz(res.data as QuizType);
        setRemaining((res.data as QuizType)?.time_limit ?? 0);
      } catch (e) {
        if (!mounted) return;
        setError("Failed to load quiz");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [quizId]);

  // safe userId read
  const safeGetUserId = (): number | null => {
    try {
      const raw = localStorage.getItem("userId");
      if (!raw) return null;
      return JSON.parse(raw) as number;
    } catch {
      return null;
    }
  };

  // submit handler
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e && e.preventDefault) e.preventDefault();
      if (!quiz || submitting || submitted) return;
      setSubmitting(true);
      setError("");

      const answers = quiz.questions.map((q) => ({
        questionId: q.id,
        optionId: selected[q.id] ?? null,
      }));

      const payload = {
        userId: safeGetUserId(),
        quizId: Number(quizId),
        answers,
      };

      try {
        const res = await axios.post(`${URL}/result`, payload, {
          headers: { Authorization: getToken() },
        });
        console.log("result response:", res.data);
        setSubmitted(true);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || err?.message || "Submit failed"
        );
        console.error(err);
      } finally {
        setSubmitting(false);
        if (timerRef.current !== null) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    },
    [quiz, selected, submitting, submitted, quizId]
  );

  // start timer when quiz loads; auto-submit when timer reaches 0
  useEffect(() => {
    if (!quiz) return;

    // clear existing
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // auto submit (fire-and-forget)
          void handleSubmit();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [quiz, handleSubmit]);

  const handleSelect = (questionId: number, optionId: number) => {
    setSelected((s) => ({ ...s, [questionId]: optionId }));
  };

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrentIndex((i) => Math.min((quiz?.questions?.length ?? 1) - 1, i + 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading quiz…</div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!quiz) return null;

  const q = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const chosen = selected[q.id];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {quiz.quizDesc ?? "Quiz"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Good luck — answer all questions before time runs out.
            </p>
          </div>

          <div className="text-sm text-gray-700 text-right">
            <div className="font-medium">Time left</div>
            <div className="mt-1 px-3 py-1 bg-white rounded-md shadow-sm inline-block font-mono">
              {formatTime(remaining)}
            </div>
          </div>
        </header>

        <div className="mb-4">
          <div className="text-sm text-gray-600">
            Question {currentIndex + 1} / {total}{" "}
            <span className="text-gray-400">• {q.quesScore} pts</span>
          </div>
          <div className="h-2 bg-white rounded-full mt-2 overflow-hidden border">
            <div
              className="h-full bg-indigo-500"
              style={{
                width: `${Math.round(((currentIndex + 1) / total) * 100)}%`,
              }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <div className="mb-4">
            <div className="text-lg font-medium text-gray-800">
              {q.quesdesc}
            </div>
          </div>

          <div className="space-y-3">
            {q.questionoptions.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  chosen === opt.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={chosen === opt.id}
                  onChange={() => handleSelect(q.id, opt.id)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-gray-800">{opt.optionDesc}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">
                Selected: {Object.keys(selected).length}/{total}
              </div>

              {currentIndex < total - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="px-4 py-2 rounded-md bg-green-600 text-white font-medium disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : submitted
                    ? "Submitted"
                    : "Submit"}
                </button>
              )}
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </form>

        {submitted && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md text-green-700">
            Your answers were submitted.{" "}
            <span className="font-semibold">Good job!</span>
          </div>
        )}
      </div>
    </div>
  );
}

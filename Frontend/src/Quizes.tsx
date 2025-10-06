
import React, { useMemo, useState } from "react";

/**
 * SignInPage
 * A responsive, accessible sign-in component styled with TailwindCSS.
 * Designed for a quiz app: playful gradient, card layout, mascot SVG, and clear call-to-action.
 *
 * Usage: <SignInPage onSubmit={(creds) => ...} />
 * The component performs light client-side validation and exposes an onSubmit prop.
 */

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    setError("");
    if (!email) return "Email is required";
    // Simple email check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Please enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
   
  };

  const handleSocial = async () => {
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-600 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Brand / Illustration */}
        <div className="hidden md:flex flex-col items-start justify-center space-y-6 px-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              {/* playful quiz mascot: question-mark inside a speech-bubble */}
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 2C7.03 2 3 6.03 3 11c0 1.69.44 3.28 1.21 4.66L12 22l7.79-6.34C20.56 14.28 21 12.69 21 11c0-4.97-4.03-9-9-9z"
                  fill="white"
                  opacity=".08"
                />
                <path d="M11 17h2v2h-2z" fill="white" />
                <path
                  d="M12 6a3 3 0 00-3 3h2a1 1 0 112 0c0 1-1 1.375-1.75 2C10.25 12.5 10 13 10 14h2c0-1 .75-1.25 1.25-1.75C14.25 11.5 15 11 15 9a3 3 0 00-3-3z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Quizify
              </h1>
              <p className="text-sm text-white/80">
                Learn faster • Compete with friends • Track progress
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-white font-semibold">
              Ready to ace your next quiz?
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Sign in to access quizzes, track your scores, and challenge
              others.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-4">
              <li>Curated quizzes across topics</li>
              <li>Timed challenges & leaderboards</li>
              <li>Progress dashboard & analytics</li>
            </ul>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white/6 border border-white/8 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Sign in to Quizify
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  Enter your account details to continue
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                  aria-hidden
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C7.03 2 3 6.03 3 11c0 1.69.44 3.28 1.21 4.66L12 22l7.79-6.34C20.56 14.28 21 12.69 21 11c0-4.97-4.03-9-9-9z"
                      fill="white"
                      opacity="0.08"
                    />
                    <path d="M11 17h2v2h-2z" fill="white" />
                    <path
                      d="M12 6a3 3 0 00-3 3h2a1 1 0 112 0c0 1-1 1.375-1.75 2C10.25 12.5 10 13 10 14h2c0-1 .75-1.25 1.25-1.75C14.25 11.5 15 11 15 9a3 3 0 00-3-3z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <form className="mt-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-white/80">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full bg-white/5 border border-white/6 rounded-md px-3 py-2 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    placeholder="you@example.com"
                    required
                    aria-label="Email"
                  />
                </label>

                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Password</span>
                    <a
                      href="#"
                      className="text-sm text-indigo-200 hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full bg-white/5 border border-white/6 rounded-md px-3 py-2 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    placeholder="Your password"
                    required
                    aria-label="Password"
                  />
                </label>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-white/80">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/3 focus:ring-2 focus:ring-indigo-400"
                      aria-label="Remember me"
                    />
                    <span className="text-sm">Remember me</span>
                  </label>

                  <a
                    href="#"
                    className="text-sm text-indigo-200 hover:underline"
                  >
                    Create account
                  </a>
                </div>

                {error && (
                  <div className="text-sm text-red-300 bg-red-900/20 border border-red-800/30 p-2 rounded">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-lg px-4 py-2 font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:scale-[1.01] active:scale-100 transition-transform disabled:opacity-60"
                >
                  {loading ? (
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="4"
                      />
                      <path
                        d="M22 12a10 10 0 00-10-10"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : null}
                  <span>{loading ? "Signing in..." : "Sign in"}</span>
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/8" />
                  <div className="text-sm text-white/70">or continue with</div>
                  <div className="h-px flex-1 bg-white/8" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/8 bg-white/3 px-3 py-2 text-sm text-white/90 hover:scale-[1.01] transition"
                  >
                    {/* Google icon */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M21.35 11.1h-9.18v2.92h5.3c-.23 1.2-1.35 3.52-5.3 3.52-3.19 0-5.8-2.62-5.8-5.84S8.98 6.86 12.17 6.86c1.82 0 3.03.78 3.73 1.43l2.55-2.46C17.1 4.48 14.79 3.5 12.17 3.5 7.32 3.5 3.5 7.32 3.5 12.17S7.32 20.83 12.17 20.83c6.41 0 9.18-4.62 9.18-9.73 0-.66-.08-1.14-.0. -0.0z"
                        fill="white"
                        opacity="0.9"
                      />
                    </svg>
                    <span className="truncate">Google</span>
                  </button>

                  <button
                    type="button"
                  
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/8 bg-white/3 px-3 py-2 text-sm text-white/90 hover:scale-[1.01] transition"
                  >
                    {/* GitHub icon */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.78-1.35-1.78-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.69.24 2.94.12 3.25.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .5z"
                        fill="white"
                        opacity="0.95"
                      />
                    </svg>
                    <span className="truncate">GitHub</span>
                  </button>
                </div>

                <p className="mt-3 text-xs text-white/70">
                  By continuing, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* subtle floating quiz card accent */}
      <div className="pointer-events-none fixed right-8 bottom-8 hidden lg:block">
        <div className="w-40 h-28 rounded-2xl bg-white/5 border border-white/6 backdrop-blur-md p-4 transform rotate-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-white/8 flex items-center justify-center">
              Q
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Daily Challenge
              </div>
              <div className="text-xs text-white/70">15 Qs • 10 mins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





export function QuizListPage() {
  // sample data — replace with real data when ready
  const sampleQuizzes = [
    {
      id: 1,
      title: "General Knowledge Blast",
      desc: "A fun mix of general trivia across topics.",
      questions: 15,
      duration: 10,
      difficulty: "Easy",
      tags: ["GK", "Timed"],
    },
    {
      id: 2,
      title: "JS Fundamentals",
      desc: "Test your JavaScript basics: scope, closures, arrays.",
      questions: 20,
      duration: 12,
      difficulty: "Medium",
      tags: ["Programming", "JS"],
    },
    {
      id: 3,
      title: "World History",
      desc: "Key events and figures from modern history.",
      questions: 18,
      duration: 15,
      difficulty: "Hard",
      tags: ["History", "Chronology"],
    },
    {
      id: 4,
      title: "Math Puzzles",
      desc: "Mental math & logic puzzles to warm up your brain.",
      questions: 12,
      duration: 8,
      difficulty: "Medium",
      tags: ["Math", "Puzzles"],
    },
    {
      id: 5,
      title: "Hindi Vocabulary",
      desc: "Improve your Hindi word bank with quick prompts.",
      questions: 10,
      duration: 7,
      difficulty: "Easy",
      tags: ["Hindi", "Language"],
    },
    {
      id: 6,
      title: "Science Quickfire",
      desc: "Short rapid-fire science rounds covering physics & bio.",
      questions: 25,
      duration: 20,
      difficulty: "Hard",
      tags: ["Science", "Rapid"],
    },
  ];

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [layout, setLayout] = useState("grid"); // or 'list'

  // randomized initial order (stable for the session)
  const quizzes = useMemo(() => {
    return [...sampleQuizzes].sort(() => Math.random() - 0.5);
  }, []);

  const allTags = useMemo(() => {
    const s = new Set();
    quizzes.forEach((q) => q.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [quizzes]);

  const filtered = quizzes.filter((q) => {
    const matchesQuery =
      query.trim() === "" ||
      q.title.toLowerCase().includes(query.toLowerCase()) ||
      q.desc.toLowerCase().includes(query.toLowerCase()) ||
      q.tags.join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || q.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Quizzes</h1>
            <p className="text-sm text-white/80 mt-1">
              Choose a quiz, set the timer, and challenge yourself — good luck!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search quizzes, tags..."
                className="w-64 bg-white/6 border border-white/8 rounded-full px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Search quizzes"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-sm">
                ⌘K
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayout("grid")}
                className={`px-3 py-2 rounded-md text-sm ${
                  layout === "grid" ? "bg-white/8" : "bg-white/4"
                }`}
                aria-pressed={layout === "grid"}
              >
                Grid
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`px-3 py-2 rounded-md text-sm ${
                  layout === "list" ? "bg-white/8" : "bg-white/4"
                }`}
                aria-pressed={layout === "list"}
              >
                List
              </button>
            </div>
          </div>
        </header>

        <section className="mt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                !activeTag ? "bg-white/10" : "bg-white/4"
              }`}
            >
              All
            </button>
            {allTags.map((t) => (
              <button
               
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeTag === t
                    ? "bg-indigo-500 text-white font-semibold"
                    : "bg-white/4 text-white/90"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div
            className={`mt-6 grid ${
              layout === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {filtered.map((quiz) => (
              <article
                key={quiz.id}
                className="bg-white/6 border border-white/8 rounded-2xl p-5 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {quiz.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">{quiz.desc}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/4 text-white/90">
                        {quiz.questions} Qs
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/4 text-white/90">
                        {quiz.duration} mins
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          quiz.difficulty === "Easy"
                            ? "bg-green-600/80"
                            : quiz.difficulty === "Medium"
                            ? "bg-yellow-500/80"
                            : "bg-red-600/80"
                        } text-white`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-white/70 flex flex-wrap gap-2">
                      {quiz.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/4"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-xs text-white/60">Avg score</div>
                    <div className="mt-1 font-bold text-white text-xl">
                      {Math.floor(Math.random() * 50) + 50}%
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onStart?.(quiz)}
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
                      >
                        Start
                      </button>
                      <button className="px-3 py-2 rounded-md border border-white/8 text-white/90 text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${Math.floor(Math.random() * 70) + 20}%`,
                      }}
                      className="h-full rounded-full bg-white/20"
                    />
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-white/80 py-20 bg-white/5 border border-white/10 rounded-2xl">
                No quizzes match your search.
              </div>
            )}
          </div>
        </section>

        <footer className="mt-8 text-sm text-white/70">
          Tip: Try the{" "}
          <span className="font-semibold text-white">Daily Challenge</span> to
          earn badges and climb the leaderboard.
        </footer>
      </div>
    </div>
  );
}

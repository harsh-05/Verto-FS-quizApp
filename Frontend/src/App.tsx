
import { Link, Route, Routes } from "react-router";
import SignInPage from "./SignIn";
import PrivateRoute from "./PrivateRoute";
import { QuizListPage } from "./Quizes";

interface TopBar {
  user: { name: string; id: string };
  onSignOut: React.MouseEventHandler<HTMLButtonElement>;
}

function Topbar({ user, onSignOut }: TopBar) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-sky-600">
          QuizApp
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-700">Hi, {user.name}</span>
              <button
                onClick={onSignOut}
                className="px-3 py-1 rounded-md bg-slate-100 text-sm"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}



function App() {
 

   return (
     <Routes>
       <Route path="/signin" element={<SignInPage />} />
       <Route path="/quizes" element={<QuizListPage />}></Route>
     </Routes>
   );
}

export default App

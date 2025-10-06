
import { Route, Routes } from "react-router";
import SignIn from "./SignIn";
import Quizes from "./Quizes";
import Quiz from "./Quiz";



function App() {
 

   return (
     <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/quizes" element={<Quizes />}></Route>
       <Route path="/quiz:quizId" element={<Quiz />}></Route>
     </Routes>
   );
}

export default App

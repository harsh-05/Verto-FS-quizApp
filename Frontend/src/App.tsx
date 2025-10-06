
import { Route, Routes } from "react-router";
import SignIn from "./SignIn";
import Quizes from "./Quizes";



function App() {
 

   return (
     <Routes>
       <Route path="/" element={<SignIn />} />
       <Route path="/quizes" element={<Quizes />}></Route>
     </Routes>
   );
}

export default App

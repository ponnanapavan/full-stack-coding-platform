import Navbar from "./component/Navbar"

import { Routes,Route } from "react-router-dom"
import Problems from "./component/Problems"
import Problem from "./component/Problem"
import SignPage from "./pages/SignPage"
import LoginPage from "./pages/LoginPage"
import Submissions from "./component/Submissions"
import Contests from "./component/Contests"
import ContestProblemQuestion from "./component/ContestProblemQuestion"
import ContestCodes from "./pages/ContestCodes"
import LeaderBoard from "./component/LeaderBoard"



function App() {


  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/problems" element={<Problems/>}/>
      <Route path="/problem/:name/:id" element={<Problem/>} />
      <Route path="/signin" element={<SignPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/problemssubmissions" element={<Submissions/>}/>
      <Route path="/Contests" element={<Contests/>}/>
      <Route path="/contest/:contestName" element={<ContestCodes/>}/>
      <Route path="/contestproblem/:contestName/:problemName" element={<ContestProblemQuestion/>}/>
      <Route path="/leaderboard/:contestName"element={<LeaderBoard/>}/>
      
    </Routes>
      
    </>
  )
}

export default App

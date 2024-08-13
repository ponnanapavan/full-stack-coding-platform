
import { Routes, Route } from "react-router-dom"
import SideBar from "./component/SideBar"
import PostCode from "./pages/PostCode"
import PostedCodes from "./pages/PostedCodes"
import UpdateCode from "./pages/UpdateCode"
import PostContestCodes from "./component/PostContestCodes"
function App() {
 
  return (
   <div className="bg-black-100 w-full flex gap-5">
   <SideBar/>
   <Routes>
    <Route path="/" element={<PostCode/>}/>
    <Route path="/posted-codes" element={<PostedCodes/>}/>
    <Route path='/update-code/:id' element={<UpdateCode/>}/>
    <Route path="/ContestCodes" element={<PostContestCodes/>}/>
   </Routes>
   </div>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/Blog"
import { Signin } from "./pages/Signin"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { InitialPage } from "./pages/InitialPage"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element = {<Signin/>}/>
          <Route path="/blogs" element = {<Blogs/>}/>
          <Route path = "/blog/:blogId" element = {<Blog/>}/>
          <Route path = "/publish" element = {<Publish/>}/>
          <Route path="/" element = {<InitialPage/>}/>
        </Routes>
      </BrowserRouter>       
    </>
  )
}

export default App

import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Blogs />} path="/" />
        <Route element={<Blog />} path="/:blogid" />
        <Route element={<Register />} path="/register" />
        <Route element={<Error />} path="*" />
      </Routes>
    </div>
  );
}

export default App;

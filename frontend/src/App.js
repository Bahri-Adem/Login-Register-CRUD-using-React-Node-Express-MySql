import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>{" "}
          <Route path="/home" element={<Student />}></Route>
          <Route path="/create" element={<CreateStudent />}></Route>
          <Route
            path="/update/:id/:name/:email/:image"
            element={<UpdateStudent />}
          ></Route>
          <Route path="/delete" element={<CreateStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

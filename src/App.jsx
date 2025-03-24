import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages//Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import CornerNav from './components/CornerNav';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

//Admin
import Project from "./admin/projects/Project";
import AddProject from "./admin/projects/AddProject";
import EditProject from "./admin/projects/EditProject";

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />


          <Route path="/admin-project" element={<Project />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <CornerNav />
    </Router>
  );
};

export default App;

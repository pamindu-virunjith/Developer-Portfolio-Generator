import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import EditPortfolio from "./pages/editPortfolio";
import CreatePortfolio from "./pages/createPortfolio";
import PreviewPortfolio from "./pages/PreviewPortfolio";
import NotFound from "./pages/notFound";
import PublicPortfolio from "./pages/publicPortfolio";
function App() {
  return (
    <BrowserRouter>
      <>
        <Toaster position="top-right" />

        <Routes path="/*">
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePortfolio/>} />
          <Route path="/preview" element={<PreviewPortfolio/>} />
          <Route path="/portfolio/:username" element={<PublicPortfolio/>} />
          <Route path="/editPage/:username" element={<EditPortfolio/>}/>
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

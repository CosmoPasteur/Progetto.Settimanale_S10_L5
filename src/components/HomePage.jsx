import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<Radar />} />
          <Route path="/" element={<Contacts />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default HomePage;

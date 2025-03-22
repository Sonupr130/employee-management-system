import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewJobDetails from "./ViewJobDetails";
import ViewDocuments from "../../User/ViewDocs";

const JobDetailsRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewJobDetails />} />
        <Route path="/view-documents" element={<ViewDocuments />} />
      </Routes>
    </Router>
  );
};

export default JobDetailsRoute;

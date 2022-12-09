import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App/App';
import JobPage from './JobPage.js';

const Starter  = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/job" element={<JobPage />} />
                </Routes>
            </Router>
        </div>
    )
}
export default Starter;
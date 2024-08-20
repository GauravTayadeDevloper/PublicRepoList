import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './Components/App.css';
import './Components/Header.css';
import Header from './Components/Header';
import Repository from './Components/Repository';
import OwnerRepos from './Components/OwnerRepos';
import Footer from './Components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Repository />} />
          <Route path="/owner/:owner" element={<OwnerRepos />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

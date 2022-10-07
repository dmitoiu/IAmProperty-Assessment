import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Helmet from "react-helmet";
import {Navigate} from "react-router";
import {Provider} from "react-redux";
import "./styles/globals.css";
import NotFound from "./pages/404";
import Layout from "./components/layout";
import "./styles/globals.css";

function App() {
  return (
      <>
          <Router>
              <Helmet>
                  <title>Darie-Dragoș Mitoiu</title>
              </Helmet>
              <Layout>
                  <main className={"h-[75vh]"}>
                      <Routes>
                          <Route path="/" element={<Home/>}/>
                          <Route path="*" element={<NotFound/>}/>
                      </Routes>
                  </main>
              </Layout>
          </Router>
      </>
  );
}

export default App;

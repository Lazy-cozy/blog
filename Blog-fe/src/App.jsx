import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Loader from "./components/common/Loader";

// Pages
import NotFound from "./pages/NotFound";
import ArticlesList from "./pages/ArticlesList";

// Lazy-loaded pages
const About = lazy(() => import("./pages/About"));
const Article = lazy(() => import("./pages/Article"));

// Routes Configuration
const routes = [
  { path: "/", element: <ArticlesList /> },
  { path: "/about", element: <About /> },
  { path: "/article/:name", element: <Article /> },
  { path: "*", element: <NotFound /> },
];

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

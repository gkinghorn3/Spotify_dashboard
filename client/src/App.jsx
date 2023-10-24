import { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { GlobalStyle } from "./styles";
import { accesstoken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";

import { Login, Profile } from "./routes";

//Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accesstoken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <button className='logout-btn' onClick={logout}>Log Out</button>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<h1>Top Artists</h1>} />
                <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
                <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
                <Route path="/playlists" element={<h1>Playlists</h1>} />
                <Route
                  path="/"
                  element={
                    <Profile />
                  }
         
                  
                />
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

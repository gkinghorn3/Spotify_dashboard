import { useState, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import styled from "styled-components";

import { GlobalStyle } from './styles';
import { accesstoken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";



//Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}



const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

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
          <StyledLoginButton href="http://localhost:8888/login">
          Log in to Spotify
        </StyledLoginButton>
        ) : (
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={<h1>Top Artists</h1>} />
              <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
              <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
              <Route path="/playlists" element={<h1>Playlists</h1>} />
              <Route path="/" element={
                <>
                  <button onClick={logout}>Log Out</button>
  
                  {profile && (
                    <div>
                      <h1>{profile.display_name}</h1>
                      <p>{profile.followers.total} Followers</p>
                      {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar"/>
                      )}
                    </div>
                  )}
                </>
              } />
            </Routes>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;



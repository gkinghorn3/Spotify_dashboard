import { useState, useEffect } from "react";
import { catchErrors } from "../../utils";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../../spotify";

import {
  Header,
  SectionWrapper,
  ArtistGrid,
  TrackList,
  PlaylistsGrid, 
  Loader
} from "../../components/";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtist = await getTopArtists();
      setTopArtists(userTopArtist.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && <Header profile={profile} playlists={playlists} />}
      <main>
            {topArtists && topTracks && playlists ? (
              <>
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                  <TrackList tracks={topTracks.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Public Playlists" seeAllLink="/playlists">
                  <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                </SectionWrapper>
              </>
            ) : (
              <Loader />
            )}
          </main>
        
      
    </>
  );
};

export default Profile;

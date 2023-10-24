import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile, getCurrentUserPlaylists, getTopArtists } from '../../spotify';

import { Header } from '../../components/';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const topArtists = await getTopArtists();
      setTopArtists(topArtists.data);
      
    };

    catchErrors(fetchData());
  }, []);
  console.log(topArtists);
  return (
    <>
      {profile && (
            <Header profile={profile} playlists={playlists} />
      )}
    </>
  )
};

export default Profile;
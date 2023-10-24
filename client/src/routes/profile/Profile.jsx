import { useState, useEffect } from 'react';
import { catchErrors } from '../../utils';
import { getCurrentUserProfile } from '../../spotify';

import { Header } from '../../components/';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      
    };

    catchErrors(fetchData());
  }, []);
  console.log(profile);
  return (
    <>
      {profile && (
            <Header profile={profile} />
      )}
    </>
  )
};

export default Profile;
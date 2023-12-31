import "./header.styles.scss";

const Header = ({ profile, playlists }) => {
  
  return (
    <header className="header-container" type="user">
      <div className="header__inner">
        {profile.images.length && profile.images[1].url && (
          <img
            className="header__img"
            src={profile.images[1].url}
            alt="Avatar"
          />
        )}
        <div>
          <div className="header__overline">Profile</div>
          <h1 className="header__name">{profile.display_name}</h1>
          <p className="header__meta">
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

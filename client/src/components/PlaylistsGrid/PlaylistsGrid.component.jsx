import { Link } from 'react-router-dom';


const PlaylistsGrid = ({ playlists }) => (
  <>
    {playlists && playlists.length ? (
      <div className='grid'>
        {playlists.map((playlist, i) => (
          <li className="grid__item" key={i}>
            <Link className="grid__item__inner" to={`/playlists/${playlist.id}`}>
              {playlist.images.length && playlist.images[0] && (
                <div className="grid__item__img">
                  <img src={playlist.images[0].url} alt={playlist.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">{playlist.name}</h3>
              <p className="grid__item__label">Playlist</p>
            </Link>
          </li>
        ))}
      </div>
    ) : (
      <p className="empty-notice">No playlists available</p>
    )}
  </>
);

export default PlaylistsGrid;
import './login.styles.scss';
const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://spotify-dashboard-v1.onrender.com/login';

const Login = () => (
    <div className='login-container'>
      <a className='login-btn' href={LOGIN_URI}>
        Log in to Spotify
      </a>
    </div>
  );
  
  export default Login;
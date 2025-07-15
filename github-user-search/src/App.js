import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGitHubUser = async () => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) fetchGitHubUser();
  };

  return (
    <div className="app">
      <h2>🔍 GitHub User Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="profile">
          <img src={userData.avatar_url} alt="Avatar" />
          <h3>{userData.name}</h3>
          <p>{userData.bio}</p>
          <p>📦 {userData.public_repos} Repositories</p>
          <p>👥 {userData.followers} Followers</p>
        </div>
      )}
    </div>
  );
}

export default App;

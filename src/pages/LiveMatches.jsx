import React, { useEffect, useState } from 'react';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);

  // Use the environment variable or fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/predictions`)
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data); // Debugging
        setMatches(data.matches || []); // Handle response safely
      })
      .catch((error) => {
        console.error('Error fetching live matches:', error);
      });
  }, [API_BASE_URL]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
      {matches.length === 0 ? (
        <p>No live matches to display.</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match, index) => (
            <li key={index} className="bg-white p-4 shadow rounded">
              <strong>{match.homeTeam}</strong> vs <strong>{match.awayTeam}</strong> - {match.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveMatches;

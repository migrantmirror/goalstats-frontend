import React, { useEffect, useState } from 'react';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Replace the URL with your actual Flask endpoint
    fetch('http://localhost:10000/api/live-matches')
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data); // Debug log
        setMatches(data.matches || []); // Assumes response structure like { matches: [...] }
      })
      .catch((error) => {
        console.error('Error fetching live matches:', error);
      });
  }, []);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Live Matches</h2>
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

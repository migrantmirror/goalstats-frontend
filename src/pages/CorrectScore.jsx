import React, { useEffect, useState } from 'react';

const CorrectScore = () => {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/correct_score?home_avg=1.6&away_avg=1.2`)
      .then((res) => res.json())
      .then((data) => {
        if (data.probabilities) {
          setScores(data.probabilities);
        } else {
          setError('No probabilities found.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Failed to fetch correct score predictions.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Correct Score Predictions</h2>

      {loading && <p>Loading predictions...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2">
          {Object.entries(scores).map(([score, prob]) => (
            <li key={score} className="bg-white p-4 shadow rounded">
              <strong>{score}</strong>: {(prob * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CorrectScore;

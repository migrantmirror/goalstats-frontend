import React, { useEffect, useState } from 'react';

const CorrectScore = () => {
  const [scoreProbs, setScoreProbs] = useState({});
  const [btts, setBtts] = useState(null);
  const [over25, setOver25] = useState(null);
  const [winDrawLose, setWinDrawLose] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

  useEffect(() => {
    const home_avg = 1.6;
    const away_avg = 1.2;

    const fetchCorrectScore = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/correct_score?home_avg=${home_avg}&away_avg=${away_avg}`);
        const data = await res.json();
        if (data.probabilities) setScoreProbs(data.probabilities);
        else setError('No score probabilities found.');
      } catch (err) {
        setError('Failed to fetch correct score.');
      }
    };

    const fetchBTTS = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/predict_market?market=btts&home_avg=${home_avg}&away_avg=${away_avg}`);
        const data = await res.json();
        setBtts(data?.proba?.[1]?.toFixed(2));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchOver25 = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/predict_market?market=over25&home_avg=${home_avg}&away_avg=${away_avg}`);
        const data = await res.json();
        setOver25(data?.proba?.[1]?.toFixed(2));
      } catch (err) {
        console.error(err);
      }
    };

    const computeWinDrawLose = () => {
      let win = 0, draw = 0, lose = 0;
      Object.entries(scoreProbs).forEach(([score, prob]) => {
        const [h, a] = score.split('-').map(Number);
        if (h > a) win += prob;
        else if (h === a) draw += prob;
        else lose += prob;
      });
      setWinDrawLose({
        win: (win * 100).toFixed(2),
        draw: (draw * 100).toFixed(2),
        lose: (lose * 100).toFixed(2)
      });
    };

    const runAll = async () => {
      setLoading(true);
      await Promise.all([fetchCorrectScore(), fetchBTTS(), fetchOver25()]);
      setLoading(false);
    };

    runAll();
  }, []);

  useEffect(() => {
    if (Object.keys(scoreProbs).length > 0) computeWinDrawLose();
  }, [scoreProbs]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Predictions</h2>

      {loading && <p>Loading predictions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Correct Score (Top 5)</h3>
            <ul className="space-y-2">
              {Object.entries(scoreProbs).map(([score, prob]) => (
                <li key={score} className="bg-white p-3 rounded shadow">
                  <strong>{score}</strong>: {(prob * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">BTTS</h3>
            <p>{btts ? `Probability: ${btts * 100}%` : 'N/A'}</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Over 2.5 Goals</h3>
            <p>{over25 ? `Probability: ${over25 * 100}%` : 'N/A'}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Win/Draw/Lose</h3>
            <p>Home Win: {winDrawLose.win}%</p>
            <p>Draw: {winDrawLose.draw}%</p>
            <p>Away Win: {winDrawLose.lose}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorrectScore;

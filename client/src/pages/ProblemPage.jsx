import React, { useState, useEffect } from 'react';
import '../styles/ProblemPage.css';

const ProblemPage = () => {
  const [code, setCode] = useState('def bubble_sort(arr):\n');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSubmit = () => {
    const trimmedCode = code.replace(/\s/g, '');
    const isCorrect =
      trimmedCode.includes('foriinrange') &&
      trimmedCode.includes('arr[j]>arr[j+1]');

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: '✅ Well done! Your code looks correct.',
      });
    } else {
      setFeedback({
        type: 'error',
        message: '⚠️ Almost there! Try again or use the hint.',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/'; // Adjust this route if you have a login route
  };

  return (
    <div className="problem-page-wrapper">
      <div className="top-bar">
        <div className="top-bar-right">
          <span className="welcome-text">Welcome, {username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="problem-page">
        <div className="problem-left">
          <h2>Bubble Sort</h2>
          <p>Write a Python function to perform bubble sort on a given list.</p>
          <p>
            <strong>Function Signature:</strong>{' '}
            <code>def bubble_sort(arr):</code>
          </p>
          <p>
            <strong>Example Input:</strong> [5, 1, 4, 2, 8]
          </p>
          <p>
            <strong>Expected Output:</strong> [1, 2, 4, 5, 8]
          </p>

          <div className="problem-buttons">
            <button onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {showHint && (
            <div className="solution-box">
              Try using two nested loops to compare and swap adjacent elements.
            </div>
          )}

          {showSolution && (
            <div className="solution-box">
              Solution:
              <pre>
                {`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`}
              </pre>
            </div>
          )}
        </div>

        <div className="problem-right">
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit Code
          </button>
          {feedback && (
            <div className={`feedback ${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
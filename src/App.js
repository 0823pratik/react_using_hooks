import React, { useState, useEffect, useReducer, useRef, useCallback, useMemo } from 'react';
import './App.css';
import { FaGithub } from 'react-icons/fa';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

// Custom Hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const App = () => {
  // useState
  const [count, setCount] = useState(0);

  // useEffect 
  const colors = ['#ffebcd', '#add8e6', '#f5deb3', '#d8bfd8', '#fafad2', '#e0ffff'];
  useEffect(() => {
    const colorIndex = count % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
  }, [count]);

  // useReducer
  const [state, dispatch] = useReducer(reducer, 0);

  // useRef
  const inputRef = useRef(null);

  // useCallback
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // useMemo
  const storedValue = useMemo(() => count * 2, [count]);

  
  const windowSize = useWindowSize();

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  return (
    <div className="app">
      <h1>React using Hooks</h1>
      
      {/* useState */}
      <div className="section">
        <p>Count (useState): {count}</p>
        <button onClick={handleIncrement} className="btn">Add</button>
      </div>
      
      {/* useEffect */}
      <p className="note">The background color changes based on the count!</p>

      {/* useReducer */}
      <div className="section">
        <p>Reducer Count (useReducer): {state}</p>
        <button onClick={() => dispatch({ type: 'increment' })} className="btn">Increment Reducer</button>
        <button onClick={() => dispatch({ type: 'decrement' })} className="btn">Decrement Reducer</button>
      </div>

      {/* useRef */}
      <div className="section">
        <input ref={inputRef} placeholder="Type something here..." className="input" />
        <button onClick={handleFocus} className="btn">Focus Input</button>
      </div>

      {/* useMemo */}
      <div className="section">
        <p>Stored Value (count * 2): {storedValue}</p>
      </div>

      {/* Custom Hook */}
      <div className="section">
        <p>Window Size (useWindowSize): {windowSize.width} x {windowSize.height}</p>
      </div>
      
      <a href="https://github.com/0823pratik"   target="_blank" rel="noopener noreferrer" className="github-link">
        <FaGithub className="github-icon" />
      </a>
    </div>
  );
};

export default App;

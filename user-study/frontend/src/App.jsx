import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import IntroPage from './IntroPage';
import CalibrationPage from './CalibrationPage';
import QuestionsPage from './QuestionsPage';
import FeedbackPage from './FeedbackPage';
import DonePage from './DonePage';
import './App.css';

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function App() {
  // Get survey codes
  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  const [inputMethod, setInputMethod, removeInputMethod] = useLocalStorage(
    'inputMethod',
    choose(['mouse', 'webcam'])
  );
  const [measurements, setMeasurements] = useState({
    inputMethod,
    userAgent: window.navigator.userAgent,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    // NICE: Webcam dimensions/quality
    startTime: Date.now(),
    endTime: null,
    answers: [],
    queryParams,
  });
  const initialPage = window.location.hash ? window.location.hash.substring(1) : 'intro';
  const [page, setPage] = useState(initialPage);

  console.log(measurements);

  if (page === 'intro') {
    return (
      <IntroPage
        inputMethod={inputMethod}
        setMeasurements={setMeasurements}
        setPage={setPage}
      />
    );
  } else if (page === 'calibration') {
    return (
      <CalibrationPage
        inputMethod={inputMethod}
        setMeasurements={setMeasurements}
        setPage={setPage}
      />
    );
  } else if (page === 'questions') {
    return (
      <QuestionsPage
        inputMethod={inputMethod}
        setMeasurements={setMeasurements}
        setPage={setPage}
      />
    );
  } else if (page === 'feedback') {
    return (
      <FeedbackPage
        inputMethod={inputMethod}
        measurements={measurements}
        setMeasurements={setMeasurements}
        setPage={setPage}
      />
    );
  } else if (page === 'done') {
    return (
      <DonePage
        inputMethod={inputMethod}
        measurements={measurements}
        setMeasurements={setMeasurements}
        setPage={setPage}
      />
    );
  }
}

export default App;

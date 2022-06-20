import { useState, useEffect } from 'react';
import webgazer from 'webgazer';

function CalibrationPage({ setMeasurements, setPage }) {
  const [calibrationClicks, setCalibrationClicks] = useState([]);

  useEffect(() => {
    webgazer.begin();
    window.webgazer = webgazer; // For easy debugging

    const clickListener = (e) => {
      setCalibrationClicks((c) => [...c, { x: e.x, y: e.y }]);
    };
    document.addEventListener('click', clickListener);
    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <div className="text">
      <h1>Calibration</h1>
      <p>
        Please click around on different parts of the page{' '}
        <b>while looking directly at your cursor</b>. When the red dot seems to
        properly follow your eyes, press the button to start with the set of
        micro-tasks.
      </p>
      <p>For good calibration results, we advise the following:</p>
      <ul>
        <li>Sit centrally to have full visibility of your face</li>
        <li>The image should not be too bright / too dark</li>
        <li>Use your eyes to look, do not move your head</li>
        <li>Try clicking on various parts of the page, especially corners</li>
      </ul>
      <button
        disabled={calibrationClicks.length < 10}
        onClick={() => {
          setMeasurements((m) => ({ ...m, calibrationClicks }));
          setPage('questions');
        }}
      >
        I'm done calibrating{' '}
        {calibrationClicks.length < 10
          ? `(${calibrationClicks.length}/10)`
          : ''}
      </button>
    </div>
  );
}

export default CalibrationPage;

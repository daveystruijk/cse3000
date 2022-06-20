import { useState, useEffect } from 'react';
import { sample, without } from 'lodash';
import webgazer from 'webgazer';
import questions from './questions';

function QuestionsPage({ inputMethod, setMeasurements, setPage }) {
  // Question state
  const [unansweredIds, setUnansweredIds] = useState(
    questions.map((_, id) => id)
  );
  const [question, setQuestion] = useState(null);
  const [timeOnLeft, setTimeOnLeft] = useState(0);
  const [timeOnRight, setTimeOnRight] = useState(0);

  const pickNewQuestion = () => {
    if (unansweredIds.length === 0) {
      if (inputMethod === 'webcam') {
        webgazer.end();
        webgazer.stopVideo();
      }
      setPage('feedback');
    }
    const nextId = sample(unansweredIds);
    setUnansweredIds(without(unansweredIds, nextId));
    setQuestion({ ...questions[nextId], startTime: Date.now() });
  };

  const answerQuestion = (question, choice) => {
    const answer = { ...question, endTime: Date.now(), choice };
    setMeasurements((m) => ({ ...m, answers: [...m.answers, answer] }));
  };

  // Setup WebGazer.js
  useEffect(() => {
    pickNewQuestion();
    if (inputMethod !== 'webcam') {
      return;
    }
    window.lastElapsedTime = 0;
    webgazer.saveDataAcrossSessions(false);
    webgazer.setGazeListener((data, elapsedTime) => {
      if (!data) {
        return;
      }
      const threshold = window.innerWidth * 0.25;
      const delta = elapsedTime - window.lastElapsedTime;
      if (data.x < threshold) {
        setTimeOnLeft((t) => t + delta);
      } else {
        setTimeOnLeft(0);
      }
      if (data.x > window.innerWidth - threshold) {
        setTimeOnRight((t) => t + delta);
      } else {
        setTimeOnRight(0);
      }
      window.lastElapsedTime = elapsedTime;
    });
  }, []);

  if (question === null) {
    return null;
  }

  const leftWidth = Math.min(timeOnLeft / 10, 100);
  const rightWidth = Math.min(timeOnRight / 10, 100);

  if (leftWidth >= 100) {
    answerQuestion(question, 'left');
    pickNewQuestion();
    setTimeOnLeft(0);
  } else if (rightWidth >= 100) {
    answerQuestion(question, 'right');
    pickNewQuestion();
    setTimeOnRight(0);
  }

  return (
    <div className={`app ${inputMethod}`}>
      <div
        className="left"
        onClick={() => {
          if (inputMethod !== 'mouse') {
            return;
          }
          answerQuestion(question, 'left');
          pickNewQuestion();
        }}
      >
        <div className="left-progress" style={{ width: `${leftWidth}%` }}></div>
        <p>{question.left}</p>
      </div>
      <div className="middle">
        <div className="title">
          <p>{question.title}</p>
        </div>
        <div className="image">
          <img src={question.image} />
        </div>
      </div>
      <div
        className="right"
        onClick={() => {
          if (inputMethod !== 'mouse') {
            return;
          }
          answerQuestion(question, 'right');
          pickNewQuestion();
        }}
      >
        <div
          className="right-progress"
          style={{ width: `${rightWidth}%` }}
        ></div>
        <p>{question.right}</p>
      </div>
    </div>
  );
}

export default QuestionsPage;

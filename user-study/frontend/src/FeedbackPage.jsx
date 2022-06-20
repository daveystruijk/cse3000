import { useState } from 'react';
import { every } from 'lodash';

function MultiRadio({ id, text, subtext, options, setFeedback }) {
  const onChange = (e) => {
    setFeedback((f) => ({ ...f, [id]: e.target.value }));
  };

  return (
    <fieldset id={id}>
      <p>{text}</p>
      {subtext && <p className="feedback-subtext">{subtext}</p>}
      {options.map((option) => (
        <label>
          <input type="radio" value={option} name={id} onChange={onChange} />
          <i>{option}</i>
        </label>
      ))}
    </fieldset>
  );
}

function FeedbackPage({ inputMethod, measurements, setMeasurements, setPage }) {
  const [feedback, setFeedback] = useState({
    'age': null,
    'gender': null,
    'experience': null,
    'PU-S1': null,
    'PU-S2': null,
    'PU-S3': null,
    'RW-S1': null,
    'RW-S2': null,
    'RW-S3': null,
    'TLX-1': null,
    'TLX-2': null,
    'TLX-3': null,
    'TLX-4': null,
    'TLX-5': null,
    'TLX-6': null,
  });

  const isComplete = every(feedback, (val) => val !== null);

  return (
    <div className="text">
      <h1>Feedback</h1>
      <p>
        You've completed 10 image classification tasks using your {inputMethod}.
        Please tell us about your experience!
      </p>
      <h3>General:</h3>
      <MultiRadio
        id="gender"
        text="Gender"
        setFeedback={setFeedback}
        options={[
          'Male',
          'Female',
          'Other',
        ]}
      />
      <MultiRadio
        id="age"
        text="Age"
        setFeedback={setFeedback}
        options={[
          'Under 18',
          '18-24',
          '25-34',
          '35-44',
          '45-54',
          '55-64',
          'Above 64',
        ]}
      />
      <MultiRadio
        id="experience"
        text="What is your experience level on micro-task crowdsourcing platforms? (such as Prolific)"
        setFeedback={setFeedback}
        options={[
          'Novice',
          'Beginner',
          'Mid-Level',
          'Advanced',
          'Expert',
        ]}
      />
      <h3>Agree/Disagree with these statements:</h3>
      <p></p>
      <MultiRadio
        id="PU-S1"
        text='"I felt frustrated while using this application."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <MultiRadio
        id="PU-S2"
        text='"I found this application confusing to use."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <MultiRadio
        id="PU-S3"
        text='"Using this application was taxing."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <MultiRadio
        id="RW-S1"
        text='"Using this application was worthwhile."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <MultiRadio
        id="RW-S2"
        text='"My experience was rewarding."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <MultiRadio
        id="RW-S3"
        text='"I felt interested in this experience."'
        setFeedback={setFeedback}
        options={[
          'Strongly Disagree',
          'Disagree',
          'Neutral',
          'Agree',
          'Strongly Agree',
        ]}
      />
      <h3>Describe your experience of workload:</h3>
      <p></p>
      <MultiRadio
        id="TLX-1"
        text="Mental Demand"
        subtext="How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc.)? Was the task easy or demanding, simple or complex, exacting or forgiving?"
        setFeedback={setFeedback}
        options={[
          'Low',
          'Somewhat Low',
          'Neutral',
          'Somewhat High',
          'High',
        ]}
      />
      <MultiRadio
        id="TLX-2"
        text="Physical Demand"
        subtext="How much physical activity was required (e.g. pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or brisk, slack or strenous, restful or laborious?"
        setFeedback={setFeedback}
        options={[
          'Low',
          'Somewhat Low',
          'Neutral',
          'Somewhat High',
          'High',
        ]}
      />
      <MultiRadio
        id="TLX-3"
        text="Temporal Demand"
        subtext="How much time pressure did you feel due to the rate at which the tasks occured? Was the pace slow and leisurly or rapid and frantic?"
        setFeedback={setFeedback}
        options={[
          'Low',
          'Somewhat Low',
          'Neutral',
          'Somewhat High',
          'High',
        ]}
      />
      <MultiRadio
        id="TLX-4"
        text="Performance"
        subtext="How successful do you think you were in accomplishing the goals of this task? How satisfied were you with your performance in accomplishing these goals?"
        setFeedback={setFeedback}
        options={[
          'Poor',
          'Somewhat Poor',
          'Neutral',
          'Somewhat Good',
          'Good',
        ]}
      />
      <MultiRadio
        id="TLX-5"
        text="Effort"
        subtext="How hard did you have to work (mentally and physically) to accomplish your level of performance?"
        setFeedback={setFeedback}
        options={[
          'Low',
          'Somewhat Low',
          'Neutral',
          'Somewhat High',
          'High',
        ]}
      />
      <MultiRadio
        id="TLX-6"
        text="Frustration Level"
        subtext="How insecure, discouraged, irritated, stressed and annoyed vs. secure, gratified, content, relaxed, and complacent did you feel during the task?"
        setFeedback={setFeedback}
        options={[
          'Low',
          'Somewhat Low',
          'Neutral',
          'Somewhat High',
          'High',
        ]}
      />
      <button
        disabled={!isComplete}
        onClick={() => {
          setMeasurements((m) => ({ ...m, feedback }));
          setPage('done');
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default FeedbackPage;

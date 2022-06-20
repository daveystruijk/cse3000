import { useState, useEffect } from 'react';

function IntroPage({ inputMethod, setMeasurements, setPage }) {
  return (
    <div className="text">
      <h1>Webcam-Based Eye-Tracking Study</h1>
      <p>
        We are a group of researchers at the Technical University of Delft in The Netherlands.
        In this study, we aim to investigate the usefulness of webcam-based eye-tracking input for crowd-sourced micro-tasks.
        By participating in this task, you will complete a set of image classification tasks using either your mouse or your eyes (with a webcam), and finally answer some questions about the process.
      </p>
      <p>
        Your participation in this task is entirely voluntary and you can withdraw at any time. We do not collect any data aside from the information described above and your Prolific user profile data that is automatically transmitted to us when you submit your answers.
      </p>
      <p>
        We will keep your information confidential. All data is stored in a password protected electronic format. Be aware that the data we gather with this task might be published in an anonymized form later. Such an anonymized data set would include the answers you provide in this task, but no personal information (e.g., your worker ID) so that the answers will not be traceable back to you.
      </p>
      <p>
        By completing the task and clicking 'submit' at the end of this survey, you confirm that you have read, understood, and consent to the above information.
      </p>
      <p>
        You have been randomly assigned to the following group:{' '}
        <b>{inputMethod}</b> users.
      </p>
      {inputMethod === 'webcam' && (
        <p>Completion of these tasks requires a working webcam. We only collect information about timing and accuracy, and webcam data will NOT be sent over the internet. After clicking 'start', the application will ask for webcam access and the calibration process will begin.</p>
      )}
      <button
        onClick={() => {
          if (inputMethod === 'webcam') {
            setPage('calibration');
          } else {
            setPage('questions');
          }
        }}
      >
        Start
      </button>
    </div>
  );
}

export default IntroPage;

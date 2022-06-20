import { useState, useEffect } from 'react';

const submit = async (measurements) => {
  const res = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(measurements),
  });
  return res.json();
};

function DonePage({ measurements, setMeasurements, setPage }) {

  const [submitCode, setSubmitCode] = useState(null);

  useEffect(async () => {
    const res = await submit({ ...measurements, endTime: Date.now()});
    setSubmitCode(res.submitCode);
  }, []);

  if (submitCode === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Thanks!</h1>
      <p>You have completed the survey. Your code: <b>{submitCode}</b></p>
    </div>
  );
}

export default DonePage;


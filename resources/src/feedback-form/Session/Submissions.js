import React, {useEffect, useState} from 'react';

import {useSession, COOP_VALUES} from './SessionProvider';

const formatter = new Intl.DateTimeFormat('en-UK');

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

  // Calculate the preceeding Monday:
  let weekStart = new Date(d);
  weekStart.setDate(weekStart.getDate() - 3);

  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo, weekStart];
}

// const Submission = ({submission}) => {
//   let {
//     created_at,
//     enjoyment_rating,
//     enjoyed_most,
//     changes,
//     other_topics,
//     democracy,
//     self_help,
//     self_responsibility,
//     equality,
//     equity,
//     solidarity,
//     openness,
//     honesty,
//     social_responsibility,
//   } = submission;
//   return (
//     <div style={{marginBottom: 20}}>
//       {/* <div>Created at: {created_at}</div>
//       <div>Enjoyment Rating: {enjoyment_rating}</div>
//       <div>Enjoyed Most: {enjoyed_most}</div>
//       <div>Changes: {changes}</div>
//       <div>Other Topics: {other_topics}</div> */}
//       <div>
//         {/* Values: */}
//         <div>democracy: {democracy}</div>
//         <div>self_help: {self_help}</div>
//         <div>self_responsibility: {self_responsibility}</div>
//         <div>equality: {equality}</div>
//         <div>equity: {equity}</div>
//         <div>solidarity: {solidarity}</div>
//         <div>openness: {openness}</div>
//         <div>honesty: {honesty}</div>
//         <div>social_responsibility: {social_responsibility}</div>
//       </div>
//     </div>
//   );
// };

const SessionHeader = ({session}) => {
  const {monday, submissions} = session;
  return (
    <div className='submission-session-header'>
      <h4>
        Week {formatter.format(monday)} ({submissions.length} submissions)
      </h4>
    </div>
  );
};

const SessionDetails = ({session}) => {
  const {submissions} = session;
  let ratingCounts = [0, 0, 0, 0, 0];
  const valuesCounts = {
    democracy: 0,
    self_help: 0,
    self_responsibility: 0,
    equality: 0,
    equity: 0,
    solidarity: 0,
    openness: 0,
    honesty: 0,
    social_responsibility: 0,
  };
  submissions.forEach((submission) => {
    ratingCounts[submission.enjoyment_rating - 1] += 1;
    Object.keys(valuesCounts).forEach((key) => {
      valuesCounts[key] += submission[key];
    });
  });
  return (
    <>
      <SessionHeader session={session} />
      <div className='submission-session'>
        <p>How much did you enjoy today’s session?</p>
        {ratingCounts.map((count, index) => (
          <div key={index}>
            {index} - {count}
          </div>
        ))}
        <div className='divider' />
        <p>What did you enjoy most about today's session?</p>
        {submissions.map(({enjoyed_most}, index) => (
          <p key={index}>{enjoyed_most}</p>
        ))}
      </div>
      <div className='submission-session'>
        <p>What co-operative values did you learn from todays session?</p>
        {Object.entries(valuesCounts).map(([valueName, valueCount], valueIndex) => (
          <div key={`value-${valueIndex}`}>
            {COOP_VALUES[valueName]} - {valueCount}
          </div>
        ))}
      </div>
    </>
  );
};

const Session = ({session, setSelectedSession}) => {
  const {submissions} = session;
  // Count the ratings, find the most popular one
  let ratingCounts = [0, 0, 0, 0, 0];
  const valuesCounts = {
    democracy: 0,
    self_help: 0,
    self_responsibility: 0,
    equality: 0,
    equity: 0,
    solidarity: 0,
    openness: 0,
    honesty: 0,
    social_responsibility: 0,
  };
  submissions.forEach((submission) => {
    ratingCounts[submission.enjoyment_rating - 1] += 1;
    Object.keys(valuesCounts).forEach((key) => {
      valuesCounts[key] += submission[key];
    });
  });

  const maxRatingCount = Math.max(...ratingCounts);
  // Reverse ratingCounts so we get the highest rating
  const maxRating = ratingCounts.reverse().indexOf(maxRatingCount) + 1;

  // Sort the valuesCounts by count, decreasing
  const valuesCountsSorted = Object.entries(valuesCounts).sort(
    ([_, valueOneValue], [__, valueTwoValue]) => valueTwoValue - valueOneValue
  );

  return (
    <>
      <SessionHeader session={session} />
      <div className='submission-session'>
        <p>How much did you enjoy today’s session?</p>
        <p>Top rated result:</p>
        <p>
          {maxRating} ({maxRatingCount})
        </p>
        {/* Graph showing number of responses */}
        <div className='divider' />
        <div>
          <p>What co-operative values did you learn from todays session?</p>
          <p>Top 3 selected values</p>
          {valuesCountsSorted.slice(0, 3).map(([valueName, valueCount], valueIndex) => (
            <div key={`value-${valueIndex}`}>
              {COOP_VALUES[valueName]} - {valueCount}
            </div>
          ))}
        </div>
        <button
          className='secondary'
          onClick={() => {
            setSelectedSession(session);
          }}>
          See full results
        </button>
      </div>
    </>
  );
};

const Submissions = () => {
  const {fetchSubmissions, submissions} = useSession();
  const [selectedSession, setSelectedSession] = useState();

  useEffect(() => {
    const init = async () => {
      await fetchSubmissions();
    };
    init();
  }, []);

  const yearWeekSubmissions = {};
  // Now iterate through submissions to find date range
  submissions.forEach((submission) => {
    const createdAt = new Date(submission.created_at);
    const [year, week, monday] = getWeekNumber(createdAt);
    if (!yearWeekSubmissions[year]) {
      yearWeekSubmissions[year] = {};
    }
    if (!yearWeekSubmissions[year][week]) {
      yearWeekSubmissions[year][week] = {
        monday,
        submissions: [],
      };
    }
    yearWeekSubmissions[year][week].submissions.push(submission);
  });

  const sessions = Object.entries(yearWeekSubmissions)
    .map(([year, weeks], yearIndex) =>
      Object.entries(weeks).map(([week, {submissions, monday}], weekIndex) => ({
        submissions,
        monday,
      }))
    )
    .flat();

  return (
    <>
      <h1>Submissions</h1>
      {submissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        <>
          {selectedSession ? (
            <>
              <button onClick={() => setSelectedSession(undefined)}>Back</button>
              <SessionDetails session={selectedSession} />
            </>
          ) : (
            sessions.map((session, sessionIndex) => (
              <Session
                session={session}
                key={`session-${sessionIndex}`}
                setSelectedSession={setSelectedSession}
              />
            ))
          )}
        </>
      )}
    </>
  );
};

export default Submissions;

import React, {useEffect, useState} from 'react';

import {useSession, COOP_VALUES} from './SessionProvider';

import rating1 from '../../img/rating-1.svg';
import rating2 from '../../img/rating-2.svg';
import rating3 from '../../img/rating-3.svg';
import rating4 from '../../img/rating-4.svg';
import rating5 from '../../img/rating-5.svg';

const RATING_LABELS = ['Very unhappy', 'Unhappy', 'Okay', 'Happy', 'Very Happy'];
const RATING_ICONS = [rating1, rating2, rating3, rating4, rating5];

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

const SessionHeader = ({session}) => {
  const {monday, submissions} = session;
  return (
    <div className='submission-session-header'>
      Week {formatter.format(monday)} ({submissions.length} submissions)
    </div>
  );
};

const RatingRow = ({index, count, maxCount}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
      <div style={{textAlign: 'center', width: 105}}>
        <img src={RATING_ICONS[index]} alt='' style={{width: 40, height: 40}} />
        <div style={{fontSize: '10pt'}}>{RATING_LABELS[index]}</div>
      </div>
      <div className='graph-row'>
        {maxCount && (
          <div className='graph'>
            <div className='graph-bar' style={{width: `${(count / maxCount) * 100}%`}} />
          </div>
        )}
        <div>({count})</div>
      </div>
    </div>
  );
};

const ValueRow = ({name, count}) => {
  return (
    <div className='value-count-row'>
      <div>{name}</div>
      <div className='count-circle'>{count}</div>
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
  const maxRatingValue = Math.max(...ratingCounts);
  return (
    <>
      <SessionHeader session={session} />
      <div className='submission-session'>
        <p>How much did you enjoy today’s session?</p>
        {ratingCounts.map((count, index) => (
          <RatingRow key={index} index={index} count={count} maxCount={maxRatingValue} />
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
          <ValueRow key={`value-${valueIndex}`} name={COOP_VALUES[valueName]} count={valueCount} />
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
  const maxRatingIndex = ratingCounts.reverse().indexOf(maxRatingCount);

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
        <RatingRow index={maxRatingIndex} count={maxRatingCount} />
        <div className='divider' />
        <div>
          <p>What co-operative values did you learn from todays session?</p>
          <p>Top 3 selected values</p>
          {valuesCountsSorted.slice(0, 3).map(([valueName, valueCount], valueIndex) => (
            <ValueRow
              key={`value-${valueIndex}`}
              name={COOP_VALUES[valueName]}
              count={valueCount}
            />
          ))}
        </div>
        <div class='buttons-row'>
          <button
            className='secondary'
            onClick={() => {
              setSelectedSession(session);
            }}>
            See full results
          </button>
        </div>
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
      {selectedSession && <button onClick={() => setSelectedSession(undefined)}>Back</button>}
      <h1>Submissions</h1>
      {submissions.length === 0 ? (
        <h2>No Submissions</h2>
      ) : (
        <>
          {selectedSession ? (
            <SessionDetails session={selectedSession} />
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

import React, {useState} from 'react';

const ParticipantFilter = ({submissions, filterNames, onChangeParticipantFilter}) => {
  const [startFilterName, setStartFilterName] = useState();

  const startNames = [];
  const endNames = [];
  submissions.forEach((submission) => {
    if (submission.submission_type === `App\\Models\\BeginningFeedbackSubmission`) {
      startNames.push(submission.name);
    } else {
      endNames.push(submission.name);
    }
  });

  const showEndName = startFilterName && !endNames.includes(startFilterName);

  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <div>
        <div>Filter by student:</div>
        <select
          onChange={(event) => {
            const startName = event.target.value;
            if (startName === '') {
              setStartFilterName(undefined);
              onChangeParticipantFilter([]);
            } else {
              setStartFilterName(startName);
              if (endNames.includes(startName)) {
                onChangeParticipantFilter([startName]);
              } else {
                onChangeParticipantFilter([]);
              }
            }
          }}
          value={startFilterName ?? ''}>
          <option value=''>All Students</option>
          {startNames.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
        {showEndName && (
          <>
            <div>No matching end-of-project feedback was found, please select a name</div>
            <select
              onChange={(event) => {
                const endName = event.target.value;
                if (endName !== '') {
                  onChangeParticipantFilter([startFilterName, endName]);
                } else {
                  if (endNames.includes(startFilterName)) {
                    onChangeParticipantFilter([startFilterName]);
                  } else {
                    onChangeParticipantFilter([]);
                  }
                }
              }}>
              <option value=''>Select</option>
              {endNames.map((name) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </select>
          </>
        )}
        {filterNames.length > 0 && (
          <>
            <p>
              Showing results for {filterNames.join(', ')}
              <button
                onClick={() => {
                  onChangeParticipantFilter([]);
                  setStartFilterName();
                }}>
                Clear
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ParticipantFilter;

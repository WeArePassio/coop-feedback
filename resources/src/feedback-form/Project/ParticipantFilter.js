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
  console.log('submissions', submissions.length);
  console.log('endNames', endNames);

  const hasMatchingEndName = (startName) =>
    endNames.map((name) => name.toLowerCase()).includes(startName.toLowerCase());

  const showEndName = startFilterName && !hasMatchingEndName(startFilterName);

  return (
    <div className='filters'>
      <label>
        Filter by student:
        <select
          onChange={(event) => {
            const startName = event.target.value;
            if (startName === '') {
              setStartFilterName(undefined);
              onChangeParticipantFilter([]);
            } else {
              setStartFilterName(startName);
              if (hasMatchingEndName(startName)) {
                onChangeParticipantFilter([startName]);
              } else {
                onChangeParticipantFilter([]);
              }
            }
          }}
          value={startFilterName ?? ''}>
          <option value=''>All Students</option>
          {startNames.map((name, index) => (
            <option value={name} key={`${name}-${index}`}>
              {name}
            </option>
          ))}
        </select>
      </label>
      {showEndName && (
        <>
          {filterNames.length !== 2 && (
            <div className='no-match'>
              No match for this name was found, please select one below:
            </div>
          )}
          <label>
            Select match:
            <select
              onChange={(event) => {
                const endName = event.target.value;
                if (endName !== '') {
                  onChangeParticipantFilter([startFilterName, endName]);
                } else {
                  if (hasMatchingEndName(startFilterName)) {
                    onChangeParticipantFilter([startFilterName]);
                  } else {
                    onChangeParticipantFilter([]);
                  }
                }
              }}>
              <option value=''>Select</option>
              {endNames.map((name, index) => (
                <option value={name} key={`${name}-${index}`}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {filterNames.length > 0 && (
        <>
          <p>Showing results for {filterNames[0]}</p>
          <button
            className='button'
            onClick={() => {
              onChangeParticipantFilter([]);
              setStartFilterName();
            }}>
            Clear filter
          </button>
        </>
      )}
    </div>
  );
};

export default ParticipantFilter;

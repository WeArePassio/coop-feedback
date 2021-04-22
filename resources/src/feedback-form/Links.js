import React, {useState, useRef} from 'react';

const LinkInput = ({linkValue}) => {
  const input = useRef(null);
  return (
    <input
      type='text'
      value={linkValue}
      ref={input}
      onClick={() => {
        input.current.select();
      }}
    />
  );
};

const Links = () => {
  const [cohortID, setCohortID] = useState();
  const [links, setLinks] = useState();
  const generateLinks = () => {
    setLinks({
      projectBeginningFeedback: 'https://google.com',
      projectEndFeedback: 'https://google.com',
      sessionFeedback: 'https://askjeeves.com',
      projectSubmissions: 'https://passio.co.uk',
      sessionSubmissions: 'https://passio.co.uk/services',
    });
  };
  return (
    <>
      <h1>Generate Cohort Links</h1>
      <p>
        Each cohort gets its own links for students to complete feedback forms, and for coaches to
        review their submissions.
      </p>
      <p>
        Just type in the ID of the project cohort (from Salesforce), and your links will be shown
        below:
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div>
          <label htmlFor='name'>Project Cohort ID *</label>
          <input
            type='text'
            name='cohort-id'
            id='cohort-id'
            value={cohortID ?? ''}
            onChange={(event) => setCohortID(event.target.value)}
          />
        </div>
        <button className='button' onClick={generateLinks}>
          Generate Links!
        </button>
      </div>
      {links ? (
        <div>
          <h2>Links for Students</h2>
          <p>
            Share these links with your students at different points in the project, so they can
            give feedback.
          </p>
          <h3>Project Feedback - Beginning</h3>
          <LinkInput linkValue={links.projectBeginningFeedback} />
          <h3>Project Feedback - End</h3>
          <LinkInput linkValue={links.projectEndFeedback} />
          <h3>Session Feedback</h3>
          <LinkInput linkValue={links.sessionFeedback} />
          <h2>Links for Coaches</h2>
          <p>
            These links let the coach view all the project/session submissions from this cohort.
          </p>
          <h3>Project Submissions</h3>
          <LinkInput linkValue={links.projectSubmissions} />
          <h3>Session Submissions</h3>
          <LinkInput linkValue={links.sessionSubmissions} />
        </div>
      ) : null}
    </>
  );
};

export default Links;

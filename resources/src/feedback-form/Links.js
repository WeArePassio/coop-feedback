import React, {useState, useRef} from 'react';
import axios from 'axios';

const LinkInput = ({linkValue}) => {
  const input = useRef(null);
  return (
    <input
      type='text'
      value={linkValue}
      ref={input}
      readOnly={true}
      style={{width: '100%'}}
      onClick={() => {
        input.current.select();
      }}
    />
  );
};

const Links = () => {
  const [cohortSalesforceID, setCohortSalesforceID] = useState();
  const [links, setLinks] = useState();
  const generateLinks = async () => {
    const response = await axios.post(`/api/cohorts/${cohortSalesforceID}`);
    if (response.status === 200 || response.status === 201) {
      setLinks(response.data.links);
    } else {
      alert('Sorry, this request failed. Please try again later.');
    }
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
          <label htmlFor='name'>Project Cohort Salesforce ID *</label>
          <input
            type='text'
            name='cohort-id'
            id='cohort-id'
            value={cohortSalesforceID ?? ''}
            onChange={(event) => setCohortSalesforceID(event.target.value)}
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

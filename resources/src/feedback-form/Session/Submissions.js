import React, {useEffect} from 'react';

import {useSession} from './SessionProvider';

const Submissions = () => {
  const {fetchSubmissions, submissions} = useSession();

  useEffect(() => {
    const init = async () => {
      await fetchSubmissions();
    };
    init();
  }, []);

  return (
    <>
      <h1>Submissions</h1>
      {submissions.map(
        (
          {
            created_at,
            enjoyment_rating,
            enjoyed_most,
            democracy,
            self_help,
            self_responsibility,
            equality,
            equity,
            solidarity,
            openness,
            honesty,
            social_responsibility,
          },
          index
        ) => (
          <div key={`submission-${index}`} style={{marginBottom: 20}}>
            <div>Created at: {created_at}</div>
            <div>Enjoyment Rating: {enjoyment_rating}</div>
            <div>Enjoyed Most: {enjoyed_most}</div>
            <div>
              Values:
              <div>democracy: {democracy}</div>
              <div>self_help: {self_help}</div>
              <div>self_responsibility: {self_responsibility}</div>
              <div>equality: {equality}</div>
              <div>equity: {equity}</div>
              <div>solidarity: {solidarity}</div>
              <div>openness: {openness}</div>
              <div>honesty: {honesty}</div>
              <div>social_responsibility: {social_responsibility}</div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Submissions;

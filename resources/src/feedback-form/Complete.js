import React from 'react';

const Complete = ({flagImg, text}) => {
  return (
    <>
      {flagImg && <img src={flagImg} className='flag' alt='A flag with the word Start' />}
      <div className='panel'>
        <section>
          <h2>Thank You!</h2>
          <p>{text}</p>
        </section>
      </div>
    </>
  );
};

export default Complete;

import React from 'react';

const Complete = ({flagImg, text}) => {
  return (
    <>
      {flagImg && <img src={flagImg} className='flag' alt='A flag with the word End' />}
      <header>
        <h1>Thank You!</h1>
        <div className='line'></div>
      </header>
      <div className='panel'>
        <section>
          <p>{text}</p>
        </section>
      </div>
    </>
  );
};

export default Complete;

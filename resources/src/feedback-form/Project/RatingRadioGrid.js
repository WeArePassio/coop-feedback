import React from 'react';

const RatingRadioGrid = ({question_id, radioValue, value, setValue, icon, iconChecked}) => {
  return (
    <div className='grid-cell'>
      <label>
        <input
          type='radio'
          name={question_id}
          checked={value === radioValue}
          onChange={() => setValue(radioValue)}
        />
        <img src={value === radioValue ? iconChecked : icon} />
      </label>
    </div>
  );
};

export default RatingRadioGrid;

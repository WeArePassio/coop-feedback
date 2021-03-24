import React from 'react';

const RatingRadio = ({question_id, radioValue, value, setValue, icon, iconChecked}) => {
  return (
    <td className='rating-cell'>
      <label>
        <input
          type='radio'
          name={question_id}
          checked={value === radioValue}
          onChange={() => setValue(radioValue)}
        />
        <img src={value === radioValue ? iconChecked : icon} />
      </label>
    </td>
  );
};

export default RatingRadio;

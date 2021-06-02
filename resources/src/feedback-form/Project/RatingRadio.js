import React from 'react';

const RatingRadio = ({question_id, radioValue, value, setValue, icon, iconChecked}) => (
  <td className='rating-cell'>
    <label style={{marginBottom: 0}}>
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

export default RatingRadio;

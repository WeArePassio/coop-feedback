import React from 'react';

const SessionRatingRadio = ({
  question_id,
  radioValue,
  value,
  setValue,
  icon,
  iconChecked,
  labelText,
}) => (
  <td>
    <div className='rating-cell-with-label'>
      <label style={{marginBottom: 0}}>
        <div>
          <input
            type='radio'
            name={question_id}
            checked={value === radioValue}
            onChange={() => setValue(radioValue)}
          />
          <img src={value === radioValue ? iconChecked : icon} />
        </div>
        <span className='caption'>{labelText}</span>
      </label>
    </div>
  </td>
);

export default SessionRatingRadio;

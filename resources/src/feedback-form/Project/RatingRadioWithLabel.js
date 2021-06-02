import React from 'react';

const RatingRadioWithLabel = ({
  question_id,
  radioValue,
  value,
  setValue,
  icon,
  iconChecked,
  labelText,
}) => (
  <td className='rating-cell-with-label'>
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
      <span htmlFor={`${question_id}-radio-option`} className='caption'>
        {labelText}
      </span>
    </label>
  </td>
);

export default RatingRadioWithLabel;

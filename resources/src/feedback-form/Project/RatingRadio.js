import React from 'react';

const RatingRadio = ({question_id, radioValue, value, setValue, icon, iconChecked, labelText}) => (
  <td>
    <div className={labelText ? 'rating-cell-with-label' : 'rating-cell'}>
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
        {labelText && (
          <span htmlFor={`${question_id}-radio-option`} className='caption'>
            {labelText}
          </span>
        )}
      </label>
    </div>
  </td>
);

export default RatingRadio;

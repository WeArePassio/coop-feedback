import React from 'react';

import rating1 from '../img/rating-1.svg';
import rating2 from '../img/rating-2.svg';
import rating3 from '../img/rating-3.svg';
import rating4 from '../img/rating-4.svg';
import rating5 from '../img/rating-5.svg';

const RatingRadio = ({question_id, icon, value}) => {
  return (
    <td>
      <label>
        <input type='radio' name={question_id} value={value} />
        <img src={icon} />
      </label>
    </td>
  );
};

const RatingRow = ({question, question_id}) => {
  return (
    <tr>
      <td>{question}</td>
      <RatingRadio question_id={question_id} icon={rating1} value={1} />
      <RatingRadio question_id={question_id} icon={rating2} value={2} />
      <RatingRadio question_id={question_id} icon={rating3} value={3} />
      <RatingRadio question_id={question_id} icon={rating4} value={4} />
      <RatingRadio question_id={question_id} icon={rating5} value={5} />
    </tr>
  );
};

export default RatingRow;

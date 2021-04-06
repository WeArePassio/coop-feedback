import React from 'react';

import RatingRadio from './RatingRadio';

import rating1 from '../../img/rating-1.svg';
import rating1Checked from '../../img/rating-1-checked.svg';
import rating2 from '../../img/rating-2.svg';
import rating2Checked from '../../img/rating-2-checked.svg';
import rating3 from '../../img/rating-3.svg';
import rating3Checked from '../../img/rating-3-checked.svg';
import rating4 from '../../img/rating-4.svg';
import rating4Checked from '../../img/rating-4-checked.svg';
import rating5 from '../../img/rating-5.svg';
import rating5Checked from '../../img/rating-5-checked.svg';

const RatingRowMobile = ({question, question_id, value, setValue}) => {
  return (
    <>
      <tr>
        <td colSpan={5}>{question}</td>
      </tr>
      <tr>
        <RatingRadio
          question_id={question_id}
          icon={rating1}
          iconChecked={rating1Checked}
          radioValue={1}
          value={value}
          setValue={setValue}
        />
        <RatingRadio
          question_id={question_id}
          icon={rating2}
          iconChecked={rating2Checked}
          radioValue={2}
          value={value}
          setValue={setValue}
        />
        <RatingRadio
          question_id={question_id}
          icon={rating3}
          iconChecked={rating3Checked}
          radioValue={3}
          value={value}
          setValue={setValue}
        />
        <RatingRadio
          question_id={question_id}
          icon={rating4}
          iconChecked={rating4Checked}
          radioValue={4}
          value={value}
          setValue={setValue}
        />
        <RatingRadio
          question_id={question_id}
          icon={rating5}
          iconChecked={rating5Checked}
          radioValue={5}
          value={value}
          setValue={setValue}
        />
      </tr>
    </>
  );
};

export default RatingRowMobile;

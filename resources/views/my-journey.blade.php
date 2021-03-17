@extends('app')

@section('content')
<img src='img/start.svg' class='flag'>
<div class='panel'>
    <section>
        <h2>My Journey</h2>
        <p>
            In this section we have a list of things we would like you to rate the questions under the different headings. Be as honest as you can as we will ask these questions at the end of the project so the college and you can see where you have improved.
        </p>
    </section>
</div>

<table class='rating-table'>
    <thead>
        <tr>
            <th>1. Confidence</th>
            <th>Very Difficult</th>
            <th>Difficult</th>
            <th>Not Sure</th>
            <th>Easy</th>
            <th>Very Easy</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>How confident do you feel in general?</td>
            <td>
                <label>
                    <input type='radio' name='general' value='1'>
                    <img src='img/rating-1.svg' />
                </label>
            </td>
            <td>
                <label>
                    <input type='radio' name='general' value='2'>
                    <img src='img/rating-2.svg' />
                </label>
            </td>
            <td>
                <label>
                    <input type='radio' name='general' value='3'>
                    <img src='img/rating-3.svg' />
                </label>
            </td>
            <td>
                <label>
                    <input type='radio' name='general' value='4'>
                    <img src='img/rating-4.svg' />
                </label>
            </td>
            <td>
                <label>
                    <input type='radio' name='general' value='5'>
                    <img src='img/rating-5.svg' />
                </label>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan='6'>
                <p>
                Do you have any extra comments or pictures you would like to share on the topic of confidence?
                </p>
                <textarea placeholder="Type here..."></textarea>
            </td>
        </tr>
    </tfoot>
</table>

<div class='button-row'>
    <button onclick="window.location.href='/my-journey-2'">Next</button>
</div>
@endsection
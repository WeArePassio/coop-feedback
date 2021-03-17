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
            <th>Nervous</th>
            <th></th>
            <th>Confident</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>How confident do you feel in general?</td>
            <td><input type='radio' name='general' value='1'></td>
            <td><input type='radio' name='general' value='2'></td>
            <td><input type='radio' name='general' value='3'></td>
        </tr>
        <tr>
            <td>How do you feel about trying new things?</td>
            <td><input type='radio' name='new-things' value='1'></td>
            <td><input type='radio' name='new-things' value='2'></td>
            <td><input type='radio' name='new-things' value='3'></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan='4'>
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
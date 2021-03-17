@extends('app')

@section('content')
<header>
    <h1>
        Welcome to your Co-operative College course!
    </h1>
    <div class='line'></div>
</header>
<img src='img/start.svg' class='flag'>
<div class='panel'>
    <section>
        <h2>Introduction Session</h2>
        <p>
            This is the start of your journey on the Ad(venture) course with the Co-operative college! We’d like you to take a bit of time in this first session to think about what is important to you and what you would like to get from the project.
        </p>
    </section>
</div>
<div class='panel'>
    <section>
        <p>
        We would also like you to think about some different skills that you may have or would like to improve on. In the question about skills, please be as honest as you can and do not worry about selecting that you’d like to imrpove - that is what the course is for.
        </p>
    </section>
</div>
<div class='button-row'>
    <button onclick="window.location.href='/about-me'">Next</button>
</div>
@endsection
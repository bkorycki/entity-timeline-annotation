<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Timeline Annotation - {{ doc_id }}</title>
    <link href="/static/css/main.css" rel="stylesheet">
    <link href="/static/css/progress.css" rel="stylesheet">
</head>
<body>

<crowd-form>
    <h1 id="page-title">{{ doc_id }}: </h1>
    <div id="progressbar"></div>

    <crowd-card class="text-post-section">
        <article>
            <header>
                <span class='post_date'>Date: <span class='date_entity dct_entity'>{{ dct }}</span></span>
            </header>
            <p>{{!source}}</p>
        </article>
    </crowd-card >

    <section class="task-section">
        % for med_ix, med in enumerate(meds):
        <div class="med_slide hidden">
            % include partials/intake_task.tpl med=med, med_ix=med_ix
            % include partials/dates_task.tpl med=med, med_ix=med_ix, times=times
            % include partials/durations_task.tpl med=med, med_ix=med_ix, durations=durations
        </div>
        % end
    </section>

    <div class="button-container">
        <button type="button" class="next disable opaque" title="Continue">&#8594;</button>
        <button type="button" class="prev" title="Back">&#8592;</button>
    </div>

    % include partials/feedback_section.tpl
    % include partials/instructions.tpl

   <!-- {# <button type="submit" style="display: none">Submit</button> #} -->
    <crowd-button form-action="submit" style="display: none"></crowd-button>
</crowd-form>

<script src="https://assets.crowd.aws/crowd-html-elements.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<script src="/static/js/scripts.js"></script>
<script src="/static/js/progress.js"></script>
</body>
</html>

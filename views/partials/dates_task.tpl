<div class="task_div dates_task collapsible">
    <button type="button" class="task_header">
        <div class="question_text">
            For each date listed below, identify if the author was taking <span class='target_med'>{{ med }}</span> at that time.
        </div>
    </button>
    <div class="content_wrapper">
        <div class="content timeline">
            % for time_ix, time in enumerate(times):
            <div class="event">
                <select class="tl_row_element" name="dates_{{ med_ix }}_{{ time_ix }}">
                    <option value="before">BEFORE med. start date</option>
                    <option value="start">START date</option>
                    <option value="on">TAKING med.</option>
                    <option value="stop">STOP date</option>
                    <option value="after">AFTER med. stop date</option>
                    <option value="uncertain" selected>Uncertain</option>
                </select>
                <div class="timeline_segment"></div>
                <div class="circle tl_row_element"></div>
                <div class="horiz_dash tl_row_element"></div>
                <div class="option_text date_entity tl_row_element">{{ time }}</div>
            </div>
            % end
        </div>
        <div class="content no_ans_checkbox">
            <label><input type="checkbox" name="dates_{{ med_ix }}_NONE">Medication intake is unknown for all dates above</label>
        </div>
    </div>
</div>

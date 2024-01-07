<div class="task_div durations_task collapsible">
    <button type="button" class="task_header">
        <div class="question_text">
            For how long was the author on <span class='target_med'>{{ med }}</span>?
        </div>
    </button>
    <div class="content_wrapper">
        <div class="content timeline">
            % for dur_ix, dur in enumerate(durations):
            <div class="event">
                <select name="durs_{{ med_ix }}_{{ dur_ix }}" class="tl_row_element">
                    <option value="less">LESS than</option>
                    <option value="about">ABOUT</option>
                    <option value="longer">LONGER than</option>
                    <option value="uncertain" selected>Uncertain</option>
                </select>
                <div class="option_text duration_entity tl_row_element">{{ dur }}</div>
            </div>
            % end
        </div>
        <div class="content no_ans_checkbox">
            <label>
                <input type="checkbox" name="durs_{{ med_ix }}_NONE">Intake duration is completely unknown
            </label>
        </div>
    </div>
</div>

<short-instructions class="dates_entities">
      <br>
      A post from a Bipolar Disorder forum is displayed on the left. 
      The date when the post was created is shown at the top of the post (e.g. <span class='post_date'>Post date: <span class='date_entity dct_entity'>2000-01-01</span></span>).
      You will be answering a set of questions about each medication (e.g. <span class="target_med">Med X</span>) mentioned in the post. 
      <hr>
    </short-instructions>
    <full-instructions class="dates_entities">
      <div class="tab_header">
        <button class="active">Q1) Intake</button>
        <button>Q2) Dates</button>
        <button>Q3) Durations</button>
      </div>
      <div class="instruction_tab">
        <!-- INTAKE TAB -->
        <h3>Has the author ever taken <span class='target_med'>MED</span>?</h3>
        <ul>
          <li> 
            <b>Definitely yes</b> (can be past or present)
            <ul>
              <li><i> I used to take <span class="target_med">MED</span></i></li>
              <li><i> The <span class="target_med">MED</span> made me feel worse</i></li>
              <li><i> I'm on <span class="target_med">MED</span></i></li>
            </ul>
          </li>
          <li> 
            <b>Definitely no</b>: It is reasonably certain that the author has definitely never been on the medication.
            <ul>
              <li><i>My doctor wants me to consider trying out <span class="target_med">MED</span>.</i></li>
            </ul>
          </li>
          <li> 
            <b>Uncertain</b>: It is not clear if the author has taken the medication or not.
            <ul>
              <li><i>I'm not sure what I think about <span class="target_med">MED</span></i></li>
              <li><i>What are your experiences with <span class="target_med">MED</span>?</i></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="instruction_tab hidden">
        <!-- DATES TAB -->
        <h3>
          For each date below, identify if the author was taking <span class='target_med'>MED</span> at that time. 
        </h3>
        When this question is open, the date expressions in the post will be highlighted in <span class='date_entity'>blue</span> and the post creation date will be <span class='date_entity dct_entity'>dark blue</span>dark blue. 
        The question displays a timeline of all these dates in chronological order.
        An example post and timeline are displayed below.
        <div class="example">
          <div class="ex_post"> 
            <span class='post_date'>Post date: <span class='date_entity dct_entity'>2021-08-15</span></span><br>
            I was diagnosed in <span class='date_entity'>2016</span> and have been stable on <span class="target_med">Lamictal</span> since starting it <span class='date_entity'>last year</span>. Despite maintaining this stability during pregnancy, I am now 6 weeks postpartum and am so depressed I feel like I'm already dead. I was on Wellbutrin alone for depression (before being diagnosed with bipolar, stopped it <span class='date_entity'>almost 4 years ago</span>) for several years and did not struggle with depression hardly at all but remained in a hypomanic state the majority of the time. I'm considering trying Lithium-- what are your experiences?
          </div>
          <div class="ex_q">
            <div class="content timeline">
              <div class="event">
                <div class="timeline_segment uncertain_seg"> </div>
                <div class="circle uncertain_event tl_row_element"> </div>
                <div class="horiz_dash tl_row_element"> </div>
                <div class="option_text date_entity tl_row_element">almost 4 years ago</div>
              </div>
              <div class="event">
                <div class="timeline_segment uncertain_seg"> </div>
                <div class="circle uncertain_event tl_row_element"> </div>
                <div class="horiz_dash tl_row_element"> </div>
                <div class="option_text date_entity tl_row_element">2016</div>
              </div>
              <div class="event">
                <div class="timeline_segment uncertain_seg"> </div>
                <div class="circle uncertain_event tl_row_element"> </div>
                <div class="horiz_dash tl_row_element"> </div>
                <div class="option_text date_entity tl_row_element">last year</div>
              </div>
              <div class="event">
                <div class="timeline_segment uncertain_seg"> </div>
                <div class="circle uncertain_event tl_row_element"> </div>
                <div class="horiz_dash tl_row_element"> </div>
                <div class="option_text date_entity tl_row_element dct_entity">2021-08-15</div>
              </div>
            </div>
          </div>
        </div>
        For each date, you must select the option that best describes the author's intake-status of <span class="target_med">MED</span> at that time.
        Whenever a new option is selected, the timeline will be automatically updated to ensure that the responses are logical.
        The available options for each date are:
        <ul>
          <li> 
            <b>BEFORE med. start date</b>: The date occured before the author had starting taking the medication (i.e. the author had not yet started the medication).
            <ul>
              <li><i>I was diagnosed in <span class='date_entity'>2016</span> but remained untreated until just recently when I was put on <span class="target_med">MED</span>.</i></li>
            </ul>
          </li>
          <li> 
            <b>START date</b>: The author first started taking the medication on this date
            <ul><li>
              <i>I started on <span class="target_med">MED</span> <span class='date_entity'>3 years ago</span>.</i></li>
            </ul>
          </li>
          <li> 
            <b>TAKING med.</b>: The author was taking the medication on this date
            <ul>
              <li>
              <i>I was on <span class="target_med">MED</span> <span class='date_entity'>a couple years ago</span>.</i>
            </li>
            </ul>
          </li>
          <li> 
            <b>STOP date</b>: The author stopped taking the medication on this date
            <ul>
              <li>
              <i><span class='date_entity'>Yesterday</span> I quit taking <span class="target_med">MED</span>.</i></li>
            </ul>
          </li><li> 
            <b>AFTER med. stop date</b>: This date occurred after the author stopped taking the medication (i.e. the author was no longer taking the medication)
            <ul>
              <li>
                <i>Post date: <span class='date_entity dct_entity'>10/05/2019</span></i>
                <br><i>I used to take <span class="target_med">MED</span>.</i>
              </li>
            </ul>
          </li><li> 
            <b>UNCERTAIN</b>: None of the above options can be inferred from the text with reasonable certainty.
            <ul>
              <li>
                <i>Post date: <span class='date_entity dct_entity'>06/15/2008</span></i>
                <br><i> Not sure what to think about <span class="target_med">MED</span></i>
              </li>
            </ul>
          </li>
        </ul>
      </div>  
      <div class="instruction_tab hidden durations_entities">
        <h3> For how long was the author on <span class="target_med">MED</span>?</h3>
        Similarily to the dates question, you will do this identify the author's intake-duration by comparing it to each duration expression mentioned in the text.
        The duration expressions will be highlighted in <span class='duration_entity'>purple</span> and the question will be display them in order from shortest to longest. An example is shown below.
        <div class="example">
          <div class="ex_post"> 
            <span class='post_date'>Post date: 2021-08-15</span><br>
            I was diagnosed in 2016 and have been stable on <span class="target_med">Lamictal</span> since starting it last year. Despite maintaining this stability during pregnancy, I am now <span class='duration_entity'>6 weeks</span> postpartum and am so depressed I feel like I'm already dead. I was on Wellbutrin alone for depression (before being diagnosed with bipolar, stopped it almost 4 years ago) for <span class='duration_entity'>several years</span> and did not struggle with depression hardly at all but remained in a hypomanic state the majority of the time. I'm considering trying Lithium-- what are your experiences?
          </div>
          <div class="ex_q">
            <div class="content timeline">
              <div class="event">
                <div class="option_text duration_entity tl_row_element">6 weeks</div>
              </div>
            </div>
              <div class="event">
                <div class="option_text duration_entity tl_row_element">several years</div>
              </div>
          </div>
        </div>
        For each duration expression, identify if the author was on <span class="target_med">MED</span> for less than, equal to, or longer than that amount of time.
        Whenever a new option is selected, the other options will be automatically updated to ensure that the responses are logical.
        The available options are:
        <ul>
          <li> 
            <b>LESS THAN</b>: The author was on the medication for less than this amount of time
            <ul>
              <li><i> I have been on MED1 for <span class='duration_entity'>3 months</span>. I started taking <span class="target_med">MED2</span> just recently.</i></li>
            </ul>
          </li>
          <li> 
            <b>ABOUT</b>: The author was on the medication for about equal to this amount of time
            <ul><li>
              <i>I've been on <span class="target_med">MED</span> for <span class='duration_entity'>3 years</span> now.</i></li>
            </ul>
          </li>
          <li> 
            <b>MORE THAN</b>: The author was on the medication for longer than this amount of time
            <ul>
              <li><i> It's been <span class='duration_entity'>a couple weeks</span> since I started MED1. I was already taking <span class="target_med">MED2</span> and MED3 before that.</i></li>
            </ul>
          </li>
          <li> 
            <big><b>UNCERTAIN</b></big>: You cannot definitely conclude how long the author was on the medication for compared to this duration expression.
            <ul>
              <li><i> I once tried <span class="target_med">MED1</span> but ended up stopping it due to weight gain. I also was on MED2 for <span class='duration_entity'>a few months</span> in the past.</i></li>
            </ul>
          </li>
        </ul>
      </div>
    </full-instructions>
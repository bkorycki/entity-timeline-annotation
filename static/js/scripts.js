function disable(root_element, opaque=true){
  $(root_element).addClass("disable");
  if (opaque == true){
    $(root_element).addClass("opaque");
  }
  return $(root_element).find("input").each(function() {       
    // uncheck radio button
    $(this).prop('checked', false);
    if (typeof this.disabled != "undefined" && this.disabled !=true) {
      $(this).data('jquery.disabled', this.disabled);
      this.disabled = true;
    }
  });
};

function enable(root_element){
 $(root_element).removeClass("disable");
 return $(root_element).find("input").each(function() {  
    if (typeof this.disabled != "undefined") {
      this.disabled = $(this).data('jquery.disabled');
    }
  });
};

function update_buttons(){
  // update progress bar
  this.progress_bar.progressbar({
      value: ((this.slideIndex +1)*100.0)/(this.num_slides -1)
    });
  // update buttons
  if (this.slideIndex == 0){
    this.prev_button.addClass("hidden");
  } else {
    this.prev_button.removeClass("hidden");
  }
  if (this.slideIndex == this.num_slides-1){
    this.next_button.addClass("submit_button");
    this.next_button[0].innerHTML = "Submit";
  } else {
    this.next_button.removeClass("submit_button");
    this.next_button[0].innerHTML = "&#8594;";
  }
  var slide = $(this.slides[this.slideIndex]);
  if (slide.hasClass("v1") && slide.hasClass("v2") && (slide.hasClass("v3") || slide.hasClass("v4")) ){
    enable(this.next_button);
  } else if (this.slideIndex == this.num_slides-1){
    enable(this.next_button);
  } else {
    disable(this.next_button);
  }
};

function changeSlide() {
  // Make sure slideIndex is in range
  if (this.slideIndex >= this.num_slides) {
    this.slideIndex = 0;
  }    
  if (this.slideIndex < 0) {
    this.slideIndex = this.num_slides-1;
  }
  // hide inactive slides
  for (var i = 0; i < this.num_slides; i++) {
    $(this.slides[i]).addClass("hidden");
    $(this).find(".med_entity_" + i).removeClass("target_med");
    $(".text-post-section").find(".med_entity_" + i).removeClass("target_med other_med");
  }
  // Show current slide
  $(this.slides[this.slideIndex]).removeClass("hidden");
  if (this.slideIndex < this.num_slides -1){
    $(this).find(".med_entity_" + this.slideIndex).addClass("target_med");
    $(".text-post-section").find(".med_entity_" + this.slideIndex).addClass("target_med");   
  }

  // collapse all tasks & remove dates/duration entities
  var durs_task =  $(this.slides[this.slideIndex]).find(".durations_task");
  var dates_task =  $(this.slides[this.slideIndex]).find(".dates_task");
  $(durs_task).children().removeClass("active");
  $(dates_task).children().removeClass("active");
  $(".text-post-section").removeClass("dates_entities durations_entities");
  
  this.update_buttons();
};

function xml_http_post(data) {
  var req = new XMLHttpRequest();
  req.open("POST", true);
  req.onreadystatechange = function() {
      if (req.readyState == 4) {
      console.log(req.responseText);
      }
  }
  req.send(data);
}

$(document).ready(function(){
  // DISABLE SUBMIT SHORTCUT
  document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.keyCode === 13) {
      event.preventDefault();
      return;
    }
  });

  // INIT INSTRUCTIONS
  $(".tab_header > button").each(function(i) {
    $(this).click(function(){
      $(".instruction_tab").addClass("hidden");
      $(".tab_header > button").removeClass("active");
      $(".instruction_tab").eq(i).removeClass("hidden");
      $(this).addClass("active");
    });
  });

// INITIALIZE
  var UI = {
    slides: $('.med_slide'),
    num_slides: $('.med_slide').length,
    slideIndex: 0,
    prev_button: $(".prev"),
    next_button: $(".next"),
    progress_bar: $("#progressbar")
  }
  UI.changeSlide = changeSlide;
  UI.update_buttons = update_buttons;

  // Hide progress bar
  if(UI.num_slides  <= 1){
    $(UI.progress_bar).addClass("hidden");
  }
  // Init. buttons
  UI.prev_button.click(function(){
    UI.slideIndex -= 1;
    UI.changeSlide();
  });
  UI.next_button.click(function(){
    if (UI.slideIndex >= UI.num_slides - 1){
      var data = $("crowd-form :input").serializeArray();
      data = JSON.stringify(data)
      xml_http_post(data)      
      document.querySelector('crowd-form').submit();
    } else {
      UI.slideIndex += 1;
      UI.changeSlide();      
    }
  }); 

  function collapse(div){
    $(div).children().toggleClass("active");
  };


//////////////////////////////////////////////////////////////////
  $(UI.slides).each(function(i) {
    // if (i == UI.num_slides-2){
    //   i = "TEST";
    // }
    var intake_task = $(this).find(".intake_task");
    var durs_task = $(this).find(".durations_task");

    if(durs_task.length == 0){
      $(this).addClass("v4");
    }

    var DursObj = {
      rows: [],
      N: $(durs_task).find(".event").length
    };
    var dates_task = $(this).find(".dates_task");
    var DatesObj = {
      rows: [],
      N: $(dates_task).find(".event").length,
      min_start: -1,
      max_start: 10000,
      min_stop: 10000
    };

    // SLIDE INITIALIZATION
    UI.changeSlide();
    var slide = this;

  //************************************************************

    /// Q1) Intake ///
    var intake_collapse_btn = $(intake_task).find("button");
    intake_collapse_btn.click(function(){
      collapse(intake_task);
    });
    // initially active + disable button 
    $(intake_task).children().addClass("active");
    disable(intake_collapse_btn, opaque=false);
    console.log($(this).find('input[name="intake_'+i+'"]'));
    // intake input
    $(this).find('input[name="intake_'+i+'"]').change(function(){
      console.log("CHANGE");
      $(intake_task).addClass("complete");
      $(slide).addClass("v1");
      var new_val = $(slide).find('input[name="intake_'+i+'"]:checked').val();
      $(slide).find(".intake_ans")[0].innerHTML = new_val;
      if(new_val== "yes"){
        $(intake_task).addClass("collapsible");
        collapse(intake_task);
        enable(intake_collapse_btn, opaque=false);
        $(slide).find('.dates_task, .durations_task').removeClass("hidden");
        setTimeout(function(){
            $(slide).find('.dates_task, .durations_task').children().addClass("active");
            $(".text-post-section").addClass("dates_entities durations_entities");
        }, 100);
        $(slide).removeClass("v2 v3");
        disable(UI.next_button);

      } else{
        $(intake_task).removeClass("collapsible");
        disable(intake_collapse_btn, opaque=false);
        $(slide).find('.dates_task, .durations_task').addClass("hidden");
        $(slide).find('.dates_task, .durations_task').removeClass("active");
        DatesObj.clear();
        DursObj.clear();
        $(dates_task).removeClass("complete");
        $(durs_task).removeClass("complete");
        //  clear duration inputs
        for( let r=0; r < DursObj.N; r++){
          var row = DursObj.rows[r];
          $(row).find('option[value="uncertain"]').prop('selected', true);
        }
        // clear dates inputs

        // enable next button
        $(slide).addClass("v2 v3");
        enable(UI.next_button);
        $(".text-post-section").removeClass("dates_entities durations_entities");
      }
    });

//************************************************************
//                DURATIONS 
//************************************************************
  function clear_durs(){
    for( let r=0; r < this.N; r++){
      var row = this.rows[r];
      $(row).find('option[value="uncertain"]').prop('selected', true);
    }
  }

  function less_next(i){
    if (i < 0 || i >= this.N){
      return;
    }
    var row = this.rows[i];
    $(row).find('option[value="less"]').prop('selected', true);
    this.less_next(i+1);
  }
  function longer_prev(i){
    if (i < 0 || i >= this.N){
      return;
    }
    var row = this.rows[i];
    $(row).find('option[value="longer"]').prop('selected', true);
    this.longer_prev(i-1);
  }
  function uncertain_prev_dur(i){
    if ( i < 0 || i >= this.N ){
      return;
    } 
    var row = this.rows[i];
    var val = $(row).find("select").find(":selected").val();
    if (val == "about" || val == "less"){
      $(row).find('option[value="uncertain"]').prop('selected', true);
    }
    this.uncertain_prev(i-1);
  }
  function uncertain_next_dur(i){
    if ( i < 0 || i >= this.N ){
      return;
    } 
    var row = this.rows[i];
    var val = $(row).find("select").find(":selected").val();
    if (val == "about" || val == "longer"){
      $(row).find('option[value="uncertain"]').prop('selected', true);
    }
    this.uncertain_next(i+1);
  }

    var durs_collapse_btn = $(durs_task).find("button");
    durs_collapse_btn.click(function(){
      collapse(durs_task);
      $(".text-post-section").toggleClass("durations_entities");
    });

    DursObj.less_next = less_next;
    DursObj.longer_prev = longer_prev;
    DursObj.uncertain_prev = uncertain_prev_dur;
    DursObj.uncertain_next = uncertain_next_dur;
    DursObj.clear = clear_durs;
    // NO RELEVANT ANSWER CHECKBOX
    $(durs_task).find(":checkbox").change(function() {
      if (this.checked){
        $(durs_task).addClass("complete");
        $(slide).addClass("v3");
        if( $(slide).hasClass("v2")){
          enable(UI.next_button);
        }
        collapse(durs_task);
        $(".text-post-section").toggleClass("durations_entities");
        // Clear & disable timeline inputs
        disable($(durs_task).find(".timeline"));
        DursObj.clear();
      } else {
        $(durs_task).removeClass("complete");
        $(slide).removeClass("v3");
        disable(UI.next_button);
        // enable timeline inputs
        enable($(durs_task).find(".timeline"));
      }
    });
    // Timeline functions
    // less, about, longer, uncertain
    $(durs_task).find(".event").each(function(e) {
      DursObj.rows.push(this);
      $(this).change(function() {
        var selected_val = $(this).children("select").find(":selected").val();
        if (selected_val== "less"){   
          DursObj.less_next(e+1);
        } else if (selected_val == "about"){
          DursObj.less_next(e+1);
          DursObj.longer_prev(e-1);
        } else if (selected_val == "longer"){   
          DursObj.longer_prev(e-1);
        } else if (selected_val== "uncertain"){
          DursObj.uncertain_prev(e-1);
          DursObj.uncertain_next(e+1);
        }
        // Check if complete
        var complete = false;
        for( let j=0; j < DursObj.N; j++){
          if ($(DursObj.rows[j]).find("select").find(":selected").val() != "uncertain"){
            complete = true;
          }
        } 
        if(complete == true){
          $(durs_task).addClass("complete");
          $(slide).addClass("v3");
          if( $(slide).hasClass("v2")){
            enable(UI.next_button);
          }
        } else{
          $(durs_task).removeClass("complete");
          $(slide).removeClass("v3");
          disable(UI.next_button);
        }
      });
    });
  // }); 


//************************************************************
//                DATES TIMELINE
//************************************************************
  function clear_dates(){
    for( let r=0; r < DatesObj.N; r++){
      var row = DatesObj.rows[r];
      row.set("uncertain");
      row.segment_style("uncertain");          
    }
    DatesObj.min_start = -1;
    DatesObj.max_start = 10000;
    DatesObj.min_stop = 10000;
  }
    function on_next(i){
      if ( i < 0 || i >= this.N ){
        return;
      } 
      var row = this.rows[i];
      if (row.get_val()=="stop" ){
        return;
      }
      else if (i <= this.min_start && this.min_start >-1){
        row.set("on");
        this.on_next(i+1);
      } else if (i < this.min_stop && this.min_stop < this.N && this.rows[this.min_stop].get_val() == "stop"){
        row.set("on");
        this.on_next(i+1);
      } else if (row.get_val() == "before"){
        row.set("uncertain");
        this.uncertain_next(i+1);       
      }
    }
    function on_prev(i){
      if ( i < 0 || i >= this.N ){
        return;
      } 
      var row = this.rows[i];
      if (i > this.min_start && this.min_start > -1){
        row.set("on");
        this.on_prev(i-1);
      }
      else if ( this.min_stop <= i){
        row.set("uncertain");
        this.on_prev(i-1);
      }
    }
    function before(i){
      if (i < 0 || i >= this.N){
        return;
      }
      var row = this.rows[i];
      row.set("before");
      this.before(i-1);
    }
    function after(i){
      if (i < 0 || i >= this.N){
        return;
      }
      var row = this.rows[i];
      row.set("after");
      this.after(i+1);
    }
    function after_prev(i){
      if (i < 0 || i >= this.N){
        return;
      }
      var row = this.rows[i];
      if (i > this.min_stop && this.min_stop < this.N){
        row.set("after");
        this.after_prev(i+1);
      }
    }
    function uncertain_prev(i){
      if (i < 0 || i >= this.N-1){
        return;
      }
      var row = this.rows[i];
      if (i >= this.min_stop){
        row.set("uncertain");    
        if (i > this.min_stop){
          this.uncertain_prev(i-1); 
        }
      } 
      else if ((row.get_val() == "on" || row.get_val() == "start") && (i < this.max_start-1 || (this.min_stop < this.N && this.rows[this.min_stop].get_val() == "stop"))) {
        row.set("uncertain");
        this.uncertain_prev(i-1);
      } 
    }
    function uncertain_next(i){
      if (i < 0 || i >= this.N){
        return;
      }
      var row = this.rows[i];
      if (row.get_val() == "before"){ 
        row.set("uncertain");
        this.uncertain_next(i+1);
      }
      if (row.get_val() == "start"){
        row.set("on");
      }
    }

    // $(UI.slides).each(function(i) {
      // var slide = this;
      /// Q2) Dates ///
      var dates_collapse_btn = $(dates_task).find("button");
      dates_collapse_btn.click(function(){
        collapse(dates_task);
        $(".text-post-section").toggleClass("dates_entities");
      });

      DatesObj.on_prev = on_prev;
      DatesObj.on_next = on_next;
      DatesObj.before = before;
      DatesObj.after = after;
      DatesObj.after_prev = after_prev;
      DatesObj.uncertain_prev = uncertain_prev;
      DatesObj.uncertain_next = uncertain_next;
      DatesObj.clear = clear_dates;

      function circle_style(label){
        this.circle.removeClass("uncertain_event before_event after_event on_event start_event stop_event");
        this.circle.addClass(label + "_event");
      }
      function segment_style(label){
        this.segment.removeClass("uncertain_seg before_seg after_seg on_seg start_seg stop_seg");
        this.segment.addClass(label + "_seg");
      }
      function set(label){
        $(this.row).find('option[value="'+label+'"]').prop('selected', true);
        this.circle_style(label);
      }

      function get_val(){
        return $(this.row).find("select").find(":selected").val();
      }

      // NO RELEVANT ANSWER CHECKBOX
      $(dates_task).find(":checkbox").change(function() {
        if (this.checked){
          $(dates_task).addClass("complete");
          $(slide).addClass("v2");
          if( $(slide).hasClass("v3") ||  $(slide).hasClass("v4")){
            enable(UI.next_button);
          }
          collapse(dates_task);
          $(".text-post-section").toggleClass("dates_entities");
          // Clear & disable timeline inputs
          disable($(dates_task).find(".timeline"));
          DatesObj.clear();
        } else {
          $(dates_task).removeClass("complete");
          $(slide).removeClass("v2");
          disable(UI.next_button);
        
          
          // enable timeline inputs
          enable($(dates_task).find(".timeline"));
        }
      });

      // Timeline functions
      $(dates_task).find(".event").each(function(e) {
        var RowObj = {
          row: this,
          circle: $(this).children('.circle'),
          segment: $(this).children('.timeline_segment'),
        };
        RowObj.circle_style = circle_style;
        RowObj.segment_style = segment_style;
        RowObj.set = set;
        RowObj.get_val = get_val;

        DatesObj.rows.push(RowObj);

        // init all rows to Uncertain
        RowObj.circle_style("uncertain");
        RowObj.segment_style("uncertain");

        $(this).change(function() {
          var selected_val = $(this).children("select").find(":selected").val();
          if (selected_val== "on"){   
            RowObj.circle_style("on");
            DatesObj.on_prev(e-1);
            DatesObj.on_next(e+1);
          } else if (selected_val == "start"){
            RowObj.circle_style("start");
            DatesObj.before(e-1);
            DatesObj.on_next(e+1);
          } else if (selected_val == "stop"){   
            RowObj.circle_style("stop");
            DatesObj.on_prev(e-1);
            DatesObj.after(e+1);
          } else if (selected_val== "before"){
            RowObj.circle_style("before");
            DatesObj.before(e-1);  
          } else if (selected_val == "after"){
            RowObj.circle_style("after");
            DatesObj.after(e+1);
            DatesObj.after_prev(e-1);
          } else if (selected_val== "uncertain"){
            RowObj.circle_style("uncertain");
            DatesObj.uncertain_prev(e-1);
            DatesObj.uncertain_next(e+1);
          }

          // CHANGE LINE_SEGMENTS    
          for( let j=0; j < DatesObj.N; j++){
            var row_j = DatesObj.rows[j];
            if ( j == 0 ){
              switch (row_j.get_val()) {
                case "before":
                case "start":
                  row_j.segment_style("before");
                  break;
                case "on":
                case "stop":
                case "after":
                case "uncertain":
                  row_j.segment_style("uncertain");
                  break;
              }
              continue;
            }
            var prev_val = DatesObj.rows[j-1].get_val();
            if (prev_val == row_j.get_val()) {
              row_j.segment_style(row_j.get_val());
            } else if (prev_val == "before"){
              if (row_j.get_val() == "start") {
                row_j.segment_style("before");
              } else {
                row_j.segment_style("uncertain");
              }
            } else if (prev_val == "start"){
              if (row_j.get_val() == "on" || row_j.get_val() == "stop") {
                row_j.segment_style("on");
              }  else {
                row_j.segment_style("uncertain");
              }
            } else if (prev_val == "on"){
              if (row_j.get_val() == "stop") {
                row_j.segment_style("on");
              }  else {
                row_j.segment_style("uncertain");
              } 
            } else if (prev_val == "stop"){
              row_j.segment_style("after");
            } else if (prev_val == "uncertain"){
              row_j.segment_style("uncertain");
            } 
          } 

          // 1. UPDATE MIN_STOP AND MIN_START 
          // 2. Check if complete
          DatesObj.min_start = -1;
          DatesObj.min_stop = 1000;
          DatesObj.max_start = -1;
          var complete = false;
          for( let j=0; j < DatesObj.N; j++){
            if(j == DatesObj.N){
              DatesObj.min_stop = 1000;
              break;
            }
            var j_val = DatesObj.rows[j].get_val();
            if ( j_val == "start" || j_val == "on" ){
              if(DatesObj.min_start == -1){
                DatesObj.min_start = j;
              }
              DatesObj.max_start = j;
            }
            if ((j_val == "stop" || j_val == "after") && DatesObj.min_stop == 1000){
              DatesObj.min_stop = j;
            }
            if (j_val != "uncertain"){
              complete = true;
            }
          } 

          if(complete == true){
            $(dates_task).addClass("complete");
            $(slide).addClass("v2");
            if( $(slide).hasClass("v3") || $(slide).hasClass("v4")){
              enable(UI.next_button);
            }
          } else{
            $(dates_task).removeClass("complete");
            $(slide).removeClass("v2");
            disable(UI.next_button);
          }
        }); 
      });  
  }); 

}); 

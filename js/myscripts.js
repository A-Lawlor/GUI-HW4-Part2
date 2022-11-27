/*
Name: Anthony Lawlor
Contact: AnthonyMichaelLawlor@gmail.com
*/

//Check if the html document is fully loaded before running the javascript/jQuerry
$(document).ready(function(){

  //Sets up variables for tab counter that generates the current name of tabs, tabCounterBackground keeps track of selecting the newest active tab.
  var tabCounter = 1;
  var tabCounterBackground = 1;

 
//Function to check if a numbered entered has any decimal place
//Source: https://stackoverflow.com/questions/241145/jquery-validate-plugin-how-to-create-a-simple-custom-rule
  $.validator.addMethod("onlyInteger",function(value, element){
    if(value % 1 != 0)
      return false;
    else
      return true;
  }, "Error: Please only enter Integers no decimal places");

  //Decleration of function to track if the mulitplier miniumum is less than or equal to maximum otherwise display error
  $.validator.addMethod("multiplierMinLessThanMax",function(value, element){
    if( parseInt(value) <= parseInt($('#multiplierMaximum').val()) || $('#multiplierMaximum').val() == ''){
      return true;
    }
    else
      return false;
  }, "Error: Minimum column value must be less than or equal to maximum column value");

    //Decleration of function to track if the multiplicand miniumum is less than or equal to maximum otherwise display error
  $.validator.addMethod("multiplicandMinLessThanMax",function(value, element){
    if( parseInt(value) <= parseInt($('#multiplicandMaximum').val()) || $('#multiplicandMaximum').val() == ''){
      return true;
    }
    else
      return false;
  }, "Error: Minimum row value must be less than or equal to maximum row value");


  //Overwrite the functions to update the values of the sliders based on values in form inputs
  //Source: https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field
  $("#multiplierMinimum").change(function() {
    $("#slider-multiplierMinimum").slider('value', $(this).val());
  });
  $("#multiplierMaximum").change(function() {
    $("#slider-multiplierMaximum").slider('value', $(this).val());
  });
  $("#multiplicandMinimum").change(function() {
    $("#slider-multiplicandMinimum").slider('value', $(this).val());
  });
  $("#multiplicandMaximum").change(function() {
    $("#slider-multiplicandMaximum").slider('value', $(this).val());
  });

  //jQuerry Validator form that checks for errors and parameters and modifies messages to display underneath for input if false.
  //Sources: https://www.youtube.com/watch?v=ZQ7QlYX_UwI
  var $commentForm = $("#inputForm");
  if($commentForm.length){
    $commentForm.validate({
      rules:{
        multiplierMinimum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
          multiplierMinLessThanMax: true,
        },
        multiplierMaximum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
        },
        multiplicandMinimum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
          multiplicandMinLessThanMax: true
        },
        multiplicandMaximum:{
          required: true,
          max: 200,
          min: -200,
          onlyInteger: true,
        }
      },
      messages:{ //Overwrites the default error messages when the input does not meet the specific validation requirements
        multiplierMinimum:{
          required: "Error: minimum column value required",
          number: "Error: Please Enter valid numerical number (Integer) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
     
        },
        multiplierMaximum:{
          required: "Error: minimum column value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        },
        multiplicandMinimum:{
          required: "Error: minimum row value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only" ,
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        },
        multiplicandMaximum:{
          required: "Error: maximum row value required",
          number: "Error: Please Enter valid numerical numbers (Integers) only",
          max: "Error: Please enter a number (Integer) less than 200",
          min: "Error: Please enter a number (Integer) greater than -200"
        }
      }
    })
  }

  //Modify parameters of jQuerry sliders
  //Sources: https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm

  $(function() {
      $( "#slider-multiplierMinimum" ).slider({
        range:false,
        min: -200,
        max: 200,
        value: 0,
        change: function( event, ui) {
          $( "#slider-multiplierMinimum" ).find( ".ui-slider-handle" ).text(ui.value);
          $.submit();
        },
        slide: function( event, ui ) {
          $( "#multiplierMinimum" ).val( ui.value );
          $( "#slider-multiplierMinimum" ).find( ".ui-slider-handle" ).text(ui.value);

        }
      }),

      $( "#slider-multiplierMaximum" ).slider({
        range:false,
        min: -200,
        max: 200,
        change: function( event, ui) {
          $( "#slider-multiplierMaximum" ).find( ".ui-slider-handle" ).text(ui.value);
          $.submit();
        },
        slide: function( event, ui ) {
          $( "#multiplierMaximum" ).val( ui.value );
          $( "#slider-multiplierMaximum" ).find( ".ui-slider-handle" ).text(ui.value);
        }
    }),

      $( "#slider-multiplicandMinimum" ).slider({
        range:false,
        min: -200,
        max: 200,
        change: function( event, ui) {
          $( "#slider-multiplicandMinimum" ).find( ".ui-slider-handle" ).text(ui.value);
          $.submit();
        },
        slide: function( event, ui ) {
          $( "#multiplicandMinimum" ).val( ui.value );
          $( "#slider-multiplicandMinimum" ).find( ".ui-slider-handle" ).text(ui.value);
        }
    }),

      $( "#slider-multiplicandMaximum" ).slider({
        range:false,
        min: -200,
        max: 200,
        change: function( event, ui) {
          $( "#slider-multiplicandMaximum" ).find( ".ui-slider-handle" ).text(ui.value);
          $.submit();
        },
        slide: function( event, ui ) {
          $( "#multiplicandMaximum" ).val( ui.value );
          $( "#slider-multiplicandMaximum" ).find( ".ui-slider-handle" ).text(ui.value);
        }
    });
  });



  //jQuerry to check if the form is valid, sets up variables using jQuerry and runs it thought table generate function
$.submit = function() {
    if ($('#inputForm').valid()){ 
      var multiplierMin = parseInt($('#multiplierMinimum').val());
      var multiplierMax = parseInt($('#multiplierMaximum').val());
      var multiplicandMin = parseInt($('#multiplicandMinimum').val());
      var multiplicandMax = parseInt($('#multiplicandMaximum').val());
      
       /*Create empty table variable and initialize first cell to have the * symbol
         Source: https://www.w3schools.com/html/html_tables.asp*/
      var table = "<thead> <tr> <th>" + "*" + "</th>";
      

      //Generate the top row of integers in the table based on form input
      for (let i = multiplierMin; i <= multiplierMax ;i++) {
        table += "<th>" + i + "</th>";
      }
      table += "</tr> </thead> <tbody> ";
    

      //Generates the first row of the table by adding the values from minimum row value up through maximum
      //https://www.freecodecamp.org/news/nesting-for-loops-in-javascript/
      for(let j = multiplicandMin; j <= multiplicandMax; j++){
        table += "<tr> <th scope=\"row\">" + j + "</td>";
        //Generates content of the table and adds the resulting valyes into individual cells
        for(let i = multiplierMin; i <= multiplierMax; i++){
          table += "<td>" + j*i + "</td>";
          }
      } 
      //Set the table element in the HTML to be equal to variable table to be displayed.
      $('#tableDisplay').html(table);
    } 
  };  


    //Defines the functions for creating tabs using a template for the list object and then appends the tableDisplay object too the tab only if a table has been generated
    //Source: https://jqueryui.com/tabs/#manipulation
  $( function() {

        var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close ui-closable-tab'></span></li>";
        var tabs = $( "#tabs" ).tabs();

        //When save button is clicked it firsts generates the list object and appends it with a new href object with the name of the currents tab
        $( "#saveButton" ).button().on( "click", function() { 
          if ($('#inputForm').valid()){ 
            var multiplierMin = parseInt($('#multiplierMinimum').val());
            var multiplierMax = parseInt($('#multiplierMaximum').val());
            var multiplicandMin = parseInt($('#multiplicandMinimum').val());
            var multiplicandMax = parseInt($('#multiplicandMaximum').val());
          }
          if($('#tableDisplay').html() != ''){
            var label = "COLUMN Min: " + multiplierMin + " Max: " + multiplierMax + " | ROW Min: " + multiplicandMin + " Max: " + multiplicandMax;
            var id = "tabs-" + tabCounter;
            var li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
            var tabContent = $('#tableDisplay').html();
            
            //Appends the list object to the tabs navigation section.
            tabs.find( ".ui-tabs-nav" ).append( li );
            //Adds in currently generated html tabel into the tabs content and makes the table responsive inside of the tab.
            tabs.append( "<div class = 'table-responsive' id='" + id + "'><table table-stripped>" + tabContent + "</table></div>" );
            tabs.tabs( "refresh" );
            //Select the newest generated tab as the active tab so user does not need to click
            tabs.tabs({active: tabCounterBackground});
            tabs.tabs("option", "active", tabCounterBackground-1);
            tabCounter++;
            tabCounterBackground ++
          }
        });

     
          
        
        //Had a lot of trouble with deleting all tabs most of the solutions online are very outdated
        //Sources: https://stackoverflow.com/questions/721927/empty-jquery-ui-tabs
        $( "#deleteAllButton" ).button().on( "click", function() {
          $('div#tabs ul li').remove();
          $('div#tabs div').remove();
          $("div#tabs").tabs("refresh");
          tabCounter = 1;
          tabCounterBackground = 1;
        });
        
        //Closes the tab if the ui icon has been click in the upper right corner of the tab and then refreshes the tabs.
        //Sources: https://jqueryui.com/tabs/#manipulation
        tabs.on( "click", "span.ui-icon-close", function() {
          var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
          $( "#" + panelId ).remove();
          tabs.tabs( "refresh" );
          tabCounterBackground--;
        });
     
      });
})






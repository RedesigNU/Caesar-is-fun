$(document).ready(function() {

    // page is now ready, initialize the calendar...


	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var courses = [
			{
				id: 213,
				title: 'EECS 213',
				start: new Date(y, m, d-1, 10, 30),
				allDay: false
			},
			{
				id: 214,
				title: 'EECS 214',
				start: new Date(y, m, d-2, 11, 00),
				allDay: false
			}
		]

/*
		function jsonTransform() {
			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=EECS", "json", function(result){
				var old = result;
				var len = old.length,
				    newJson = {transformedData:[]},
				    i;

				$.each(result.slice(0,5), function(i, field){

					newJson.transformedData.push(
						{
							"title": field["subject"] + " " + field["catalog_num"] + ": " +field["title"]
						}
					);
					
				});

				var strJSON = JSON.stringify(newJson, undefined, 2); 
				$("#resultarea").append(strJSON);
				
			
			});
		}
		*/





    $('#calendar').fullCalendar({

		dayClick: function() {
	        $('#calendar').fullCalendar('changeView', 'agendaDay');
		},	    

	    eventClick: function(event, element) {
	        event.title = "CLICKED!";
	        $('#calendar').fullCalendar('updateEvent', event);
	        click(event);
	    },

	    weekends: false,
	    defaultView: 'agendaWeek',

		header: {
		left:   'agendaDay agendaWeek',
		center: 'title',
		right:  'today prev,next'
		},
	
	});

	$('#calendar').fullCalendar('addEventSource', courses);
	
	function click(event) {
		$('#calendar').fullCalendar('refetchEvents');
	};
	


});
	$(document).ready(function() {
	
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
		
	    $('#calendar').fullCalendar({

			dayClick: function() {
		        $('#calendar').fullCalendar('changeView', 'agendaDay');
			},	    

		    eventClick: function(event, element) {
		        event.title = "CLICKED!";
		        $('#calendar').fullCalendar('updateEvent', event);
		    },

		    weekends: false,
		    defaultView: 'agendaWeek',

			header: {
				left:   'agendaDay agendaWeek',
				center: 'title',
				right:  'today prev,next'
			}
		
		});

		var strJSON,
			newJson = [];

		function transformJSON() {

			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=EECS", "json", function(result){
				var old = result;
				var len = old.length,
				    i;

				$.each(result.slice(0,10), function(i, field){

					newJson.push(
						{
							title: field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
							start: "Thu, 24 Apr 2014 " + field["start_time"],
							end: "Thu, 24 Apr 2014 " + field["end_time"],
							allDay: false
						}
					);
					
				});

				strJSON = JSON.stringify(newJson, undefined, 2); 
				$("#resultarea").append(strJSON);
				test(newJson);
					
			});
		};

		function test(testJSON) {
			$('#calendar').fullCalendar('addEventSource', testJSON);
		};

		transformJSON();
		//$('#calendar').fullCalendar('addEventSource', courses);

	});






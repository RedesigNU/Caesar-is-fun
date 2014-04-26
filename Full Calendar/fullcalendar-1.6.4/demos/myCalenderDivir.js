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

		$('#calendar').fullCalendar('addEventSource', courses);

		function transformJSON() {
			var strJSON,
				newJson = {transformedData:[]};
			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=EECS", "json", function(result){
				var old = result;
				var len = old.length,
				    i;

				$.each(result.slice(0,10), function(i, field){

					newJson.transformedData.push(
						{
							title: field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
							start: new Date(y, m, d, 10, 30),
							end: new Date(y, m, d, 11, 30)
						}
					);
					
				});

				strJSON = JSON.stringify(newJson, undefined, 2); 
				$("#resultarea").append(strJSON);
					
			});

			return newJson;
		};

		var res = transformJSON();
		
	});
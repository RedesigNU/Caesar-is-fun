	$(document).ready(function() {
	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var courses = {
    events: [
        {
            title: 'Event1',
            start: '2011-04-04'
        },
        {
            title: 'Event2',
            start: '2011-05-05'
        }
        // etc...
    ],
    color: 'yellow',   // an option!
    textColor: 'black' // an option!
}
		
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
			newJson = {transformedData:[]};

		function transformJSON() {

			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=EECS", "json", function(result){
				var old = result;
				var len = old.length,
				    i;

				$.each(result.slice(0,5), function(i, field){

					newJson.transformedData.push(
						{
							title: field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
							start: new Date(y, m, d-2, 10, 30),
							end: new Date(y, m, d-2, 11, 30),
							allDay: false
						}
					);
					
				});

				strJSON = JSON.stringify(newJson, undefined, 2); 

				$("#resultarea").append(strJSON);
				test(strJSON);
					
			});

			return newJson;
		};

		function test(testJSON) {
			$('#calendar').fullCalendar('addEventSource', testJSON);
		};

		var res = transformJSON();
		$('#calendar').fullCalendar('addEventSource', courses);

	});






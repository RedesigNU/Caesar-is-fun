	$(document).ready(function() {

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
				left:   'month agendaDay agendaWeek',
				center: 'title',
				right:  'today prev,next'
			}
		
		});

		var strJSON,
			newJson = [];

		function getDate(day) {
			var day2num = { "Mo": 1, "Tu": 2, "We": 3, "Th": 4, "Fr": 5 };
			return day2num[day];
		};

		function transformJSON() {

			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=EECS", "json", function(result){
				var old = result;
				var len = old.length,
				    i;

				$.each(result.slice(0,10), function(i, field){
					for (var i=0;i<field["meeting_days"].length;i+=2) {
						//alert(field["meeting_days"] + " " + field["meeting_days"].slice(i,i+2));
						newJson.push(
							{
								title: field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
								start: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["start_time"] + "Z",
								end: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["end_time"] + "Z",
								//start: field["start_date"] + "T" + field["start_time"] + "+01",
								//end: field["start_date"] + "T" + field["end_time"] + "+02",
								allDay: false
							}
						);
					}
				});

				strJSON = JSON.stringify(newJson, undefined, 2); 
				//$("#resultarea").append(strJSON);
				test(newJson);
					
			});
		};


		function test(testJSON) {
			$('#calendar').fullCalendar('addEventSource', testJSON);
		};

		transformJSON();
		$('#calendar').fullCalendar('gotoDate', 2014, 8, 1);

	});






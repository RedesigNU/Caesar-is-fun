	$(document).ready(function() {

	    $('#calendar').fullCalendar({

			dayClick: function() {
		        //$('#calendar').fullCalendar('changeView', 'agendaDay');
			},	    

		    eventClick: function(event, element) {
		        //event.title = "CLICKED!";
		        //$('#calendar').fullCalendar('updateEvent', event);
		    },

		    weekends: false,
		    defaultView: 'agendaWeek',
		    timeFormat: '',
		    firstHour: 9,
		    //minTime: '8:00',
		    //maxTime: '17:30',
		    slotEventOverlap: false,


			header: {
				left:   'month agendaDay agendaWeek',
				center: '',
				right:  'prev,next'
			}
		
		});

		var strJSON,
			newJSON = [];

		function getDate(day) {
			var day2num = { "Mo": 1, "Tu": 2, "We": 3, "Th": 4, "Fr": 5 };
			return day2num[day];
		};

		function transformJSON() {

			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=ECON", "json", function(result){
				var old = result;
				var len = old.length,
				    i;
				$("#resultarea").append("Number of results: " + len + "<br>");

				$.each(result.slice(0,40), function(i, field){
					for (var i=0;i<field["meeting_days"].length;i+=2) {
						newJSON.push(
							{
								title: field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
								start: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["start_time"] + "Z",
								end: "2014-09-0" + getDate(field["meeting_days"].slice(i,i+2)) + "T" + field["end_time"] + "Z",
								allDay: false
							}
						);
					}
				});

				strJSON = JSON.stringify(newJSON, undefined, 2); 
				//$("#resultarea").append(strJSON);
				displayCourses(newJSON);
					
			});
		};


		function displayCourses(newJSON) {
			var html = "";
			for (var i=0;i<20;i+=1) {
				html += "<input type='checkbox'>" + newJSON[i].title + "<br>";
			}
			$('#resultarea').append(html);
			$('#calendar').fullCalendar('addEventSource', newJSON);
		};

		transformJSON();
		$('#calendar').fullCalendar('gotoDate', 2014, 8, 1);

	});






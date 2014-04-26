	$(document).ready(function() {

	    $('#calendar').fullCalendar({

			dayClick: function() {
		        //$('#calendar').fullCalendar('changeView', 'agendaDay');
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
			newJSON = [],
			numResults = 20,
			mySubject = "EECS";


		function transformJSON() {

			$.getJSON("http://vazzak2.ci.northwestern.edu/courses/?term=4540&subject=" + mySubject, "json", function(result){
				var old = result;
					len = old.length;
				$("#resultarea").append("Number of results: " + len + " Displaying: " 
				+ numResults + "<br>");

				$.each(result.slice(0,numResults), function(i, field){
					var courseTitle = field["subject"] + " " + field["catalog_num"] + ": " +field["title"],
						courseID = field["class_num"] ;
					displayCourseList( courseTitle, courseID);
					for (var i=0;i<field["meeting_days"].length;i+=2) {
						newJSON.push(
							{
								id: courseID,
								title: courseTitle,
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
				//removeCourse(37991);
					
			});
		};



		function getDate(day) {
			var day2num = { "Mo": 1, "Tu": 2, "We": 3, "Th": 4, "Fr": 5 };
			return day2num[day];
		};

		function displayCourses(newJSON) {
			$('#calendar').fullCalendar('addEventSource', newJSON);
			$("input[type=checkbox]").change(function () {
				if (this.checked) {
					addCourse(this.id);
				}
				else {
					removeCourse(this.id);
				}
			});
		};

		function displayCourseList(title, courseID) {
			var html = "<input type='checkbox' " + "id=" + courseID + " checked='checked'>" + title + "<br>";
			$('#resultarea').append(html);
		};

		function addCourse(courseID) {
			var indices = jQuery.grep(newJSON, function(obj) {return obj.id == courseID;});
			$('#calendar').fullCalendar('addEventSource', indices);
		};

		function removeCourse(courseID) {
			$('#calendar').fullCalendar('removeEvents', courseID);
		};

		transformJSON();
		$('#calendar').fullCalendar('gotoDate', 2014, 8, 1);


	});






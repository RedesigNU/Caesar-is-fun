<<<<<<< HEAD
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
=======
$(document).ready(function() {

<<<<<<< HEAD
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
=======
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
>>>>>>> FETCH_HEAD
		
	    $('#calendar').fullCalendar({
>>>>>>> FETCH_HEAD

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

<<<<<<< HEAD
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
				
=======
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
							start: new Date(y, m, d-2, 10, 30),
							end: new Date(y, m, d-2, 11, 30),
							allDay: false
						}
					);
					
				});

				strJSON = JSON.stringify(newJson, undefined, 2); 
				$("#resultarea").append(strJSON);
				test(newJson);
					
>>>>>>> FETCH_HEAD
			});
<<<<<<< HEAD
		};
=======

			strJSON = JSON.stringify(newJson, undefined, 2); 
			$("#resultarea").append(strJSON);
				
		});
>>>>>>> FETCH_HEAD

		return newJson;
	};

<<<<<<< HEAD
	var res = transformJSON();
	
});
=======
		function test(testJSON) {
			var c = testJSON;
			$('#calendar').fullCalendar('addEventSource', c);
		};

		transformJSON();

	});





>>>>>>> FETCH_HEAD

$(document).ready(function() {
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	/*
	$('#DSGN').click(function() {
		$('#department-category').empty();
		$('#department-category').append("DSGN");
	}); */
	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		defaultView: 'agendaWeek',
		editable: true, //or true
		//hiddenDays: [2, 4],
		//weekends: false,
		events: [
			{
				title: 'All Day Event',
				start: new Date(y, m, 1)
			},
			{
				title: 'Long Event',
				start: new Date(y, m, d-5),
				end: new Date(y, m, d-2)
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d-3, 16, 0),
				allDay: false
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: new Date(y, m, d+4, 16, 0),
				allDay: false
			},
			{
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false
			},
			{
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			},
			{
				title: 'Birthday Party',
				start: new Date(y, m, d+1, 19, 0),
				end: new Date(y, m, d+1, 22, 30),
				allDay: false
			},
			{
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}
		],
		
		eventClick: function(calEvent, jsEvent, view)
		{
			removeClickedEvent(calEvent.id);
		}

		
	});

	function removeClickedEvent(eventID)
	{
		$('#calendar').fullCalendar(
			'removeEvents',
			eventID
			);
	}
	
	function createEvents() {
		var eventArray = 
		[
			{
				id:1,
				title:'Tester event1',
				start: new Date(y,m,d-1,8,0),
				end: new Date(y,m,d-1,9,0),
				allDay:false
			},
			{
				id: 2, 
				title:'Tester event2',
				start: new Date(y,m,d-1,13,0),
				end: new Date(y,m,d-1,14,0),
				allDay:false
			}

		]
		return eventArray; 
	}

	var eventArray = createEvents();
	$('#addButton').click(function() {
		$('#calendar').fullCalendar(
			'addEventSource',
			eventArray
			//EECSevent
		);
		//alert("test test test");
	});
	$('#removeButton').click(function() {
		$('#calendar').fullCalendar(
			'removeEventSource',
			eventArray
		);
		//alert("test test test");
	});
		
});






















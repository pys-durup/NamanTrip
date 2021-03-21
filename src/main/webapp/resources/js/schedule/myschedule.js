/**
 * 
 */

function editSchedule(tripPlanSeq) {
	event.stopPropagation();
	location.href='/naman/schedule/addschedule.action?tripPlanSeq=' + tripPlanSeq;
}

/*function delSchedule(tripPlanSeq) {
	event.stopPropagation();
	location.href='/naman/schedule/delscheduleok.action?tripPlanSeq=' + tripPlanSeq;
}*/


function showDelokModal(tripPlanSeq) {
	event.stopPropagation();
	$('#delok').modal('show');
	
	$('#delBtn').on('click', function() {
		location.href='/naman/schedule/delscheduleok.action?tripPlanSeq=' + tripPlanSeq;
	});
}
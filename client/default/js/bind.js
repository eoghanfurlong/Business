/**
 * bind.js
 * bind dom events to handler
 */

function bindEvents(){
	
	$("#submitMortgage").bind("click",function(){
		var years=$("#years").val();
		var interest=$("#interest").val();
		var loanAmount=$("#loanAmount").val();
		var tax=$("#tax").val();
		var insurance=$("#insurance").val();
		
		mortgage.getMortgage(years,interest,loanAmount,tax,insurance);
	});
}


$(document).ready(bindEvents);

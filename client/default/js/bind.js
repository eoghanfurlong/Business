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
	
	$("#nav_mortgage").bind("click",function(){
		changePage("mortgage");
	});
	
	$("#nav_support").bind("click",function(){
		changePage("zendesk");
	});
	changePage("zendesk");
}


$(document).ready(bindEvents);

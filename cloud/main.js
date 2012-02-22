/**
 * main entry of cloud side
 */




function getMortgage(param){
	return mortgage.getMortgage(param.years,param.interest,param.loanAmount,param.tax,param.insurance);
}


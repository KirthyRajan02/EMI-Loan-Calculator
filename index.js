function validateLoanAmount(){
    var loanAmt = document.getElementById("loanAmtId").value;
    if(isNaN(loanAmt)){
        alert("Loan amount should be a number");
        document.getElementById("loanAmtId").focus(); //
        document.getElementById("loanAmtId").select();
        return false;
    }
    else if(loanAmt > 1500000){
        alert("Loan amount should not be more than 1500000");
        document.getElementById("loanAmtId").focus();
        document.getElementById("loanAmtId").select();
        return false;
    }
}

function validateNumber(elementId, elementName){
    var elementValue = document.getElementById(elementId).value;
    var numbers = /^[0-9]+$/;
    if(!elementValue.match(numbers)){
        alert(elementValue+ " should be a number");
        document.getElementById(elementId).focus();
        document.getElementById(elementId).select();
        return false;
    }
}

function validatePeriod(elementId){
    var period = document.getElementById(elementId).value;
    if(isNaN(period)){
        alert("Period should be a number");
        document.getElementById(elementId).focus(); 
        document.getElementById(elementId).select();
        return false;
    }
    else if((period < 7) || (period > 15)){
        alert("Period should be between 7years to 15years");
        document.getElementById(elementId).focus();
        document.getElementById(elementId).select();
        return false;
    }
}

function calculatePayment(){
    //monthly payment formula = [PxRx(1+R)^N]/[(1+R)^N-1]
    var loanAmount = document.forms["loanForm"].elements["loanAmt"].value;
    var interest = document.forms["loanForm"].elements["interest"].value;
    var period = document.forms["loanForm"].elements["years"].value;

    //convert the interest from percents to decimal
    var monthlyInterest = (interest/100)/12;

    //annual to monthly
    var payments = period*12;

    //math
    var x = Math.pow(1+monthlyInterest, payments);
    var monthly = (loanAmount*x*monthlyInterest)/(x-1);

    //check res and display
    if(!isNaN(monthly) && 
     (monthly != Number.POSITIVE_INFINITY) && 
    (monthly != Number.NEGATIVE_INFINITY)){

        document.forms["loanForm"].elements["monthlyPayment"].value = round(monthly);
        document.forms["loanForm"].elements["totalPayment"].value = round(monthly*payments);
        document.forms["loanForm"].elements["totalInterest"].value = round(monthly*payments - loanAmount);
        //readOnly used for non editable
        document.getElementById["monthlyPaymentId"].readOnly = true;
        document.getElementById["totalPaymentId"].readOnly = true;
        document.getElementById["totalInterestId"].readOnly = true;
    }
    else{
        document.forms["loanForm"].elements["monthlyPayment"].value = "";
        document.forms["loanForm"].elements["totalPayment"].value = "";
        document.forms["loanForm"].elements["totalInterest"].value = "";
    }
}


function round(x){
    return Math.round(x*100)/100;
}


/*
commands 

1. isNaN
2. String => .match
3. Math => .pow
*/
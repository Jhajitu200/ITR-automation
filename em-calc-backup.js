$(document).ready(function(){
    $(function() {
    $("#results").hide();
    $('#loading').show();
     setTimeout(getValues, 500);
    })
    $(".on-change-selector").blur(getValues).keyup(getValues)
          .keypress(getValues)
          .change(getValues);
})
  
function getValues()
{
    //button click gets values from inputs
    var balance = parseFloat($("input[name='amount']").val());
    var interestRate = parseFloat($("input[name='interestRate']").val()/100.0);
    var terms = parseFloat($("input[name='years']").val());
    
    //set the div string
    var div = document.getElementById("amortresult");
    
    //in case of a re-calc, clear out the div!
    div.innerHTML = "";
    
    //validate inputs - display error if invalid, otherwise, display table
    var balVal = validateInputs(balance);
    var intrVal = validateInputs(interestRate);
    var termVal = validateInputs(terms);

    if (termVal && balVal && intrVal)
    {
        terms = terms * 12;
        div.innerHTML += amort(balance, interestRate, terms);

        $("#show-result").show();
        $("#error-message").hide();
    }
    else
    {
        $("#show-result").hide();
        $("#error-message").html("Please Check your inputs and retry - invalid values.").show();
    }
}
    
function amort(balance, interestRate, terms)
{
    //Calculate the per month interest rate
    var monthlyRate = interestRate/12;
    
    var principalAmount = balance;
    var payment = Math.round(balance * (monthlyRate/(1-Math.pow(
        1+monthlyRate, -terms))));
        
    //begin building the return string for the display of the amort table
    var result = "Total paid: " + toIndianCurrency(payment * terms) + "<br /><br />";
    
    var newval = parseInt((terms/12));
    var year = newval <= 1 ? 'Year' : 'Years';

    $("#monthly-emi").html(toIndianCurrency(payment))
    $("#entered-amount").html(toIndianCurrency(balance));
    $("#entered-tenure").html(newval+' '+year);
    $("#entered-interest-rate").html((interestRate*100)+'%');
    var result = '';

    const currentDate = new Date();

    // Get the month and year of the current date
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate the month and year of the next month
    let nextMonth = currentMonth;
    let nextYear = currentYear;

    var heading = 1;
    result += '<table cellpadding="0" cellspacing="0" class="tbl-accordion"><thead><tr><th>Year</th><th>Principal Paid (A)</th><th>Interest Paid (B)</th><th>Total Payment(A+B)</th><th>Outstanding Loan Balance</th></tr></thead>';
    
    result += '<table>';

    result += "<div class='accordion-item'><h2 class='accordion-header' id='flush-heading"+heading+"'><button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse"+heading+"' aria-expanded='false' aria-controls='flush-collapse"+heading+"'>"+nextYear+"</button></h2><div id='flush-collapse"+heading+"' class='accordion-collapse collapse' aria-labelledby='flush-heading"+heading+"' data-bs-parent='#accordionFlushExample'><div class='accordion-body'>";
    result += "<table class='table'><thead class='thead-light'><tr><th>Month</th>" + 
        "<th>Principal Paid (A)</th><th>Interest Paid (B)</th><th>Total Payment(A+B)</th><th>Outstanding Loan Balance</th></tr></thead>";
    var totalInterest = 0;
    for (var count = 0; count < terms; ++count)
    { 
        if (nextMonth > 10) {
            // If the next month is greater than 11 (December), add 1 to the year and set the month to 0 (January)
            nextMonth = 0;
            nextYear += 1;
            result += "</table></div></div></div></div></div></div><div class='accordion-item'><h2 class='accordion-header' id='flush-heading"+heading+"'><button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse"+heading+"' aria-expanded='false' aria-controls='flush-collapse"+heading+"'>"+nextYear+"</button></h2><div id='flush-collapse"+heading+"' class='accordion-collapse collapse' aria-labelledby='flush-heading"+heading+"' data-bs-parent='#accordionFlushExample'><div class='accordion-body'>";
            result += "<table class='table'><thead class='thead-light'><tr><th>Month</th><th>Principal Paid (A)</th><th>Interest Paid (B)</th><th>Total Payment(A+B)</th><th>Outstanding Loan Balance</th></tr></thead>";
            }else{
            nextMonth++;
            }
            
            // Create a new Date object for the first day of the next month
            const nextMonthDate = new Date(nextYear, nextMonth, 1);

        //in-loop interest amount holder
        var interest = 0;
        
        //in-loop monthly principal amount holder
        var monthlyPrincipal = 0;
        
        //start a new table row on each loop iteration
        result += "<tr align=center>";
        
        //display the month number in col 1 using the loop count variable
        result += "<td>" + nextMonthDate.toLocaleString('default', { month: 'long' }) +"</td>";
        
        
        //calc the in-loop interest amount and display
        interest = Math.round(balance * monthlyRate);
        totalInterest += interest;
        
        //calc the in-loop monthly principal and display
        monthlyPrincipal = payment - interest;
        result += "<td>" + toIndianCurrency(monthlyPrincipal) + "</td>";
        result += "<td>" + toIndianCurrency(interest) + "</td>";
        //calc the in-loop monthly total and display
        result += "<td>" + toIndianCurrency((monthlyPrincipal+interest)) + "</td>";

        //update the balance for each loop iteration
        balance = balance - monthlyPrincipal;

        // Stop showing negative values
        balance = balance > 100 ? balance : 0; 
        
        //code for displaying in loop balance
        result += "<td>"+toIndianCurrency(balance) + "</td>";

        //end the table row on each iteration of the loop	
        result += "</tr>";
        heading++;
    }
    var totalAmountToBePaid = principalAmount + totalInterest
    $("#total-principal-amount").html(toIndianCurrency(principalAmount))
    $("#total-interest-amount").html(toIndianCurrency(totalInterest))
    $("#total-amount-to-be-paid").html(toIndianCurrency(totalAmountToBePaid));

    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true,
            type: 'pie'
        },
        colors: ['#6AA9D5', '#1167AF'],
        exporting: {
            enabled: true
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -50,
                    style:{
                        textOutline: false,
                    },
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: '',
            colorByPoint: true,
            data: [{
                name: 'Principal Loan Amount '+toIndianCurrency(principalAmount),
                y: principalAmount,
                sliced: true,
                selected: true
            },  {
                name: 'Total Interest '+toIndianCurrency(totalInterest),
                y: totalInterest
            }]
        }]
    });
    
    
    //returns the concatenated string to the page
    return result;
}
    
function validateInputs(value)
{
    //some code here to validate inputs
    if ((value == null) || (value == ""))
    {
        return false;
    }
    else
    {
        return true;
    }
}

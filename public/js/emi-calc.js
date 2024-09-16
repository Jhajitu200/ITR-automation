$(document).ready(function(){
    $(function() {
    $("#results").hide();
    $('#loading').show();
     
    setTimeout(getValues, 500);

     $('.tbl-accordion-nested').each(function(){
            var thead = $(this).find('thead');
            var tbody = $(this).find('tbody');
            tbody.hide();
            thead.click(function(){
                tbody. slideToggle();
            })
        });
    })
    $(".on-change-selector").blur(getValues).keyup(getValues)
          .keypress(getValues)
          .change(getValues);    

    // Get the slider and the textbox elements
    var slider = document.getElementById("slider");
    var textbox = document.getElementById("editableAmount");

    // Add an event listener to the textbox
    textbox.addEventListener("input", function() {
        // Get the value of the textbox
        var value = $("#editableAmount").text();
        value = value.replace(',','').replace(',','');
        value = value.replace('₹','');
        console.log(value);
        $("#slider").val(parseInt(value));
        $("#slider").trigger("change");
        applyFill(slider);  
    });

    var sliderRate = document.getElementById("sliderRate");
    var textboxRate = document.getElementById("editableRate");
    textboxRate.addEventListener("input", function() {
            // Get the value of the textbox
            var value = $("#editableRate").text();
            value = value.replace('%','');
            // value = value.replace('₹','');
            $("#sliderRate").val(parseInt(value));
            $("#sliderRate").trigger("change"); 
            applyFill(sliderRate);  
        });

    var sliderTenure = document.getElementById("sliderTenure");
    var textboxTenure = document.getElementById("editableTenure");
    textboxTenure.addEventListener("input", function() {
        // Get the value of the textbox
        var value = $("#editableTenure").text();
        value = value.replace('Years','');
        // value = value.replace('₹','');
        $("#sliderTenure").val(parseInt(value));
        $("#sliderTenure").trigger("change"); 
        applyFill(sliderTenure);  
    });

    const settings={
        fill: 'rgb(99 164 210)',
        background: 'rgb(191 226 255)'
      }
      
      const sliders = document.querySelectorAll('.range-slider');
      
      Array.prototype.forEach.call(sliders,(slider)=>{
        slider.querySelector('input').addEventListener('input', (event)=>{
          
          if(event.target.name=='amount'){
            var newval = parseInt(event.target.value);
            slider.querySelector('span').innerHTML = toIndianCurrency(newval);
          }else if(event.target.name=='interestRate'){
            var newval = parseFloat(event.target.value);
            slider.querySelector('span').innerHTML = newval+'%';
          }else if(event.target.name=='years'){
            var newval = parseInt(event.target.value);
            var year = newval <= 1 ? 'Year' : 'Years';
            slider.querySelector('span').innerHTML = newval+' '+year;
          }
          
          applyFill(event.target);
        });
        applyFill(slider.querySelector('input'));
      });
      
      function applyFill(slider) {
        const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
        const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
        slider.style.background = bg;
      }
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

    result += '<table cellpadding="0" cellspacing="0" class="fold-table"><thead><tr><th width="20%">Year</th><th>Principal Paid (A)</th><th>Interest Paid (B)</th><th>Total Payment(A+B)</th><th>Outstanding Loan Balance</th></tr></thead><tbody>';
    
    var totalInterest = 0;
    var tempTotalPrincipalpaid = 0;
    var tempTotalInterestpaid = 0;
    var tempTotalPayentpaid = 0;
    var tempTotalOustanding = 0;
    var tempResult = '';

    for (var count = 0; count < terms; ++count)
    {
        // Create a new Date object for the first day of the next month
        const nextMonthDate = new Date(nextYear, nextMonth, 1);

        //in-loop interest amount holder
        var interest = 0;
        
        //in-loop monthly principal amount holder
        var monthlyPrincipal = 0;
        
        //start a new table row on each loop iteration
        tempResult += "<tr align=center>";
        
        //display the month number in col 1 using the loop count variable
        tempResult += "<td>" + nextMonthDate.toLocaleString('default', { month: 'long' }) +"</td>";
        
        //calc the in-loop interest amount and display
        interest = Math.round(balance * monthlyRate);
        totalInterest += interest;
        
        //calc the in-loop monthly principal and display
        monthlyPrincipal = payment - interest;
        tempResult += "<td>" + toIndianCurrency(monthlyPrincipal) + "</td>";
        tempTotalPrincipalpaid += monthlyPrincipal;

        tempResult += "<td>" + toIndianCurrency(interest) + "</td>";
        tempTotalInterestpaid += interest;

        //calc the in-loop monthly total and display
        tempResult += "<td>" + toIndianCurrency((monthlyPrincipal+interest)) + "</td>";
        tempTotalPayentpaid += monthlyPrincipal+interest;
        
        //update the balance for each loop iteration
        balance = balance - monthlyPrincipal;

        // Stop showing negative values
        balance = balance > 100 ? balance : 0; 
        
        //code for displaying in loop balance
        tempResult += "<td>"+toIndianCurrency(balance) + "</td>";
        tempTotalOustanding += balance;
        //end the table row on each iteration of the loop	
        tempResult += "</tr>";

        if (nextMonth > 10) {
            // If the next month is greater than 11 (December), add 1 to the year and set the month to 0 (January)
            nextMonth = 0;
            nextYear += 1;
            result += '<tr class="view"><td width="20%">'+nextYear+'</td><td>'+toIndianCurrency(tempTotalPrincipalpaid)+'</td><td>'+toIndianCurrency(tempTotalInterestpaid)+'</td><td>'+toIndianCurrency(tempTotalPayentpaid)+'</td><td>'+toIndianCurrency(balance)+'</td></tr><tr class="fold"><td colspan="5"><table>'+tempResult+'</table></td></tr>';

            tempTotalPrincipalpaid = 0;
            tempTotalInterestpaid = 0;
            tempTotalPayentpaid = 0;
            tempTotalOustanding = 0;
            tempResult = '';
            }else{
                nextMonth++;
            }

            if(count == (terms-1)){
                ++nextYear;
                result += '<tr class="view"><td width="20%">'+nextYear+'</td><td>'+toIndianCurrency(tempTotalPrincipalpaid)+'</td><td>'+toIndianCurrency(tempTotalInterestpaid)+'</td><td>'+toIndianCurrency(tempTotalPayentpaid)+'</td><td>'+toIndianCurrency(balance)+'</td></tr><tr class="fold"><td colspan="5"><table>'+tempResult+'</table></td></tr>';   
            }
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
        colors: ['#bfe2ff', '#1167AF'],
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
function calculateTotalIncom(){

  var age = $('input[name="inlineRadioOptions"]:checked').val();
  var whereDoYouReside = $("#whereDoYouReside").find(":selected").val();
  var basicSalary = 0;
  var dA = parseInt(0);
  var hRA = 0;
  var otherPerquisites = 0;
  var interestIncome = 0;
  var otherIncome = 0;

    if($("#basicSalary").val()!=''){
      basicSalary = parseInt($("#basicSalary").val());
    }
    if($("#hRA").val()!=''){
      hRA = parseInt($("#hRA").val());
    }
    if($("#otherPerquisites").val()!=''){
      otherPerquisites = $("#otherPerquisites").val();
    }
    if($("#interestIncome").val()!=''){
      interestIncome = parseInt($("#interestIncome").val());
    }
    if($("#otherIncome").val()!=''){
      otherIncome = parseInt($("#otherIncome").val());
    }

    var financialYear = $("#financialYear").find(":selected").val();
    var inputRentPaidPerAnnum = $("#inputRentPaidPerAnnum").val(); 
    var grossSalary = parseInt(parseInt(basicSalary)+parseInt(dA)+parseInt(hRA)+parseInt(otherPerquisites));

    /* Less: Exemption for HRA */

    // Rent paid over 10% of basic
    var rentPaidVal = Math.max(parseInt(inputRentPaidPerAnnum)-parseInt(10*((parseInt(dA)+parseInt(basicSalary))/100)),0)

    // 50%/40% of Salary
    var percentageSalary = 0;
    if(whereDoYouReside=='Yes'){
      percentageSalary = parseInt(((parseInt(basicSalary) + parseInt(dA))/100)*50);
    }else{
      percentageSalary = parseInt(((parseInt(basicSalary) + parseInt(dA))/100)*40);
    }
    var oldRegPercentageSalaryMinVal = Math.min(hRA,rentPaidVal,percentageSalary);                 
    var newRegPercentageSalaryMinVal = Math.min(hRA,rentPaidVal,percentageSalary,0);

    // Gross Taxable Income (B)
    var oldRegGTI = grossSalary - oldRegPercentageSalaryMinVal;
    var newRegGTI = grossSalary - newRegPercentageSalaryMinVal;

    // less: Standard Deduction
    var oldRegStandardDeduction = grossSalary < 50000 ? grossSalary : parseInt(50000);
    var newRegStandardDeduction = parseInt(0);
    
    if(financialYear == '2023-24'){
      newRegStandardDeduction = grossSalary < 50000 ? grossSalary : parseInt(50000);
    }else{
      newRegStandardDeduction = parseInt(0);
    }

    // Net Salary
    var oldRegNetSalary = parseInt(oldRegGTI-oldRegStandardDeduction);
    var newRegNetSalary = parseInt(newRegGTI-newRegStandardDeduction);

    // Total Income
    var oldRegTotalIncome = parseInt(parseInt(oldRegNetSalary)+parseInt(interestIncome)+parseInt(otherIncome));
    var newRegTotalIncome = parseInt(parseInt(newRegNetSalary)+parseInt(interestIncome)+parseInt(otherIncome));


    // Deductions under chapter via:
    var eightyC = 0; 
    var eightyCCD = 0;
    var eightyD1 = 0;
    var eightyD2 = 0;
    var eightyD3 = 0;
    var eightyTTAA = 0;
    var eightyG = 0;
    var homeLoanInterest = 0;
    if($("#eightyC").val()!=''){
      eightyC = parseInt($("#eightyC").val());  
    }
    if($("#eightyCCD").val()!=''){
      eightyCCD = parseInt($("#eightyCCD").val());
    }
    if($("#eightyD1").val()!=''){
      eightyD1 = parseInt($("#eightyD1").val());
    }
    if($("#eightyD2").val()!=''){
      eightyD2 = parseInt($("#eightyD2").val());
    }
    if($("#eightyD3").val()!=''){
      eightyD3 = parseInt($("#eightyD3").val());
    }
    if($("#eightyTTAA").val()!=''){
      eightyTTAA = parseInt($("#eightyTTAA").val());
    }
    if($("#eightyG").val()!=''){
      eightyG = parseInt($("#eightyG").val());
    }
    if($("#homeLoanInterest").val()!=''){
      homeLoanInterest = parseInt($("#homeLoanInterest").val());
    }
    
    var oldRegEightyC = Math.min(eightyC,parseInt(150000));
    var oldRegEightyCCD = Math.min(eightyCCD,parseInt(50000));
    var oldRegEightyD1 = Math.min(eightyD1,parseInt(50000));
    var oldRegEightyD2 = 0
    if(age == 1 ){
      oldRegEightyD2 = Math.min(parseInt(eightyD2+eightyD3),25000);
    }else{ 
      oldRegEightyD2 = Math.min(parseInt(eightyD2+eightyD3),50000);
    }

    var oldRegEightyD3 = 0;
    var oldRegEightyTTAA  = 0;
    if(age == 1){
      oldRegEightyTTAA = Math.min(interestIncome,parseInt(10000));
    }else{
      oldRegEightyTTAA = Math.min(interestIncome,parseInt(50000));
    }
    var oldRegEightyG = Math.min(eightyG,parseInt(0));
    var oldReghomeLoanInterest = Math.min(homeLoanInterest,parseInt(200000));
    
    // Total Deductions (C)
    var totalDeduction = parseInt(eightyC+eightyCCD+eightyD1+eightyD2+eightyD3+eightyG+homeLoanInterest);
    var totalDeductionOldReg = parseInt(oldRegEightyC+oldRegEightyCCD+oldRegEightyD1+oldRegEightyD2+oldRegEightyD3+oldRegEightyTTAA+oldRegEightyG+oldReghomeLoanInterest);
    var totalDeductionNewReg = 0;

    // Net Total Income (B-C)
    var oldRegNetTotalIncome = parseInt(oldRegTotalIncome-totalDeductionOldReg);
    var newRegNetTotalIncome = parseInt(newRegTotalIncome-totalDeductionNewReg);

    // Tax Amount
    var taxAmountOldReg = 0
        
    if( age == 1){
      taxAmountOldReg = Math.round(oldRegNetTotalIncome <= 250000 ? 0 : ((oldRegNetTotalIncome>250000&&oldRegNetTotalIncome<=500000) ? ((oldRegNetTotalIncome-250000)/100)*5:((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000) ? 12500+((oldRegNetTotalIncome-500000)/100)*20:112500+(((oldRegNetTotalIncome-1000000)/100)*30))))
    }else if(age == 2){
      taxAmountOldReg = Math.round(oldRegNetTotalIncome <= 300000?0:((oldRegNetTotalIncome>300000&&oldRegNetTotalIncome<=500000)?((oldRegNetTotalIncome-300000)/100)*5:((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000)?10000+((oldRegNetTotalIncome-500000)/100)*20:110000+(((oldRegNetTotalIncome-1000000)/100)*30))))
    }else if(age == 3){
      taxAmountOldReg = Math.round(oldRegNetTotalIncome<=500000?0:((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000)?((oldRegNetTotalIncome-500000)/100)*20:100000+((oldRegNetTotalIncome-1000000)/100)*30))
    }

    var taxAmountNewReg = 0;
    if(financialYear==="2022-23"||financialYear=="2020-21"||financialYear=="2021-22"){
      if(newRegNetTotalIncome<=250000){
        taxAmountNewReg = 0; 
      }else if(newRegNetTotalIncome>250000&&newRegNetTotalIncome<=500000){
        taxAmountNewReg = Math.round(((newRegNetTotalIncome-250000)/100)*5); 
      }else if(newRegNetTotalIncome>500000&&newRegNetTotalIncome<=750000){
        taxAmountNewReg = Math.round(12500+((newRegNetTotalIncome-500000)/100)*10); 
      }else if(newRegNetTotalIncome>750000&&newRegNetTotalIncome<=1000000){
        taxAmountNewReg = Math.round(37500+((newRegNetTotalIncome-750000)/100)*15); 
      }else if(newRegNetTotalIncome>1000000&&newRegNetTotalIncome<=1250000){
        taxAmountNewReg = Math.round(75000+((newRegNetTotalIncome-1000000)/100)*20); 
      }else if(newRegNetTotalIncome>1250000&&newRegNetTotalIncome<=1500000){
        taxAmountNewReg = Math.round(125000+((newRegNetTotalIncome-1250000)/100)*25);
      }else if(newRegNetTotalIncome>1500000){ 
        taxAmountNewReg = Math.round(187500+((newRegNetTotalIncome-1500000)/100)*30);
      }
    } else if(financialYear=="2023-24"){
      if(newRegNetTotalIncome<=300000){
        taxAmountNewReg = 0;
      }else if(newRegNetTotalIncome>300000&&newRegNetTotalIncome<=600000){
          taxAmountNewReg = Math.round(((newRegNetTotalIncome-300000)/100)*5);
      } else if(newRegNetTotalIncome>600000&&newRegNetTotalIncome<=900000){
        taxAmountNewReg = Math.round(15000+((newRegNetTotalIncome-600000)/100)*10);
      } else if(newRegNetTotalIncome>900000&&newRegNetTotalIncome<=1200000){
        taxAmountNewReg = Math.round(45000+((newRegNetTotalIncome-900000)/100)*15);
      }else if(newRegNetTotalIncome>1200000&&newRegNetTotalIncome<=1500000){
        taxAmountNewReg = Math.round(90000+((newRegNetTotalIncome-1200000)/100)*20);
      }else if(newRegNetTotalIncome>1500000){
        taxAmountNewReg = Math.round(150000+((newRegNetTotalIncome-1500000)/100)*30);
      }
    }else if(financialYear=="2019-20"){
      taxAmountNewReg = 0;
    }

    /* Rebate calculation */
    var rebateOldReg = 0;
    if(oldRegNetTotalIncome<=500000){
      rebateOldReg = taxAmountOldReg
    }
    $("#section87aOldReg").html('<span>'+toIndianCurrency(rebateOldReg)+'</span>');
    var rebateNewReg = 0;
    if((financialYear==="2022-23"||financialYear=="2020-21"||financialYear=="2021-22") &&   newRegNetTotalIncome<=500000){
      rebateNewReg = taxAmountNewReg;
    }else if(financialYear=="2023-24" && newRegNetTotalIncome<=700000 ){
      rebateNewReg = taxAmountNewReg;
    }else if((financialYear=="2022-23"||financialYear=="2020-21"||financialYear=="2021-22")&&newRegNetTotalIncome>500000){ rebateNewReg = 0;
    }else if(financialYear=="2023-24"&&newRegNetTotalIncome>700000){
      rebateNewReg = 0;
    }
    
    /* Net Tax Payable */
    var netTaxPayableOldReg = Math.round(taxAmountOldReg - rebateOldReg);
    var netTaxPayableNewReg = Math.round(taxAmountNewReg - rebateNewReg);

    /* EC/SHEC calculation */
    var ECSHECOldReg = Math.round((netTaxPayableOldReg/100)*4);
    var ECSHECNewReg = Math.round((netTaxPayableNewReg/100)*4);
    

    /* Total tax payable */
    var totalTaxPayableOldReg = Math.round(netTaxPayableOldReg + ECSHECOldReg);    
    var totalTaxPayableNewReg = Math.round(netTaxPayableNewReg + ECSHECNewReg);
    var balanceAmountOldReg = Math.round(oldRegNetTotalIncome - totalTaxPayableOldReg);
    var balanceAmountNewReg = Math.round(newRegNetTotalIncome - totalTaxPayableNewReg);
    
    $("#HraReceived").html('<span>'+toIndianCurrency(parseInt(hRA))+'</span>');
    $("#percentageSalary").html('<span>'+toIndianCurrency(percentageSalary)+'</span>');
    $("#rentPaid").html('<span>'+toIndianCurrency(rentPaidVal)+'</span>');
    $("#percentageSalaryMinVal").html('<span>'+toIndianCurrency(oldRegPercentageSalaryMinVal)+'</span>');
    $("#oldRegTI").html('<span>'+toIndianCurrency(grossSalary)+'</span>');
    $("#newRegTI").html('<span>'+toIndianCurrency(grossSalary)+'</span>');
    $("#oldRegGTI").html('<span><b>'+toIndianCurrency(parseInt(oldRegGTI)+parseInt(interestIncome)+parseInt(otherIncome))+'</b></span>');
    $("#oldRegNetTotalIncome").html('<span>'+toIndianCurrency(oldRegNetTotalIncome)+'</span>');
    $("#oldRegStandardDeduction").html('<span>'+toIndianCurrency(oldRegStandardDeduction)+'</span>');
    $("#newRegGTI").html('<span>'+toIndianCurrency(newRegGTI)+'</span>');
    if(!isNaN(grossSalary)){
      $("#totalIncome").html('<span><b>'+toIndianCurrency(parseInt(grossSalary)+parseInt(interestIncome)+parseInt(otherIncome))+'</b></span>');
    }
    $("#exemptIncome").html('<span><b>'+toIndianCurrency(oldRegPercentageSalaryMinVal)+'</b></span>')
    $("#newRegStandardDeduction").html('<span>'+toIndianCurrency(newRegStandardDeduction)+'</span>');
    $("#newRegNetTotalIncome").html(toIndianCurrency(newRegNetTotalIncome));
    $("#oldRegEightyC").html('<span>'+toIndianCurrency(oldRegEightyC)+'</span>');
    $("#oldRegEightyCCD").html('<span>'+toIndianCurrency(oldRegEightyCCD)+'</span>');
    $("#oldRegEightyD1").html('<span>'+toIndianCurrency(oldRegEightyD1)+'</span>');
    $("#oldRegEightyD2").html('<span>'+toIndianCurrency(oldRegEightyD2)+'</span>');
    $("#oldRegEightyD3").html('<span>'+toIndianCurrency(oldRegEightyD3)+'</span>');
    $("#oldRegEightyTTAA").html('<span>'+toIndianCurrency(oldRegEightyTTAA)+'</span>');
    $("#oldRegEightyG").html('<span>'+toIndianCurrency(oldRegEightyG)+'</span>');
    $("#oldReghomeLoanInterest").html('<span>'+toIndianCurrency(oldReghomeLoanInterest)+'</span>');
    $("#totalDeduction").html('<span>'+toIndianCurrency(totalDeduction)+'</span>');    
    $("#totalDeductionOldReg").html('<span>'+toIndianCurrency(totalDeductionOldReg+oldRegStandardDeduction)+'</span>');
    $("#totalDeductionNewReg").html('<span>'+toIndianCurrency(totalDeductionNewReg+newRegStandardDeduction)+'</span>');
    $("#netTotalIncome1OldReg").html('<span>'+toIndianCurrency(oldRegNetTotalIncome)+'</span>');
    $("#netTotalIncome1NewReg").html('<span>'+toIndianCurrency(newRegNetTotalIncome)+'</span>');
    $("#taxAmountOldReg").html('<span>'+toIndianCurrency(taxAmountOldReg)+'</span>');
    $("#taxAmountNewReg").html('<span>'+toIndianCurrency(taxAmountNewReg)+'</span>');
    $("#section87aNewReg").html('<span>'+toIndianCurrency(rebateNewReg)+'</span>');
    $("#netTaxPayableOldReg").html('<span>'+toIndianCurrency(netTaxPayableOldReg)+'</span>');
    $("#netTaxPayableNewReg").html('<span>'+toIndianCurrency(netTaxPayableNewReg)+'</span>');
    $("#ECSHECOldReg").html('<span>'+toIndianCurrency(ECSHECOldReg)+'</span>');
    $("#ECSHECNewReg").html('<span>'+toIndianCurrency(ECSHECNewReg)+'</span>');
    $("#totalTaxPayableOldReg").html('<span>'+toIndianCurrency(totalTaxPayableOldReg)+'</span>');
    $("#totalTaxPayableNewReg").html('<span>'+toIndianCurrency(totalTaxPayableNewReg)+'</span>');
    $("#old_regime_chart_data").val(oldRegNetTotalIncome+','+totalTaxPayableOldReg+','+balanceAmountOldReg)
    $("#new_regime_chart_data").val(newRegNetTotalIncome+','+totalTaxPayableNewReg+','+balanceAmountNewReg)

    if(totalTaxPayableOldReg < totalTaxPayableNewReg){
      $("#message-to-user").html('<span><b>Recommendation:</b> You should opt for old regime as it will help you save <b>'+toIndianCurrency(Math.round(totalTaxPayableNewReg-totalTaxPayableOldReg))+'</b> in taxes.</span>');
    }else if(totalTaxPayableNewReg < totalTaxPayableOldReg){
      $("#message-to-user").html('<span><b>Recommendation:</b> You should opt for new regime as it will help you save <b>'+toIndianCurrency(Math.round(totalTaxPayableOldReg-totalTaxPayableNewReg))+'</b> in taxes.</span>');
    }else{
      $("#message-to-user").html('<span><b>Recommendation:</b> You can opt for either old or new regime, however, opting old regime would give you the benefit of availing deductions and exemptions for your investments</span>');
    }
}

$(document).ready(function(){
  $(".number-input").on("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
  });

$("#financialYear").change(function(){
  var financialYear = $("#financialYear").find(":selected").val();
  var assessmentYear = '';
  switch(financialYear) {
    case '2019-20':
      assessmentYear = '2020-21';
      break;
    case '2020-21':
      assessmentYear = '2021-22';
      break;
    case '2021-22':
      assessmentYear = '2022-23';
      break;
    case '2022-23':
      assessmentYear = '2023-24';
      break;
    case '2023-24':
      assessmentYear = '2024-25';
      break;
    case '2024-25':
      assessmentYear = '2025-26';
      break;
    default:
      assessmentYear = '';
  }
  $("#assessmentYear").val(assessmentYear);                
})

$(".on-change-selector").blur(calculateTotalIncom).keyup(calculateTotalIncom)
.keypress(calculateTotalIncom)
.change(calculateTotalIncom);
})

$("#tab1click").on('click',function(){

    var financialYear = $("#financialYear").find(":selected").val();
    var whereDoYouReside = $("#whereDoYouReside").find(":selected").val();
    var age = $('input[name="inlineRadioOptions"]:checked').val();
    var inputRentPaidPerAnnum = $("#inputRentPaidPerAnnum").val();
    
    if(financialYear=='Select'){
      alert('Please select Financial year');
      $("#financialYear").focus();
    }else if(age == undefined){
        alert('Please choose your age');
        $("#inlineRadio1").focus();
    }else if(inputRentPaidPerAnnum == ''){
      alert('Please enter Rent paid per annum');
      $("#inputRentPaidPerAnnum").focus();
    }else if(inputRentPaidPerAnnum < 0){
      alert('Please enter valid numeric value');
      $("#inputRentPaidPerAnnum").focus();
    }else if(inputRentPaidPerAnnum > 0 && whereDoYouReside == 'Select'){
      alert('Please select Where do you reside?');
      $("#whereDoYouReside").focus();
    }else{
      $('#tab2').attr('checked', 'checked');
      $('#tab2').prop('checked',true);
    }
})

$("#tab2click").on('click',function(){

    var basicSalary = $("#basicSalary").val();
    var hRA = $("#hRA").val();
    var otherPerquisites = $("#otherPerquisites").val();
    var interestIncome = $("#interestIncome").val();
    var otherIncome = $("#otherIncome").val();

    if(basicSalary == ''){
      alert('Please enter Basic salary (including DA)');
      $("#basicSalary").focus();
    }else if(basicSalary < 0){
      alert('Please enter valid numeric value');
      $("#basicSalary").focus();
    }else if(hRA == ''){
      alert('Please enter HRA');
      $("#hRA").focus();
    }else if(hRA < 0){
      alert('Please enter valid numeric value');
      $("#hRA").focus();
    }
    // else if(otherPerquisites == ''){
    //   alert('Please enter Other perquisites');
    //   $("#otherPerquisites").focus();
    // }else if(otherPerquisites < 0){
    //   alert('Please enter valid numeric value');
    //   $("#otherPerquisites").focus();
    // }
    else if(interestIncome == ''){
      alert('Please enter Interest Income');
      $("#interestIncome").focus();
    }else if(interestIncome < 0){
      alert('Please enter valid numeric value');
      $("#interestIncome").focus();
    }else if(otherIncome == ''){
      alert('Please enter Other Income (if any)');
      $("#otherIncome").focus();
    }else if(otherIncome < 0){
      alert('Please enter valid numeric value');
      $("#otherIncome").focus();
    }else{
      $('#tab3').attr('checked', 'checked');
      $('#tab3').prop('checked',true);
    }                
})

$("#tab2Pclick").on('click',function(){
  $('#tab1').attr('checked', 'checked');
  $('#tab1').prop('checked',true);
});

$("#tab3click").on('click',function(){
  calculateTotalIncom();
  $('#tab4').attr('checked', 'checked');  
  $('#tab4').prop('checked',true);
  var oldRegData = $("#old_regime_chart_data").val();
  var newRegData = $("#new_regime_chart_data").val();
  var oldRegDataArr = oldRegData.split(",");
  var newRegDataArr = newRegData.split(",");
  var formattedOldRegDataArr = oldRegDataArr.map(function (x) { 
    return parseInt(x); 
  });
  var formattedNewRegDataArr = newRegDataArr.map(function (x) { 
    return parseInt(x); 
  });
  

  Highcharts.chart('container', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Income Tax Computation'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['Net Income','Tax Amount','Income left'],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'INR (₹)'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>₹ {point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Old Regime',
          data: formattedOldRegDataArr

      }, {
          name: 'New Regime',
          data: formattedNewRegDataArr

      }]
  });
})

$("#tab3Pclick").on('click',function(){
  $('#tab2').attr('checked', 'checked');
  $('#tab2').prop('checked',true);
});

$("#tab4click").on('click',function(){
  $('#tab1').attr('checked', 'checked');
  $('#tab1').prop('checked',true);
})

$("#tab4Pclick").on('click',function(){
  $('#tab3').attr('checked', 'checked');
  $('#tab3').prop('checked',true);
})
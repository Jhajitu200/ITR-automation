function calculateTotalIncom(){

  var age = $('#age').val();
  var whereDoYouReside = $("#whereDoYouReside").find(":selected").val();
  var financialYear = $("#financialYear").find(":selected").val();
  var inputRentPaidPerAnnum = $("#inputRentPaidPerAnnum").val(); 
  var basicSalary = 0;
  var dA = parseInt(0);
  var hRA = 0;
  var otherPerquisites = 0;
  var interestIncome = 0;
  var otherIncome = 0;
  var grossSalary = 0;
  var salary = 0;

  var numItems = $('.salaryDetails').length;
  if($("#interestIncome").val()!=''){
    interestIncome = parseInt($("#interestIncome").val());
  }
  if($("#otherIncome").val()!=''){
    otherIncome = parseInt($("#otherIncome").val());
  }

  var tempbasicSalary, tempdA, temphRA, tempotherPerquisites, tempGrossSalary = 0;

  for(var inc = 1; inc <= numItems; inc++){

    if($("#basicSalary"+inc).val()!=''){
      tempbasicSalary = parseInt($("#basicSalary"+inc).val());
      salary = salary + tempbasicSalary;
    }
    if($("#dA"+inc).val()!=''){
      tempdA = parseInt($("#dA"+inc).val());
    }
    if($("#hRA"+inc).val()!=''){
      temphRA = parseInt($("#hRA"+inc).val());
    }
    if($("#otherPerquisites"+inc).val()!=''){
      tempotherPerquisites = parseInt($("#otherPerquisites"+inc).val());
      otherPerquisites = otherPerquisites + tempotherPerquisites;
    }
  
    var tempGrossSalary = parseInt(tempbasicSalary+tempdA+temphRA+tempotherPerquisites);
    grossSalary = tempGrossSalary + grossSalary;

    $("#grossSalary"+inc).html(tempGrossSalary);      
    /* Less: Exemption for HRA */

    // Rent paid over 10% of basic
    var rentPaidVal = Math.max(parseInt(inputRentPaidPerAnnum)-parseInt(10*((parseInt(tempdA)+parseInt(tempbasicSalary))/100)),0)

    // 50%/40% of Salary
    var percentageSalary = 0;
    if(whereDoYouReside=='Yes'){
      percentageSalary = parseInt(((parseInt(tempbasicSalary) + parseInt(tempdA))/100)*50);
    }else{
      percentageSalary = parseInt(((parseInt(tempbasicSalary) + parseInt(tempdA))/100)*40);
    }

    var oldRegPercentageSalaryMinVal = Math.min(temphRA,rentPaidVal,percentageSalary);                 
    var newRegPercentageSalaryMinVal = Math.min(temphRA,rentPaidVal,percentageSalary,0);

    // Gross Taxable Income (B)
    var oldRegGTI = tempGrossSalary - oldRegPercentageSalaryMinVal;
    var newRegGTI = tempGrossSalary - newRegPercentageSalaryMinVal;

    $("#exemptIncome"+inc).html('<span><b>'+toIndianCurrency(oldRegPercentageSalaryMinVal)+'</b></span>')
    $("#oldRegGTI"+inc).html('<span><b>'+toIndianCurrency(parseInt(oldRegGTI)+parseInt(interestIncome)+parseInt(otherIncome))+'</b></span>');

    tempbasicSalary, tempdA, temphRA, tempotherPerquisites, tempGrossSalary = 0;
  }

  var grossAnnualValue = parseInt($("#grossAnnualValue").val());
  var municipalTaxes = parseInt($("#municipalTaxes").val());
  var netAnnualValue = parseInt(grossAnnualValue - municipalTaxes);
  $("#netAnnualValue").val(netAnnualValue);
  var savingsBankInterest = parseInt($("#savingsBankInterest").val());
  var fixedDepositInterest = parseInt($("#fixedDepositInterest").val());

  var IncomeOthSrc = parseInt(savingsBankInterest+fixedDepositInterest+otherIncome);

  $("#HraReceived").html('<span>'+toIndianCurrency(parseInt(hRA))+'</span>');
  $("#percentageSalary").html('<span>'+toIndianCurrency(percentageSalary)+'</span>');
  $("#rentPaid").html('<span>'+toIndianCurrency(rentPaidVal)+'</span>');
  $("#percentageSalaryMinVal").html('<span>'+toIndianCurrency(oldRegPercentageSalaryMinVal)+'</span>');
  $("#oldRegTI").html('<span>'+toIndianCurrency(grossSalary)+'</span>');
  $("#newRegTI").html('<span>'+toIndianCurrency(grossSalary)+'</span>');
  

  $("#newRegGTI").html('<span>'+toIndianCurrency(newRegGTI)+'</span>');
  if(!isNaN(grossSalary)){
    $("#totalIncome").html('<span><b>'+toIndianCurrency(parseInt(grossSalary)+parseInt(interestIncome)+parseInt(IncomeOthSrc)+parseInt(grossAnnualValue)+parseInt(netAnnualValue))+'</b></span>');
  }

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
    
    // Net Annual Value
    var oldRegGrossAnnualValue = parseInt(grossAnnualValue);
    var newRegGrossAnnualValue = parseInt(grossAnnualValue);

    var oldRegNetAnnualValue = parseInt(oldRegGrossAnnualValue - municipalTaxes);
    var newRegNetAnnualValue = parseInt(newRegGrossAnnualValue - municipalTaxes);

    //Standard Deduction @ 30% 
    var oldRegP30 = 0;
    if(oldRegNetAnnualValue!=0)
    {
      oldRegP30 = parseInt(( oldRegNetAnnualValue / 100) * 30);
    }
    var newRegP30 = 0;

   
    // Interest on borrowed capital 
    var homeLoanInterest = 0;
    if($("#homeLoanInterest").val()!=''){
      homeLoanInterest = parseInt($("#homeLoanInterest").val());
    }
    var property_status = $("#property_status").find(":selected").val();
    var oldReghomeLoanInterest = Math.min(homeLoanInterest,parseInt(200000));
    if(property_status == 'Let-out'){
    var newReghomeLoanInterest = Math.min(homeLoanInterest,parseInt(200000));
    }else{
      var newReghomeLoanInterest = 0;
    }

    // Net Annual Value
    var oldRegNetAnnualValueTotal = parseInt((oldRegP30+oldReghomeLoanInterest) - oldRegNetAnnualValue);
    var newRegNetAnnualValueTotal = parseInt((newRegP30+newReghomeLoanInterest) - newRegNetAnnualValue);
    console.log(newRegP30, newReghomeLoanInterest, newRegNetAnnualValue)
    $("#standardDeductionAt30P").val(oldRegNetAnnualValueTotal);

    // Total Income
    var oldRegTotalIncome = parseInt(parseInt(oldRegNetSalary)+parseInt(otherIncome)+parseInt(savingsBankInterest)+parseInt(fixedDepositInterest)-parseInt(oldRegNetAnnualValueTotal));

    var newRegTotalIncome = parseInt(parseInt(newRegNetSalary)+parseInt(otherIncome)+parseInt(savingsBankInterest)+parseInt(fixedDepositInterest)-parseInt(newRegNetAnnualValueTotal));

    //Income from House Property


    // Deductions under chapter via:
    var eightyC = 0; 
    var eightyCCD = 0;
    var eightyD1 = 0;
    var eightyD2 = 0;
    var eightyD3 = 0;
    var eightyTTAA = 0;
    var eightyTTBB = 0;
    var taForSpeciallyAbled = 0;
    var eightyCCH = 0;
    var eightyE = 0;
    var eightyEEB = 0;
    var eightyG = 0;


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
    if($("#eightyTTBB").val()!=''){
      eightyTTBB = parseInt($("#eightyTTBB").val());
    }
    if($("#taForSpeciallyAbled").val()!=''){
      taForSpeciallyAbled = parseInt($("#taForSpeciallyAbled").val());
    }
    if($("#eightyCCH").val()!=''){
      eightyCCH = parseInt($("#eightyCCH").val());
    }
    if($("#eightyE").val()!=''){
      eightyE = parseInt($("#eightyE").val());
    }
    if($("#eightyEEB").val()!=''){
      eightyEEB = parseInt($("#eightyEEB").val());
    }
    if($("#eightyG").val()!=''){
      eightyG = parseInt($("#eightyG").val());
    }

    
    var oldRegEightyC = Math.min(eightyC,parseInt(150000));
    var oldRegEightyCCD = Math.min(eightyCCD,parseInt(50000));
    var newRegEightyCCD = Math.min(oldRegEightyCCD,parseInt(50000));

    var oldRegEightyD1 = Math.min(eightyD1,parseInt(50000));
    var oldRegEightyD2 = 0
    if(age < 60 ){
      oldRegEightyD2 = Math.min(parseInt(eightyD2+eightyD3),25000);
    }else{ 
      oldRegEightyD2 = Math.min(parseInt(eightyD2+eightyD3),50000);
    }

    var oldRegEightyD3 = Math.min(parseInt(eightyD3),5000);
    var oldRegEightyTTAA  = Math.min(parseInt(eightyTTAA),10000);
    var oldRegEightyTTBB = age < 60 ? 0 : Math.min(eightyTTBB,parseInt(50000));
    var oldRegEightyG = Math.min(eightyG,parseInt(0));
   
    
    // Other Deductions
    var oldRegTaForSpeciallyAbled = taForSpeciallyAbled;
    var oldRegEightyCCH = eightyCCH;
    var oldRegEightyE = eightyE;
    var oldRegEightyEEB = eightyEEB;

    var newRegTaForSpeciallyAbled = taForSpeciallyAbled;
    var newRegEightyCCH = eightyCCH;
    var newRegEightyE = eightyE;
    var newRegEightyEEB = eightyEEB;
    var newRegEightyG = eightyG;

    // Total Deductions (C)
    var totalDeduction = parseInt(eightyC+eightyCCD+eightyD1+eightyD2+eightyD3+eightyTTBB+eightyG+eightyE+eightyTTAA+eightyEEB+eightyCCH+taForSpeciallyAbled+homeLoanInterest);

    var totalDeductionOldReg = parseInt(oldRegEightyC+oldRegEightyCCD+oldRegEightyD1+oldRegEightyD2+oldRegEightyD3+oldRegEightyTTAA+oldRegEightyTTBB+taForSpeciallyAbled+eightyCCH+eightyE+eightyEEB+oldRegEightyG);
    var totalDeductionNewReg = parseInt(newRegEightyCCD);

    // Net Total Income (B-C)
    var oldRegNetTotalIncome = parseInt(oldRegTotalIncome-totalDeductionOldReg);
    var newRegNetTotalIncome = parseInt(newRegTotalIncome-totalDeductionNewReg);

    // Tax Amount
    var taxAmountOldReg = 0
        
    if( age < 60){
      console.log('I am in 1')
        taxAmountOldReg = Math.round((oldRegNetTotalIncome<=250000 ? 0 : ((oldRegNetTotalIncome>250000&&oldRegNetTotalIncome<=500000)?(((oldRegNetTotalIncome-250000) / 100) * 5) : ((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000)?12500+((oldRegNetTotalIncome-500000)/100)*20:112500+(((oldRegNetTotalIncome-1000000)/100)*30)))))
  }else if(age >= 60 && age < 80){
    console.log('I am in 2')
      taxAmountOldReg = Math.round(oldRegNetTotalIncome <= 300000 ? 0 : ((oldRegNetTotalIncome > 300000 && oldRegNetTotalIncome <= 500000) ? ((oldRegNetTotalIncome-300000)/100)*5 : ((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000) ? 10000 + ((oldRegNetTotalIncome-500000)/100)*20 : 110000 + (((oldRegNetTotalIncome-1000000)/100)*30))))
  }else if( age>=80 ){
      taxAmountOldReg = Math.round((oldRegNetTotalIncome<=500000?0:((oldRegNetTotalIncome>500000&&oldRegNetTotalIncome<=1000000)?((oldRegNetTotalIncome-500000)/100)*20:100000+(((oldRegNetTotalIncome-1000000)/100)*30))))
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
    if(oldRegNetTotalIncome <= 500000){
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
    

    $("#oldRegNetTotalIncome").html('<span>'+toIndianCurrency(oldRegNetTotalIncome)+'</span>');
    $("#oldRegStandardDeduction").html('<span>'+toIndianCurrency(oldRegStandardDeduction)+'</span>');
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
    $("#totalDeductionOldReg").html('<span>'+toIndianCurrency(totalDeductionOldReg)+'</span>');
    $("#totalDeductionNewReg").html('<span>'+toIndianCurrency(totalDeductionNewReg)+'</span>');
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


     // Code for field manipulatio   starts
     let assessmentYear = $('#assessmentYear').val();
     let fullName = $('#name_in_pan').val();
     let nameParts = fullName.split(' ');
     let firstName = '';
     let middleName = '';
     let lastName = '';

     if (nameParts.length === 1) {
         firstName = nameParts[0];
     } else if (nameParts.length === 2) {
         firstName = nameParts[0];
         lastName = nameParts[1];
     } else if (nameParts.length > 2) {
         firstName = nameParts[0];
         lastName = nameParts[nameParts.length - 1];
         middleName = nameParts.slice(1, nameParts.length - 1).join(' ');
     }

     if (assessmentYear.includes('-')) {
         let years = assessmentYear.split('-');
         let secondYear = parseInt(years[1]);
         assessmentYear = (secondYear + 2).toString();
     }

     let dataString1 = sessionStorage.getItem('oldRegime');
     let dataString2 = sessionStorage.getItem('newRegime');
     const oldRegime = JSON.parse(dataString1);
     const newRegime = JSON.parse(dataString2);


     // Old tax regime data
     oldRegime.ITR.ITR1.CreationInfo.JSONCreationDate = new Date('YYYY-M-D');

     oldRegime.ITR.ITR1.Form_ITR1.AssessmentYear = assessmentYear;

     oldRegime.ITR.ITR1.PersonalInfo.AssesseeName.FirstName = firstName;
     oldRegime.ITR.ITR1.PersonalInfo.AssesseeName.MiddleName = middleName;
     oldRegime.ITR.ITR1.PersonalInfo.AssesseeName.SurNameOrOrgName = lastName;
     
     oldRegime.ITR.ITR1.PersonalInfo.PAN = $('#pan').val();
     
     oldRegime.ITR.ITR1.PersonalInfo.Address.ResidenceNo = $('#residenceNo').val();
     oldRegime.ITR.ITR1.PersonalInfo.Address.LocalityOrArea = $('#localityOrArea').val();
     oldRegime.ITR.ITR1.PersonalInfo.Address.CityOrTownOrDistrict = $('#cityOrTownOrDistrict').val();
     oldRegime.ITR.ITR1.PersonalInfo.Address.StateCode = $('#stateCode').val();
     oldRegime.ITR.ITR1.PersonalInfo.Address.PinCode = $('#pinCode').val();     
     oldRegime.ITR.ITR1.PersonalInfo.Address.EmailAddress = $('#email_id').val();
     oldRegime.ITR.ITR1.PersonalInfo.Address.MobileNo = $('#mobile').val();
     
     oldRegime.ITR.ITR1.PersonalInfo.DOB = $('#dOB').val();

     oldRegime.ITR.ITR1.PersonalInfo.AadhaarCardNo = $('#aadhar').val(); 

     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossSalary = grossSalary;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.Salary = salary;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.PerquisitesValue = otherPerquisites;

     //oldRegime.ITR.ITR1.ITR1_IncomeDeductions.ProfitsInSalary = 0;
    //  oldRegime.ITR.ITR1.ITR1_IncomeDeductions.AllwncExemptUs10.TotalAllwncExemptUs10 = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.NetSalary = oldRegNetSalary;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs16 = oldRegStandardDeduction;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs16ia = oldRegStandardDeduction;
    //  oldRegime.ITR.ITR1.ITR1_IncomeDeductions.EntertainmentAlw16ii = 0;
    //  oldRegime.ITR.ITR1.ITR1_IncomeDeductions.ProfessionalTaxUs16iii = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeFromSal = grossSalary;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossRentReceived = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.TaxPaidlocalAuth = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.AnnualValue = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.StandardDeduction = oldRegStandardDeduction;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.InterestPayable = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.ArrearsUnrealizedRentRcvd = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.TotalIncomeOfHP = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeOthSrc = IncomeOthSrc;
     
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs57iia = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossTotIncome = 532650;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80C = oldRegEightyC;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCC = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployeeOrSE = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCD1B = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployer = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80D = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DD = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DDB = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80E = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EE = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEA = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEB = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80G = oldRegEightyG;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GG = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGA = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGC = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80U = 0;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTA = oldRegEightyTTAA;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTB = oldRegEightyTTBB;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.TotalChapVIADeductions = totalDeductionOldReg;
    oldRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.AnyOthSec80CCH = 0

     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80C = oldRegEightyC;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCC = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployeeOrSE = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCD1B = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployer = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80D = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DD = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DDB = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80E = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EE = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEA = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEB = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80G = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GG = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGA = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGC = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80U = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTA = oldRegEightyTTAA;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTB = oldRegEightyTTBB;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.TotalChapVIADeductions = totalDeductionOldReg;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.AnyOthSec80CCH = 0

     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.TotalIncome = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.ExemptIncAgriOthUs10.ExemptIncAgriOthUs10Total = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeNotified89A = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeNotifiedOther89A = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.Increliefus89A = 0;
     oldRegime.ITR.ITR1.ITR1_IncomeDeductions.Increliefus89AOS = 0;
     
     oldRegime.ITR.ITR1.ITR1_TaxComputation.TotalTaxPayable = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.Rebate87A = rebateOldReg;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.TaxPayableOnRebate = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.EducationCess = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.GrossTaxLiability = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.Section89 = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.NetTaxLiability = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.TotalIntrstPay = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234A = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234B = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234C = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.LateFilingFee234F = 0;
     oldRegime.ITR.ITR1.ITR1_TaxComputation.TotTaxPlusIntrstPay = 0;

     oldRegime.ITR.ITR1.TaxPaid.TaxesPaid.AdvanceTax = 0;
     oldRegime.ITR.ITR1.TaxPaid.TaxesPaid.TDS = totalTaxPayableOldReg;
     oldRegime.ITR.ITR1.TaxPaid.TaxesPaid.TCS = 0;
     oldRegime.ITR.ITR1.TaxPaid.TaxesPaid.SelfAssessmentTax = 0;
     oldRegime.ITR.ITR1.TaxPaid.TaxesPaid.TotalTaxesPaid = totalTaxPayableOldReg;
     oldRegime.ITR.ITR1.TaxPaid.BalTaxPayable = 0

     oldRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80GCash = 0;
     oldRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80GOtherMode = 0;
     oldRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80G = 0;
     oldRegime.ITR.ITR1.Schedule80G.TotalEligibleDonationsUs80G = 0

     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SeniorCitizenFlag = "S";
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SelfAndFamily = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.HealthInsPremSlfFam = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MediclaimPolNoSelfAndFam = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SeniorCitizenHealthFlag = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MedicalExpSeniorCitizenSelfAndFamily = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Total80DSelfAndFamily = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.ParentsSeniorCitizenFlag = "S";
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Parents = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.HealthInsPremParents = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MediclaimPolNoParents = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MedicalExpSeniorCitizenParents = 0;
     oldRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Total80DParents = 0
     oldRegime.ITR.ITR1.Schedule80D.Total80D = 0

     //New tax regime data

     newRegime.ITR.ITR1.CreationInfo.JSONCreationDate =  new Date('YYYY-M-D');
    //  newRegime.ITR.ITR1.CreationInfo.IntermediaryCity = JAIPUR;
    //  newRegime.ITR.ITR1.CreationInfo.Digest = "JdfGW3quO9VVa6O5qSNCOBV4eqG6Hc70ZBtZO3Tnnnc="
     newRegime.ITR.ITR1.Form_ITR1.FormName = "ITR-1";
     newRegime.ITR.ITR1.Form_ITR1.Description = "For Indls having Income from Salary, Pension, family pension and Interest";
     newRegime.ITR.ITR1.Form_ITR1.AssessmentYear = assessmentYear;
     newRegime.ITR.ITR1.Form_ITR1.SchemaVer = "Ver1.0";
     newRegime.ITR.ITR1.Form_ITR1.FormVer = "Ver1.0";

     newRegime.ITR.ITR1.PersonalInfo.AssesseeName.FirstName = firstName;
     newRegime.ITR.ITR1.PersonalInfo.AssesseeName.MiddleName = middleName;
     newRegime.ITR.ITR1.PersonalInfo.AssesseeName.SurNameOrOrgName = lastName;
     newRegime.ITR.ITR1.PersonalInfo.PAN = pan;
     newRegime.ITR.ITR1.PersonalInfo.Address.ResidenceNo = $('#residenceNo').val();
     newRegime.ITR.ITR1.PersonalInfo.Address.LocalityOrArea = $('#localityOrArea').val();
     newRegime.ITR.ITR1.PersonalInfo.Address.CityOrTownOrDistrict = $('#cityOrTownOrDistrict').val();
     newRegime.ITR.ITR1.PersonalInfo.Address.StateCode = $('#stateCode').val();
    //  newRegime.ITR.ITR1.PersonalInfo.Address.CountryCode = 91;
     newRegime.ITR.ITR1.PersonalInfo.Address.PinCode = $('#pinCode').val();
    //  newRegime.ITR.ITR1.PersonalInfo.Address.CountryCodeMobile": 91,
     newRegime.ITR.ITR1.PersonalInfo.Address.MobileNo = $('#mobile').val();
     newRegime.ITR.ITR1.PersonalInfo.Address.EmailAddress  = $('#email_id').val();
     newRegime.ITR.ITR1.PersonalInfo.DOB = $('#dOB').val();
    //  newRegime.ITR.ITR1.PersonalInfo.EmployerCategory = OTH;
     newRegime.ITR.ITR1.PersonalInfo.AadhaarCardNo = $('#aadhar').val();


    //  newRegime.ITR.ITR1.FilingStatus.ReturnFileSec": 11,
    //  newRegime.ITR.ITR1.FilingStatus.SeventhProvisio139 = N;
    //  newRegime.ITR.ITR1.FilingStatus.NewTaxRegime = N"

     newRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossSalary = grossSalary;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.Salary = salary;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.PerquisitesValue = otherPerquisites;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.ProfitsInSalary": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.AllwncExemptUs10.TotalAllwncExemptUs10": 0
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.NetSalary = newRegNetSalary;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs16 = newRegStandardDeduction;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs16ia = oldRegStandardDeduction;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.EntertainmentAlw16ii": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.ProfessionalTaxUs16iii": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeFromSal = grossSalary;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossRentReceived": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.TaxPaidlocalAuth": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.AnnualValue": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.StandardDeduction = oldRegStandardDeduction;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.InterestPayable": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.ArrearsUnrealizedRentRcvd": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.TotalIncomeOfHP": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeOthSrc = IncomeOthSrc;
      //  "ITR1_IncomeDeductions.OthersInc": {
      //    "OthersIncDtlsOthSrc": [
      //      {
      //        "OthSrcNatureDesc = SAV;
      //        "OthSrcOthNatOfInc = Interest from Saving Account;
      //        "OthSrcOthAmount": 487
      //      }
      //    ]
      //  },
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductionUs57iia": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.GrossTotIncome": 532650,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80C = newRegEightyC;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCC": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployeeOrSE": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCD1B": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80CCDEmployer": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80D": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DD": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80DDB": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80E": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EE": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEA": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80EEB": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80G = newRegEightyG;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GG": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGA": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80GGC": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80U": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTA = newRegEightyTTAA;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.Section80TTB = newRegEightyTTBB;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.TotalChapVIADeductions = totalDeductionNewReg;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.UsrDeductUndChapVIA.AnyOthSec80CCH": 0
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80C = oldRegEightyC;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCC": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployeeOrSE": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCD1B": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80CCDEmployer": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80D": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DD": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80DDB": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80E": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EE": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEA": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80EEB": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80G": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GG": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGA": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80GGC": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80U": 0,
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTA = oldRegEightyTTAA;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.Section80TTB = oldRegEightyTTBB;
     newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.TotalChapVIADeductions = totalDeductionOldReg;
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.DeductUndChapVIA.AnyOthSec80CCH": 0
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.TotalIncome": 464840,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.ExemptIncAgriOthUs10.ExemptIncAgriOthUs10Total": 0
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeNotified89A": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.IncomeNotifiedOther89A": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.Increliefus89A": 0,
    //  newRegime.ITR.ITR1.ITR1_IncomeDeductions.Increliefus89AOS": 0
     
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.TotalTaxPayable": 10742,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.Rebate87A": 10742,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.TaxPayableOnRebate": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.EducationCess": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.GrossTaxLiability": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.Section89": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.NetTaxLiability": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.TotalIntrstPay": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234A": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234B": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.IntrstPayUs234C": 0,
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.IntrstPay.LateFilingFee234F": 0
    //  newRegime.ITR.ITR1.ITR1_TaxComputation.TotTaxPlusIntrstPay": 0
    //  newRegime.ITR.ITR1.TaxPaid.TaxesPaid.AdvanceTax": 0,
     newRegime.ITR.ITR1.TaxPaid.TaxesPaid.TDS = totalTaxPayableOldReg;
    //  newRegime.ITR.ITR1.TaxPaid.TaxesPaid.TCS": 0,
    //  newRegime.ITR.ITR1.TaxPaid.TaxesPaid.SelfAssessmentTax": 0,
     newRegime.ITR.ITR1.TaxPaid.TaxesPaid.TotalTaxesPaid = totalTaxPayableOldReg;
    //  newRegime.ITR.ITR1.BalTaxPayable": 0
     
    //  "Refund": {
    //    "RefundDue": 25000,
    //    "BankAccountDtls": {
    //      "AddtnlBankDetails": [
    //        {
    //          "IFSCCode = KKBK0000298;
    //          "BankName = KOTAK MAHINDRA BANK LIMITED;
    //          "BankAccountNo = 684010020794;
    //          "UseForRefund = true"
    //        }
    //      ]
    //    }
    //  },


    //  newRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80GCash": 0,
    //  newRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80GOtherMode": 0,
    //  newRegime.ITR.ITR1.Schedule80G.TotalDonationsUs80G": 0,
    //  newRegime.ITR.ITR1.Schedule80G.TotalEligibleDonationsUs80G": 0
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SeniorCitizenFlag = S;
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SelfAndFamily": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.HealthInsPremSlfFam": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MediclaimPolNoSelfAndFam": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.SeniorCitizenHealthFlag": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MedicalExpSeniorCitizenSelfAndFamily": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Total80DSelfAndFamily": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.ParentsSeniorCitizenFlag = S;
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Parents": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.HealthInsPremParents": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MediclaimPolNoParents": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.MedicalExpSeniorCitizenParents": 0,
    //  newRegime.ITR.ITR1.Schedule80D.Sec80DSelfFamSrCtznHealth.Total80DParents": 0
    //  newRegime.ITR.ITR1.Schedule80D.Total80D": 0

     sessionStorage.setItem('newRegime', JSON.stringify(newRegime));
     sessionStorage.setItem('oldRegime', JSON.stringify(oldRegime));

}

function downloadJson() {
  function getSelectedTaxRegime() {
      const radioButtons = document.getElementsByName('tax-regime');
      let selectedValue = "";
      radioButtons.forEach(button => {
          if (button.checked) {
              selectedValue = button.value;
          }
      });
      return selectedValue;
  }

  const selectedRegime = getSelectedTaxRegime();
  let data;
  if (selectedRegime === 'old') {
      data = JSON.stringify(JSON.parse(sessionStorage.getItem('oldRegime')), null, 2);
  } else {
      data = JSON.stringify(JSON.parse(sessionStorage.getItem('newRegime')), null, 2);
  }

  const blob = new Blob([data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedRegime}_regime.json`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

$(document).ready(function(){

  $("#dOB").change(function(){
    var dob = new Date($(this).val());
    var today = new Date();
    var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    $('#age').val(age);
  });


$("#download-btn").click(downloadJson);

  $("#addEmployer").on('click',function(){
    
    var numItems = $('.salaryDetails').length + 1;
    
    var empSection = `<div class="row salaryDetails" data-id="${numItems}" id="employer${numItems}">
    <div class="col-md-12"><h6><b>Salary Details</b></h6></div>
    <div class="col-md-6">
      <div class="form-group row">
        <label for="basicSalary" class="col-sm-7 col-form-label">
          Basic salary</label>
        <div class="col-sm-5  d-flex mh-40">
          <span class="currency-symbol">₹</span>
          <input type="number" class="form-control on-change-selector text-right-align input-bg number-input" id="basicSalary${numItems}" value="0">
        </div>
      </div>
      <div class="form-group row">
        <label for="hRA" class="col-sm-7 col-form-label">HRA</label>
        <div class="col-sm-5  d-flex mh-40">
          <span class="currency-symbol">₹</span>
          <input type="number" class="form-control on-change-selector text-right-align input-bg number-input" id="hRA${numItems}" value="0">
        </div>
      </div>
      <div class="form-group row">
        <label for="otherIncome" class="col-sm-7 col-form-label"><b>Gross Salary</b></label>
        <div class="col-sm-5 d-flex flex-row-reverse mh-40">
          <div id="grossSalary${numItems}">0</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="otherIncome" class="col-sm-7 col-form-label"><b>Less: Exemption for HRA</b></label>
        <div class="col-sm-5 d-flex flex-row-reverse mh-40">
          <div id="exemptIncome${numItems}">0</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="otherIncome" class="col-sm-7 col-form-label"><b>Gross Taxable Income (B) </b></label>
        <div class="col-sm-5 d-flex flex-row-reverse mh-40">
          <div id="oldRegGTI${numItems}">0</div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group row">
        <label for="dA" class="col-sm-7 col-form-label">DA</label>
        <div class="col-sm-5  d-flex mh-40">
          <span class="currency-symbol">₹</span>
          <input type="number" class="form-control on-change-selector text-right-align input-bg" id="dA${numItems}" value="0">
        </div>
      </div>
      <div class="form-group row">
        <label for="otherPerquisites" class="col-sm-7 col-form-label">Other perquisites</label>
        <div class="col-sm-5  d-flex mh-40">
          <span class="currency-symbol">₹</span>
          <input type="number" class="form-control on-change-selector text-right-align input-bg number-input" id="otherPerquisites${numItems}" value="0">
        </div>
      </div>
    </div>
  </div>`;

    $( empSection ).appendTo( "#employers" );
  })

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

  $("#employers").on('blur, keyup, keypress, change',".on-change-selector",function(){
    calculateTotalIncom();
  });

  $("#tab1click").on('click',function(){

      var financialYear = $("#financialYear").find(":selected").val();
      var whereDoYouReside = $("#whereDoYouReside").find(":selected").val();
      var age = $('#age').val();
      var inputRentPaidPerAnnum = $("#inputRentPaidPerAnnum").val();
      
      if(financialYear=='Select'){
        alert('Please select Financial year');
        $("#financialYear").focus();
      }else if(age == ''){
          alert('Please enter your age');
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

  $("#data").click(function () { 
    $("<a />", {
      "download": "data.json",
      "href" : "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify($(this).data().obj)),
    }).appendTo("body")
    .click(function() {
       $(this).remove()
    })[0].click()
  });

})
let newDeductions = 0;

function saveState(button) {
    // let interestOnHomeLoanSelfOccupiedVacant=0;
    // let interestOnHomeLoanLetOut=0
    let section80c80cc80ccd1=0;
    let section80ccd1b=0;
    let section80ccd2=0;
    let section80tta=0;
    let section80ttb=0;
    let section80e=0;
    let  section80ee=0;
    let section80eea=0;
    let section80eeb=0;
    let section80dSelfFamilyChildren=0;
    let sumOfDeductions=0;
    let userData=JSON.parse(sessionStorage.getItem('userData'));
    userData.newTaxRegime.TotalDeductions=0;
    console.log("this is before userData.newTaxRegime.TotalDeductions",userData.newTaxRegime.TotalDeductions)
    // userData.newTaxRegime.TotalDeductions=50000;
    for (let i = 0; i < newDeductions; i++) {
        $(`#deduction-${i}`).each(function () {
            let deductionName = $(this).find('.deductionName').val();
            console.log(deductionName);
            let deductionValue = parseFloat($(this).find('.deductionValue').val());
            sessionStorage.setItem(`deductionName${i}`, deductionName);
            sessionStorage.setItem(`deductionValue${i}`, deductionValue);
            if(deductionName == '80CCC - Payment in respect pension Fund'){
                // section80c80cc80ccd1+=deductionValue; 
                section80c80cc80ccd1+=checkDynamicValidInput(deductionValue);
            }
            else if(deductionName == '80CCD(1) - Contribution to pension scheme of Central Government'){
                section80c80cc80ccd1+= checkDynamicValidInput(deductionValue);
            }else if(deductionName == '80CCD(1B) - Contribution to pension scheme of Central Government'){
                section80ccd1b+=checkDynamicValidInput(deductionValue); 
            }else if(deductionName=='80EE - Interest on loan taken for residential house property'){
                section80ee+=checkDynamicValidInput(deductionValue);
                if(section80ee!=0){
                    if(section80ee>50000){
                        section80ee=50000;
                        sumOfDeductions+=section80ee;
                    }else{
                        sumOfDeductions+=section80ee;
                    }
                }
            }else if(deductionName=='80EEA - Deduction in respect of interest on loan taken for certain house'){

                section80eea+=checkDynamicValidInput(deductionValue);
                if(section80eea!=0){
                    if(section80eea>150000){
                        section80eea=150000;
                        sumOfDeductions+=section80eea;
                    }else{
                        sumOfDeductions+=section80eea;
                    }
                    console.log("hello i am in section 80eea",section80eea);
                }
            }else if(deductionName=='80EEB - Deduction in respect of purchase of electric vehicle'){
                section80eeb+=checkDynamicValidInput(deductionValue);
                if(section80eeb!=0){
                    if(section80eeb>150000){
                        section80eeb=150000;
                        sumOfDeductions+=section80eeb
                    }else{
                        sumOfDeductions+=section80eeb;
                    }
                }
            }
            function checkDynamicValidInput(deductionValue){
            if(!isNaN(deductionValue)){
               return deductionValue; 
            }else{
                return 0;
            }
        }
        });
        
    }
    function checkValidInput(id) {
        let value = parseFloat(document.getElementById(id).value);
        if (!isNaN(value)) {
            return value;
        }
        return 0;
    }
    section80c80cc80ccd1 += checkValidInput('80-c-LIC');
    section80ccd2 +=  checkValidInput('80CCD2-NPS');
    section80tta+=checkValidInput('80TTA');
    section80ttb+=checkValidInput('80TTB');
    section80e=checkValidInput('80E');
    section80ee=checkValidInput('80E');
    section80ee=checkValidInput('80E');
    section80dSelfFamilyChildren=checkValidInput('selfFamilyChildren');
    section80dforParents=checkValidInput('forParents');
    preventiveHealthCheckUp=checkValidInput('preventiveHealthCheckUp');
    // sumOfDeductions += checkValidInput('80CCD2-NPS');
    // sumOfDeductions += checkValidInput('selfFamilyChildren');
    // sumOfDeductions += checkValidInput('forParents');
    // sumOfDeductions += checkValidInput('preventiveHealthCheckUp');
    // sumOfDeductions += checkValidInput('80TTA');
    // sumOfDeductions += checkValidInput('80TTB');
    // sumOfDeductions += checkValidInput('otherDeduction');
    // sumOfDeductions += checkValidInput('80CCH');
    // sumOfDeductions += checkValidInput('80E');
    // if(interestOnHomeLoanSelfOccupiedVacant!=0 && interestOnHomeLoanLetOut!=0){
    //     let homeLoanDeduction=Math.min(interestOnHomeLoanSelfOccupiedVacant,interestOnHomeLoanLetOut)
    //     if(homeLoanDeduction>200000){
    //         sumOfDeductions+=200000;
    //     }else{
    //         sumOfDeductions+=homeLoanDeduction;
    //     }
    // }else if(interestOnHomeLoanSelfOccupiedVacant!=0){
    //     if(interestOnHomeLoanSelfOccupiedVacant>200000){
    //         sumOfDeductions+=200000;
    //     }else{
    //         sumOfDeductions+=interestOnHomeLoanSelfOccupiedVacant;
    //     }
    // }else if(interestOnHomeLoanLetOut!=0){
    //     if(interestOnHomeLoanLetOut>200000){
    //         sumOfDeductions+=200000;
    //     }else{
    //         sumOfDeductions+=interestOnHomeLoanLetOut;
    //     }
    // }
    if(section80dSelfFamilyChildren!=0){
        if(document.getElementById('citizenStatusSelfFamilyChildren').value=='non-senior'){
            if(section80dSelfFamilyChildren+preventiveHealthCheckUp>25000){
                section80dSelfFamilyChildren=25000;
                sumOfDeductions+=section80dSelfFamilyChildren;
            }else{
                sumOfDeductions+=section80dSelfFamilyChildren+preventiveHealthCheckUp;
            }
        }else if(document.getElementById('citizenStatusSelfFamilyChildren').value=='senior'){
            if(section80dSelfFamilyChildren>50000){
                section80dSelfFamilyChildren=50000;
                sumOfDeductions+=section80dSelfFamilyChildren;
            }else{
                sumOfDeductions+=section80dSelfFamilyChildren;
            }
        }
    }
    if(section80dforParents!=0){
        if(preventiveHealthCheckUp>5000){
            preventiveHealthCheckUp=5000;
            console.log("helo this is preventivehealthcheckup",preventiveHealthCheckUp)
        }
        if(document.getElementById('citizenStatusforParents').value=='non-senior'){
            if(section80dforParents+preventiveHealthCheckUp>25000){
                section80dforParents=25000;
                sumOfDeductions+=section80dforParents;
                console.log("hello jitu i am in section80dforParents");
            }else{
                sumOfDeductions+=section80dforParents+preventiveHealthCheckUp;
            }
        }else if(document.getElementById('citizenStatusforParents').value=='senior'){
            if(section80dforParents>50000){
                section80dSelfFamilyChildren=50000;
                sumOfDeductions+=section80dforParents;
            }else{
                sumOfDeductions+=section80dforParents;
            }
        }
    }

    if(section80c80cc80ccd1 >150000){
        section80c80cc80ccd1=150000;
        sumOfDeductions+=section80c80cc80ccd1;
    }else{
        sumOfDeductions+=section80c80cc80ccd1;
    } 
    if(section80ccd1b>50000){
        section80ccd1b=50000;
        sumOfDeductions+=section80ccd1b;
    }else{
        sumOfDeductions+=section80ccd1b;
    }
    if(section80ccd2!=0){
        let compare=0;
        console.log(userData.employmentType);
        if(userData.employmentType=="government"){
            console.log("this is basic salary",userData.basicSalary);
            compare=(userData.basicSalary + userData.dearnessAllowance)*0.14;
        }else if(userData.employmentType == "other"){
            console.log("this is basuc sacalry",userData.basicSalary);
            compare=(userData.basicSalary + userData.dearnessAllowance)*0.10;
            console.log(compare);
        }
        if(section80ccd2<compare){
            userData.newTaxRegime.TotalDeductions+=section80ccd2;
            sumOfDeductions+=section80ccd2;
        }else if(section80ccd2>compare){
            userData.newTaxRegime.TotalDeductions+=compare;
            sumOfDeductions+=compare;
        }
    }else{
        userData.newTaxRegime.TotalDeductions=0;
    }
    if(section80tta!=0){
        sumOfDeductions+=section80tta;
    }if(section80ttb!=0){
        sumOfDeductions+=section80ttb;
    }if(section80e!=0){
        sumOfDeductions+=section80e;
    }
    console.log("this is userData.newTaxRegime.TotalDeductions",userData.newTaxRegime.TotalDeductions)
    console.log("this is sumOfDeductions",sumOfDeductions);
    userData.oldTaxRegime.TotalDeductions=sumOfDeductions;
    console.log("this is useDataDeduction",userData.oldTaxRegime.TotalDeductions);
    userData.c80LIC=document.getElementById('80-c-LIC').value;
    userData.ccd80NPS=document.getElementById('80CCD2-NPS').value;
    userData.d80.forSelfFamilyChildren.ageStatus =document.getElementById('citizenStatusSelfFamilyChildren').value;
    userData.d80.forSelfFamilyChildren.amount =document.getElementById('selfFamilyChildren').value ;
    userData.d80.forParents.ageStatus =document.getElementById('citizenStatusforParents').value;
    userData.d80.forParents.amount=document.getElementById('forParents').value ;
    userData.d80.preventiveHealthCheckup=document.getElementById('preventiveHealthCheckUp').value ;
    userData.OtherDeductions=document.getElementById('otherDeduction').value ;
    userData.cch80=document.getElementById('80CCH').value ;
    userData.e80=document.getElementById('80E').value ;

    sessionStorage.setItem('userData',JSON.stringify(userData));
    sessionStorage.setItem('newDeductions', newDeductions);
    if (button.id == "continue") {
        window.location.href = 'comparativeview.html';
    } else if(button.id=="back") {
        window.location.href = 'financial_details_PART_B_C.html';
    }
}

$(document).ready(function() {
    let userData=JSON.parse(sessionStorage.getItem('userData'));
    if(userData.age<60){
        if(parseFloat(userData.savingsBankInterest)>10000){
            document.getElementById('80TTA').value=10000;
        }else{
            console.log("hello i am in the 80tta");
            document.getElementById('80TTA').value=userData.savingsBankInterest;
        }  
    }
    if(userData.age>60){
        if((parseFloat(userData.savingsBankInterest)+parseFloat(userData.fixedDepositInterest))>50000){
            document.getElementById('80TTB').value=50000;
        }else{
            console.log("age greater than 60")
            document.getElementById('80TTB').value=parseFloat(userData.savingsBankInterest)+parseFloat(userData.fixedDepositInterest);
        }
    }
    document.getElementById('80-c-LIC').value=userData.c80LIC;
    document.getElementById('80CCD2-NPS').value=userData.ccd80NPS;
    document.getElementById('citizenStatusSelfFamilyChildren').value=userData.d80.forSelfFamilyChildren.ageStatus;
    document.getElementById('selfFamilyChildren').value=userData.d80.forSelfFamilyChildren.amount;
    document.getElementById('citizenStatusforParents').value=userData.d80.forParents.ageStatus;
    document.getElementById('forParents').value=userData.d80.forParents.amount;
    document.getElementById('preventiveHealthCheckUp').value=userData.d80.preventiveHealthCheckup;
    document.getElementById('otherDeduction').value=userData.OtherDeductions;
    document.getElementById('80CCH').value=userData.cch80;
    document.getElementById('80E').value=userData.e80;

    $('#addDeductionButton').click(function() {
        var newDeduction = `
        <div class="form-row align-items-center mt-2" id="deduction-${newDeductions}">
            <div class="col-md-7">
                <select class="form-control mb-2 custom-select deductionName" name="citizenStatus" required>
                    <option value="80CCC - Payment in respect pension Fund">80CCC - Payment in respect pension Fund</option>
                    <option value="80CCD(1) - Contribution to pension scheme of Central Government">80CCD(1) - Contribution to pension scheme of Central Government</option>
                    <option value="80DD - Maintenance including medical treatment of a dependent who is a person with disability">80DD - Maintenance including medical treatment of a dependent who is a person with disability </option>
                    <option value="80CCD(1B) - Contribution to pension scheme of Central Government">80CCD(1B) - Contribution to pension scheme of Central Government</option>
                    <option value="80DDB - Medical treatment of specified disease">80DDB - Medical treatment of specified disease</option>
                    <option value="80EE - Interest on loan taken for residential house property">80EE - Interest on loan taken for residential house property</option>
                    <option value="80EEA - Deduction in respect of interest on loan taken for certain house">80EEA - Deduction in respect of interest on loan taken for certain house</option>
                    <option value="80EEB - Deduction in respect of purchase of electric vehicle">80EEB - Deduction in respect of purchase of electric vehicle</option>
                    <option value="80G-Donations to certain funds, charitable institutions, etc (Please fill 80G schedule. This field is auto-populated from schedule 80G.)">80G-Donations to certain funds, charitable institutions, etc (Please fill 80G schedule. This field is auto-populated from schedule 80G.)</option>
                    <option value="80GG Rent paid (Please submit form 10BA to claim deduction)">80GG Rent paid (Please submit form 10BA to claim deduction)</option>
                    <option value="80GGA Certain donations for scientific research or rural development (Please fill 80GGA Schedule. This field is autopopulated from schedule.)">80GGA Certain donations for scientific research or rural development (Please fill 80GGA Schedule. This field is autopopulated from schedule.)</option>
                    <option value="80GGC-Donation to Political party">80GGC-Donation to Political party</option>
                    <option value="80U-In case of a person with disability">80U-In case of a person with disability</option>
                </select>
            </div>
            <div class="col-md-2">
                <!-- Placeholder for future use -->
            </div>
            <div class="col-md-3 mb-2 position-relative">
                <input type="text" class="form-control deductionValue" name="input2" placeholder="" required oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                <button type="button" class="btn btn-link position-absolute delete-row" style="right: 10px; top: 50%; transform: translateY(-50%);margin-right:10px">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>`;
        
        $(newDeduction).insertBefore($('#addDeductionButton').closest('.form-row'));
        newDeductions++;
    });

    $(document).on('click', '.delete-row', function() {
        $(this).closest('.form-row').remove();
        --newDeductions;

        sessionStorage.setItem('newDeductions', newDeductions);
    });


    let storedDeductions = sessionStorage.getItem('newDeductions');
    if (storedDeductions) {
        newDeductions = parseInt(storedDeductions, 10);
        for (let i = 0; i < newDeductions; i++) {
            var newDeduction = `
            <div class="form-row align-items-center mt-2" id="deduction-${i}">
                <div class="col-md-7">
                    <select class="form-control mb-2 custom-select deductionName" name="citizenStatus" required>
                        <option value="80CCC - Payment in respect pension Fund">80CCC - Payment in respect pension Fund</option>
                    <option value="80CCD(1) - Contribution to pension scheme of Central Government">80CCD(1) - Contribution to pension scheme of Central Government</option>
                    <option value="80DD - Maintenance including medical treatment of a dependent who is a person with disability">80DD - Maintenance including medical treatment of a dependent who is a person with disability </option>
                    <option value="80CCD(1B) - Contribution to pension scheme of Central Government">80CCD(1B) - Contribution to pension scheme of Central Government</option>
                    <option value="80DDB - Medical treatment of specified disease">80DDB - Medical treatment of specified disease</option>
                    <option value="80EE - Interest on loan taken for residential house property">80EE - Interest on loan taken for residential house property</option>
                    <option value="80EEA - Deduction in respect of interest on loan taken for certain house">80EEA - Deduction in respect of interest on loan taken for certain house</option>
                    <option value="80EEB - Deduction in respect of purchase of electric vehicle">80EEB - Deduction in respect of purchase of electric vehicle</option>
                    <option value="80G-Donations to certain funds, charitable institutions, etc (Please fill 80G schedule. This field is auto-populated from schedule 80G.)">80G-Donations to certain funds, charitable institutions, etc (Please fill 80G schedule. This field is auto-populated from schedule 80G.)</option>
                    <option value="80GG Rent paid (Please submit form 10BA to claim deduction)">80GG Rent paid (Please submit form 10BA to claim deduction)</option>
                    <option value="80GGA Certain donations for scientific research or rural development (Please fill 80GGA Schedule. This field is autopopulated from schedule.)">80GGA Certain donations for scientific research or rural development (Please fill 80GGA Schedule. This field is autopopulated from schedule.)</option>
                    <option value="80GGC-Donation to Political party">80GGC-Donation to Political party</option>
                    <option value="80U-In case of a person with disability">80U-In case of a person with disability</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <!-- Placeholder for future use -->
                </div>
                <div class="col-md-3 mb-2 position-relative" >
                    <input type="text" class="form-control deductionValue" name="input2" placeholder="" required oninput="this.value = this.value.replace(/[^0-9]/g, '');" >
                    <button type="button" class="btn btn-link position-absolute delete-row" style="right: 10px; top: 50%; transform: translateY(-50%);" style="margin-right:200px">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>`;
            $(newDeduction).insertBefore($('#addDeductionButton').closest('.form-row'));

            let deductionName = sessionStorage.getItem(`deductionName${i}`);
            let deductionValue = sessionStorage.getItem(`deductionValue${i}`);
            
            $(`#deduction-${i}`).each(function () {
                $(this).find('.deductionName').val(deductionName);
                $(this).find('.deductionValue').val(deductionValue);
            });
        }
    }
});

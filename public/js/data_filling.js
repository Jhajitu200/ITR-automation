

window.onload=function(){
    function dataFillingForm16A() {
        const storedInfo = sessionStorage.getItem('extractedInfoFromForm16A');
        if (storedInfo) {
            const parsedInfoA = JSON.parse(storedInfo);
            if (parsedInfoA) {
                const firstName = document.getElementById('firstName');
                const middleName = document.getElementById('middleName');
                const lastName = document.getElementById('lastName');
                const employerName = document.getElementById('employerName');
                const panNumberField = document.getElementById('panNumber');
                const taxPayerStatusField = document.getElementById('taxPayerStatus');
                // const residentialStatusField = document.getElementById('residentialStatus'); // Updated ID
                const assessmentYearField = document.getElementById('assessment-year');
                const financialYearField = document.getElementById('financial-year');
                const deductorTanField = document.getElementById('deductorTAN'); 
                const pincode =document.getElementById('pinCode');
                const state = document.getElementById('stateOrDistrict');
                const flat =document.getElementById('flat');
                const city =document.getElementById('city');
                const locality =document.getElementById('locality');
                console.log("this i pincode element",pincode);
                // const deductorTanField = document.getElementsByClassName('deductorTan')[0];
                // console.log(deductorTanField);
                // const deductorTanField=document.getElementById('employerSections').querySelector(`#${0}`);
                // console.log(deductorTanField);
                // console.log("this is decutotan",parentElement.querySelector('#deductorTAN'));
                // console.log(  parentElement.querySelector('#deductorTAN')); 
                console.log("this is first name",firstName);
                console.log("hello jitu")
                console.log("thsi is tax payer",taxPayerStatusField);
                if(taxPayerStatusField){
                    if (parsedInfoA.panNumber[3]?.toUpperCase() === 'P') {
                        
                            taxPayerStatusField.value = 'Individual';
                            console.log("hello jitu tax-payer")
                    }
                }
                
                if (panNumberField ) {
                    panNumberField.value = parsedInfoA.panNumber;
                    console.log("hello jitu ")
                    console.log("hello this is jitu pan",panNumberField.value);
                }
                if(pincode){
                    pincode.value=parsedInfoA.pincode;
                    console.log(" hello jitu i am filling pincode",parsedInfoA.pincode)
                }
                if(state){
                    state.value =`${parsedInfoA.state} / ${parsedInfoA.district}`;
                }
                // if(city){
                //     city.value=parsedInfoA.district;
                // }
                // if(flat){
                //     flat.value= parsedInfoA.houseNumber;
                // }
                if(flat){
                    flat.value=parsedInfoA.flatDoorBlock;
                    console.log(parsedInfoA.flatDoorBlock);
                }
                if (assessmentYearField ) {
                    assessmentYearField.value = parsedInfoA.assessmentYear;
                    const assessmentYearParts = parsedInfoA.assessmentYear.split('-');
                    if (assessmentYearParts.length === 2 && financialYearField) {
                        const startYear = parseInt(assessmentYearParts[0], 10);
                        const endYear = parseInt(assessmentYearParts[1], 10);
                        if (!isNaN(startYear) && !isNaN(endYear)) {
                            const financialYear = `${startYear-1}-${startYear}`;
                            financialYearField.value = financialYear;
                        }
                    }
                }


                if (deductorTanField && parsedInfoA.deductorTAN) {
                    deductorTanField.value = parsedInfoA.deductorTAN;
                }
                if(employerName){
                    employerName.value=parsedInfoA.companyName;
                    console.log(companyName);
                }
                
                if (firstName ) {
                    firstName.value = parsedInfoA.firstName;
                    console.log("hello i am in first name");
                }

                if (middleName && parsedInfoA.middleName) {
                    middleName.value = parsedInfoA.middleName;
                }

                if (lastName && parsedInfoA.lastName) {
                    lastName.value = parsedInfoA.lastName;
                }
                console.log("this is first name",firstName);
            }
        }
        else{
            // alert("there is no Data previously stored")
        }
    }

    function dataFillingForm16B() {
                const storedInfo = sessionStorage.getItem('extractedInfoFromForm16B');
                if (storedInfo) {
                    const parsedInfoB = JSON.parse(storedInfo);
                    if (parsedInfoB) {
                   
                        // const extractedInfoFromForm16B = {
                        //     grossSalary: info.SalarySection17,
                        //     grossTaxableIncome: info.SalaryReceivedCurrentEmployer,
                        //     standardDeduction: info.StandardDeduction,
                        //     c80LIC : info.Deduction80C.Gross,
                        //     ccd80NPS: info.Deduction80CCD2.Gross,
                        //     cch80: info.Deduction80CCH.Gross,
                        //     e80: info.Deduction80E.Gross,
                        // };

                        const basicSalaryFill = document.getElementById('basicSalary');
                        console.log("basicSalaryfill",basicSalaryFill);
                        const grossTaxableIncomeFill = document.getElementById('grossTaxableIncome');
                        const lessStandardDeductionFieldFill = document.getElementById('standardDeduction');
                        const lic80CFieldFill = document.getElementById('80-c-LIC');
                        const ccd280FieldFill = document.getElementById('80CCD2-NPS');
                        const ccH80FieldFill = document.getElementById('80CCH');
                        const e80FieldFill = document.getElementById('80E');
                        console.log("I am in the data filling form B function", parsedInfoB);
                        if (basicSalaryFill && parsedInfoB.grossSalary) {
                            basicSalaryFill.value = parsedInfoB.grossSalary;
                        }
        
                        if (grossTaxableIncomeFill && parsedInfoB.grossTaxableIncome) {
                            grossTaxableIncomeFill.value = parsedInfoB.grossTaxableIncome;
                        }
        
                        if (lessStandardDeductionFieldFill && parsedInfoB.standardDeduction) {
                            lessStandardDeductionFieldFill.value = parsedInfoB.standardDeduction;
                        }
        
                        if (lic80CFieldFill && parsedInfoB.c80LIC) {
                            lic80CFieldFill.value = parsedInfoB.c80LIC;
                        }
        
                        if (ccd280FieldFill && parsedInfoB.ccd80NPS) {
                            ccd280FieldFill.value = parsedInfoB.ccd80NPS;
                        }
        
                        if (ccH80FieldFill && parsedInfoB.cch80) {
                            ccH80FieldFill.value = parsedInfoB.cch80;
                        }
        
                        if (e80FieldFill && parsedInfoB.e80) {
                            e80FieldFill.value = parsedInfoB.e80;
                        }
                    }
                }
            }
        
    dataFillingForm16B();

dataFillingForm16A()
}

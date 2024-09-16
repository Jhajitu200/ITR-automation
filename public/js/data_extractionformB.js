
async function extractInformationFromForm16B(url,firstNameEmployee, firstNameEmployer) {
    console.log("hi i am in extractrextfrompdfB function",firstNameEmployee)
    const pdf = await pdfjsLib.getDocument(url).promise;
    let textContent = "";
    console.log("this is URL inside the function extractTextFromPdfFromForm16B",url)
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContentPage = await page.getTextContent();
        const textItems = textContentPage.items.map((item) => item.str);
        textContent += textItems.join(" ") + " ";
    }
    // console.log("this is text content extractTextFromPdfFromForm16B",textContent);
    const extractedInfo = extractInformation(textContent,firstNameEmployee, firstNameEmployer);
    console.log("this is extracted data from form 16 B",extractedInfo);
    dataStorageForm16B(extractedInfo);
  }
  
  function extractInformation(text,firstNameEmployee, firstNameEmployer) {
    console.log("this is first name",firstNameEmployee);
    console.log("this is firstname employer",firstNameEmployer);
    let name="";
    let extractedInfoFromForm16A="";
    if(sessionStorage.getItem('extractedInfoFromForm16A')){
        extractedInfoFromForm16A=JSON.parse(sessionStorage.getItem('extractedInfoFromForm16A'));
    }else{
        extractedInfoFromForm16A={

        }
    }
    for(let i=0;i<text.length;i++){
        if(text[i]!=' '){
            name+=text[i];
        }else if(text[i]==' ' && name==firstNameEmployee){
            name="";
            for(let j=i;j<text.length;j++){
                if(text[j]!=' '){
                    name+=text[j];
                }
                if(text[j]==' ' && text[j+1]!=' '){
                    extractedInfoFromForm16A.firstName=firstNameEmployee;
                    // firstNameEmployee+=name;
                    name="";
                }else if(text[j]==' ' && text[j+1]==' ' && text[j+2]!=' '){
                    extractedInfoFromForm16A.middleName=name;
                    // firstNameEmployee+=name;
                    name="";
                }
                else if(text[j]==' ' && text[j+1]==' ' && text[j+2]==' '){
                    extractedInfoFromForm16A.lastName=name;
                    j = j + 3;
let commaCount = 0;
let address = "";


// Count the number of commas after the initial offset (j)
for (let x = j; x < text.length; x++) {
    if (text[x] === ',') {
        commaCount++;
    }
}

// Extract address parts based on the number of commas
let partIndex = 0;
for (let y = j; y < text.length; y++) {
    if (text[y] === ',' || y === text.length - 1) {
        if (y === text.length - 1 && text[y] !== ',') {
            address += text[y]; // Include the last character if it's not a comma
        }

        switch (partIndex) {
            case 0:
                extractedInfoFromForm16A.flatDoorBlock = address.trim();
                break;
            case 1:
                extractedInfoFromForm16A.buildingVillage = address.trim();
                break;
            case 2:
                extractedInfoFromForm16A.road = address.trim();
                break;
            case 3:
                extractedInfoFromForm16A.area = address.trim();
                break;
        }

        address = "";
        partIndex++;

        if (partIndex > commaCount) {
            break;
        }
    } else {
        address += text[y];
    }
}

// If there are less than 4 parts, make sure to clear the remaining parts
if (commaCount < 4) {
    if (commaCount < 3) {
        extractedInfoFromForm16A.area = "";
    }
    if (commaCount < 2) {
        extractedInfoFromForm16A.road = "";
    }
    if (commaCount < 1) {
        extractedInfoFromForm16A.buildingVillage = "";
    }
}

console.log("Flat/Door/Block:", extractedInfoFromForm16A.flatDoorBlock);
console.log("Building/Village:", extractedInfoFromForm16A.buildingVillage);
console.log("Road:", extractedInfoFromForm16A.road);
console.log("Area:", extractedInfoFromForm16A.area);

                    // j=j+3;
                    // let x=0;
    
                    // let comma=0;
                    // let address="";

                    // for(x=j;x<text.length;x++){
                    //     if(text[x]==','){
                    //        ++comma;
                    //     }
                    // }
                    // let countComma=1;
                    // for(let y=j;y<j+x;j++){
                    //     if(comma==0){
                    //         extractedInfoFromForm16A.flatDoorBlock="";
                    //         extractedInfoFromForm16A.buildingVillage="";
                    //         extractedInfoFromForm16A.road="";
                    //         extractedInfoFromForm16A.area="";

                    //     }
                    //     if(comma==1){
                            
                    //       for(let y=j;y<j+x;y++){
                    //         if(text[y]==','){
                    //             extractedInfoFromForm16A.flatDoorBlock=address ;
                    //             address="";
                    //         }else{
                    //             address+=text[i];
                    //         }
                    //       }  
                    //     }
                    //     if(comma==2){
                    //         for(let y=j;y<j+x;y++){
                    //           if(text[y]==',' && countComma==1){
                    //               extractedInfoFromForm16A.flatDoorBlock=address ;
                    //               ++countComma;
                    //               address="";
                    //           }else if(text[y]==',' && countComma==2){
                    //             extractedInfoFromForm16A.buildingVillage=address;
                    //             address="";
                    //             countComma=1;
                    //           }else{
                    //               address+=text[i];
                    //           }
                    //         }  
                    //     }if(comma==3){
                    //         for(let y=j;y<j+x;y++){
                    //           if(text[y]==',' && countComma==1){
                    //               extractedInfoFromForm16A.flatDoorBlock=address ;
                    //               ++countComma;
                    //               address="";
                    //           }else if(text[y]==',' && countComma==2){
                    //             extractedInfoFromForm16A.buildingVillage=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==3){
                    //             extractedInfoFromForm16A.road=address;
                    //             address="";
                    //             countComma=1;
                    //           }else{
                    //               address+=text[i];
                    //           }
                    //         }  
                    //     }if(comma==4){
                    //         for(let y=j;y<j+x;y++){
                    //           if(text[y]==',' && countComma==1){
                    //               extractedInfoFromForm16A.flatDoorBlock=address ;
                    //               ++countComma;
                    //               address="";
                    //           }else if(text[y]==',' && countComma==2){
                    //             extractedInfoFromForm16A.buildingVillage=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==3){
                    //             extractedInfoFromForm16A.road=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==4){
                    //             extractedInfoFromForm16A.area=address;
                    //             address="";
                    //             countComma=1;
                    //           }else{
                    //               address+=text[i];
                    //           }
                    //         }  
                    //     }if(comma==5){
                    //         for(let y=j;y<j+x;y++){
                    //           if(text[y]==',' && countComma==1){
                    //             //   extractedInfoFromForm16A.flatDoorBlock=address ;
                    //               ++countComma;
                    //             //   address="";
                    //           }else if(text[y]==',' && countComma==2){
                    //             extractedInfoFromForm16A.flatDoorBlock=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==3){
                    //             extractedInfoFromForm16A.buildingVillage=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==4){
                    //             extractedInfoFromForm16A.road=address;
                    //             address="";
                    //             ++countComma;
                    //           }else if(text[y]==',' && countComma==5){
                    //             extractedInfoFromForm16A.area=address;
                    //             address="";
                    //             countComma=1;
                    //           }else{
                    //               address+=text[i];
                    //           }
                    //         }  
                    //     }
                    //     console.log("this is flat number",extractedInfoFromForm16A.flatDoorBlock);
                    // }
                    
                    console.log("this is extracted infoA" , extractedInfoFromForm16A.lastName)
                    // firstNameEmployee+=name;
                    break;
                }
            }
            
            break;
        }else if(text[i]==' '){
            name="";
        }
    }
    name="";
    for(let i=0;i<text.length;i++){
        if(text[i]!=' '){
            name+=text[i];
        }else if(text[i]==' ' && name==firstNameEmployer){
            name="";
            for(let j=i;j<text.length;j++){
                if(text[j]!=' '){
                    name+=text[j];
                }
                if(text[j]==' ' && text[j+1]!=' '){
                    firstNameEmployer+=name;
                    name=" ";
                }else if(text[j]==' ' && text[j+1]==' ' && text[j+2]!=' '){
                    firstNameEmployer+=name;
                    name=" ";
                }
                else if(text[j]==' ' && text[j+1]==' ' && text[j+2]==' '){
                    firstNameEmployer+=name;
                    extractedInfoFromForm16A.companyName=firstNameEmployer;
                    sessionStorage.setItem('extractedInfoFromForm16A',JSON.stringify(extractedInfoFromForm16A));
                    break;
                }
            }
            
            break;
        }else if(text[i]==' '){
            name="";
        }
    }
    console.log("this is extracted infoA" , extractedInfoFromForm16A.lastName)
//   console.log("this is text",text);
  const lastUpdatedPattern = /Last updated on\s*([\d]{2}-[A-Za-z]{3}-[\d]{4})/i;
  const formTypePattern = /FORM\s*NO\.\s*16\s*PART\s*B/i;
  const optOutPattern =
  /Whether\s+opting\s+out\s+of\s+taxation\s+u\/s\s+115BAC\(1A\)\?\s*(Yes|No)/i;
  const salarySection17Pattern =
  /Salary\s+as\s+per\s+provisions\s+contained\s+in\s+section\s+17\(1\)\s+([\d,]+\.\d{2})/i;
  const perquisitesSection17_2Pattern =
  /Value\s+of\s+perquisites\s+under\s+section\s+17\(2\)\s+\(as\s+per\s+Form\s+No\.\s+12BA,\s+wherever\s+applicable\)\s+([\d,]+\.\d{2})/i;
  const profitsInLieuOfSalarySection17_3Pattern =
  /Profits\s+in\s+lieu\s+of\s+salary\s+under\s+section\s+17\(3\)\s+\(as\s+per\s+Form\s+No\.\s+12BA,\s+wherever\s+applicable\)\s+([\d,]+\.\d{2})/i;
  const totalPattern = /\(d\)\s+Total\s+([\d,]+\.\d{2})/i;
  const reportedTotalSalaryOtherEmployersPattern =
  /Reported\s+total\s+amount\s+of\s+salary\s+received\s+from\s+other\s+employer\(s\)\s+([\d,]+\.\d{2})/i;
  const travelConcessionPattern =
  /Travel\s+concession\s+or\s+assistance\s+under\s+section\s+10\(5\)\s+([\d,]+\.\d{2})/i;
  const deathCumRetirementGratuityPattern =
  /Death\s*-\s*cum\s*-\s*retirement\s*gratuity\s*under\s*section\s*10\(10\)\s*([\d,]+\.\d{2})/i;
  const commutedValueOfPensionPattern =
  /Commuted\s+value\s+of\s+pension\s+under\s+section\s+10\(10A\)\s+([\d,]+\.\d{2})/i;
  const houseRentAllowancePattern =
  /House\s+rent\s+allowance\s+under\s+section\s+10\(13A\)\s+([\d,]+\.\d{2})/i;
  const otherSpecialAllowancesPattern =
  /Other\s+special\s+allowances\s+under\s+section\s+10\(14\)\s+([\d,]+\.\d{2})/i;
  const otherExemptionSection10Pattern =
  /Total\s+amount\s+of\s+any\s+other\s+exemption\s+under\s+section\s+10\s+([\d,]+\.\d{2})/i;
  const exemptionClaimedSection10Pattern =
  /Total\s+amount\s+of\s+exemption\s+claimed\s+under\s+section\s+10\s+\[2\(a\)\+2\(b\)\+2\(c\)\+2\(d\)\+2\(e\)\+2\(f\)\+2\(h\)\]\s+([\d,]+\.\d{2})/i;
  const salaryReceivedCurrentEmployerPattern =
  /Total\s+amount\s+of\s+salary\s+received\s+from\s+current\s+employer\s+\[1\(d\) - 2\(i\)\]\s+([\d,]+\.\d{2})/i;
  const standardDeductionPattern =
  /Standard\s+deduction\s+under\s+section\s+16\(ia\)\s+([\d,]+\.\d{2})/i;
  const entertainmentAllowancePattern =
  /Entertainment\s+allowance\s+under\s+section\s+16\(ii\)\s+([\d,]+\.\d{2})/i;
  const taxOnEmploymentPattern =
  /Tax\s+on\s+employment\s+under\s+section\s+16\(iii\)\s+([\d,]+\.\d{2})/i;
  // const totalDeductionsPattern = /Total\s+amount\s+of\s+deductions\s+under\s+section\s+16\s+\[4\(a\)\+4\(b\)\+4\(c\)\]\s+([\d,]+\.\d{2})/i;
  const totalDeductionsPattern =
  /Total\s+amount\s+of\s+deductions\s+under\s+section\s+16\s+\[4\(a\)\+4\(b\)\+4\(c\)\]\s+([\d,]+\.\d{2})/i;
  // const incomeChargeableSalariesPattern = /Income\s+chargeable\s+under\s+the\s+head\s+"Salaries"\s+\[\(3\+1\(e\)\-5\)\]\s+([\d,]+\.\d{2})/i;
  const incomeFromHousePropertyPattern =
  /Income\s*\(or\s*admissible\s*loss\)\s*from\s*house\s*property\s*reported\s*by\s*employee\s*offered\s*for\s*TDS\s*([\d,]+\.\d{2})/i;
  const incomeFromOtherSourcesPattern =
  /Income\s*under\s*the\s*head\s*Other\s*Sources\s*offered\s*for\s*TDS\s*([\d,]+\.\d{2})/i;
  const totalOtherIncomePattern =
  /Total\s+amount\s+of\s+other\s+income\s+reported\s+by\s+the\s+employee\s*\[7\(a\)\+7\(b\)\]\s+([\d,]+\.\d{2})/i;
  const grossTotalIncomePattern =
  /Gross\s+total\s+income\s+\(6\+8\)\s+([\d,]+\.\d{2})/i;
  const deduction80CPattern =
  /Deduction\s+in\s+respect\s+of\s+life\s+insurance\s+premia,\s+contributions\s+to\s+provident\s+fund\s+etc\.\s+under\s+section\s+80C\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80CCCPattern =
  /Deduction\s+in\s+respect\s+of\s+contribution\s+to\s+certain\s+pension\s+funds\s+under\s+section\s+80CCC\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80CCDPattern =
  /Deduction\s+in\s+respect\s+of\s+contribution\s+by\s+taxpayer\s+to\s+pension\s+scheme\s+under\s+section\s+80CCD\s+\(1\)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  
  const deduction80CCD1BPattern =
  /Deductions\s+in\s+respect\s+of\s+amount\s+paid\/deposited\s+to\s+notified\s+pension\s+scheme\s+under\s+section\s+80CCD\s+\(1B\)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80CCD2Pattern =
  /Deduction\s+in\s+respect\s+of\s+contribution\s+by\s+Employer\s+to\s+pension\s+scheme\s+under\s+section\s+80CCD\s+\(2\)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80DPattern =
  /Deduction\s+in\s+respect\s+of\s+health\s+insurance\s+premia\s+under\s+section\s+80D\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80EPattern =
  /Deduction\s+in\s+respect\s+of\s+interest\s+on\s+loan\s+taken\s+for\s+higher\s+education\s+under\s+section\s+80E\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deduction80CCHPattern =
  /Deduction\s+in\s+respect\s+of\s+contribution\s+by\s+the\s+employee\s+to\s+Agnipath\s+Scheme\s+under\s+section\s+80CCH\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  const deductionCentralGovt80CCHPattern =
  /Deduction\s+in\s+respect\s+of\s+contribution\s+by\s+the\s+Central\s+Government\s+to\s+Agnipath\s+Scheme\s+under\s+section\s+80CCH\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2})/i;
  
  
  const lastUpdatedMatch = text.match(lastUpdatedPattern);
  const formTypeMatch = text.match(formTypePattern);
  const optOutMatch = text.match(optOutPattern);
  const salarySection17Match = text.match(salarySection17Pattern);
  const perquisitesSection17_2Match = text.match(perquisitesSection17_2Pattern);
  const profitsInLieuOfSalarySection17_3Match = text.match(
  profitsInLieuOfSalarySection17_3Pattern
  );
  const totalMatch = text.match(totalPattern);
  const reportedTotalSalaryOtherEmployersMatch = text.match(
  reportedTotalSalaryOtherEmployersPattern
  );
  const travelConcessionMatch = text.match(travelConcessionPattern);
  const deathCumRetirementGratuityMatch = text.match(
  deathCumRetirementGratuityPattern
  );
  const commutedValueOfPensionMatch = text.match(commutedValueOfPensionPattern);
  const houseRentAllowanceMatch = text.match(houseRentAllowancePattern);
  const otherSpecialAllowancesMatch = text.match(otherSpecialAllowancesPattern);
  const otherExemptionSection10Match = text.match(
  otherExemptionSection10Pattern
  );
  const exemptionClaimedSection10Match = text.match(
  exemptionClaimedSection10Pattern
  );
  const salaryReceivedCurrentEmployerMatch = text.match(
  salaryReceivedCurrentEmployerPattern
  );
  const standardDeductionMatch = text.match(standardDeductionPattern);
  const entertainmentAllowanceMatch = text.match(entertainmentAllowancePattern);
  const taxOnEmploymentMatch = text.match(taxOnEmploymentPattern);
  // const totalDeductionsMatch = text.match(totalDeductionsPattern);
  const totalDeductionsMatch = text.match(totalDeductionsPattern);
  // const incomeChargeableSalariesMatch = text.match(incomeChargeableSalariesPattern);
  const incomeFromHousePropertyMatch = text.match(
  incomeFromHousePropertyPattern
  );
  const incomeFromOtherSourcesMatch = text.match(incomeFromOtherSourcesPattern);
  const totalOtherIncomeMatch = text.match(totalOtherIncomePattern);
  const grossTotalIncomeMatch = text.match(grossTotalIncomePattern);
  const deduction80CMatch = text.match(deduction80CPattern);
  const deduction80CCCMatch = text.match(deduction80CCCPattern);
  const deduction80CCDMatch = text.match(deduction80CCDPattern);
  const deduction80CCD1BMatch = text.match(deduction80CCD1BPattern);
  const deduction80CCD2Match = text.match(deduction80CCD2Pattern);
  const deduction80DMatch = text.match(deduction80DPattern);
  const deduction80EMatch = text.match(deduction80EPattern);
  const deduction80CCHMatch = text.match(deduction80CCHPattern);
  const deductionCentralGovt80CCHMatch = text.match(
  deductionCentralGovt80CCHPattern
  );


  return {
  LastUpdated: lastUpdatedMatch ? lastUpdatedMatch[1].trim() : "Not Found",
  FormType: formTypeMatch ? formTypeMatch[0].trim() : "Not Found",
  OptingOut: optOutMatch ? optOutMatch[1].trim() : "Not Found",
  SalarySection17: salarySection17Match
  ? salarySection17Match[1].trim()
  : "Not Found",
  PerquisitesSection17_2: perquisitesSection17_2Match
  ? perquisitesSection17_2Match[1].trim()
  : "Not Found",
  ProfitsInLieuOfSalarySection17_3: profitsInLieuOfSalarySection17_3Match
  ? profitsInLieuOfSalarySection17_3Match[1].trim()
  : "Not Found",
  Total: totalMatch ? totalMatch[1].trim() : "Not Found",
  ReportedTotalSalaryOtherEmployers: reportedTotalSalaryOtherEmployersMatch
  ? reportedTotalSalaryOtherEmployersMatch[1].trim()
  : "Not Found",
  TravelConcession: travelConcessionMatch
  ? travelConcessionMatch[1].trim()
  : "Not Found",
  DeathCumRetirementGratuity: deathCumRetirementGratuityMatch
  ? deathCumRetirementGratuityMatch[1].trim()
  : "Not Found",
  CommutedValueOfPension: commutedValueOfPensionMatch
  ? commutedValueOfPensionMatch[1].trim()
  : "Not Found",
  HouseRentAllowance: houseRentAllowanceMatch
  ? houseRentAllowanceMatch[1].trim()
  : "Not Found",
  OtherSpecialAllowances: otherSpecialAllowancesMatch
  ? otherSpecialAllowancesMatch[1].trim()
  : "Not Found",
  OtherExemptionSection10: otherExemptionSection10Match
  ? otherExemptionSection10Match[1].trim()
  : "Not Found",
  ExemptionClaimedSection10: exemptionClaimedSection10Match
  ? exemptionClaimedSection10Match[1].trim()
  : "Not Found",
  SalaryReceivedCurrentEmployer: salaryReceivedCurrentEmployerMatch
  ? salaryReceivedCurrentEmployerMatch[1].trim()
  : "Not Found",
  StandardDeduction: standardDeductionMatch
  ? standardDeductionMatch[1].trim()
  : "Not Found",
  EntertainmentAllowance: entertainmentAllowanceMatch
  ? entertainmentAllowanceMatch[1].trim()
  : "Not Found",
  TaxOnEmployment: taxOnEmploymentMatch
  ? taxOnEmploymentMatch[1].trim()
  : "Not Found",
  TotalDeductions: totalDeductionsMatch
  ? totalDeductionsMatch[1].trim()
  : "Not Found",
  // IncomeChargeableSalaries: incomeChargeableSalariesMatch ? incomeChargeableSalariesMatch[1].trim() : "Not Found",
  IncomeFromHouseProperty: incomeFromHousePropertyMatch
  ? incomeFromHousePropertyMatch[1].trim()
  : "Not Found",
  IncomeFromOtherSources: incomeFromOtherSourcesMatch
  ? incomeFromOtherSourcesMatch[1].trim()
  : "Not Found",
  TotalOtherIncome: totalOtherIncomeMatch
  ? totalOtherIncomeMatch[1].trim()
  : "Not Found",
  GrossTotalIncome: grossTotalIncomeMatch
  ? grossTotalIncomeMatch[1].trim()
  : "Not Found",
  Deduction80C: {
  Gross: deduction80CMatch ? deduction80CMatch[1].trim() : "Not Found",
  Deductible: deduction80CMatch ? deduction80CMatch[2].trim() : "Not Found",
  },
  Deduction80CCC: {
  Gross: deduction80CCCMatch ? deduction80CCCMatch[1].trim() : "Not Found",
  Deductible: deduction80CCCMatch
  ? deduction80CCCMatch[2].trim()
  : "Not Found",
  },
  Deduction80CCD1: {
  Gross: deduction80CCDMatch ? deduction80CCDMatch[1].trim() : "Not Found",
  Deductible: deduction80CCDMatch
  ? deduction80CCDMatch[2].trim()
  : "Not Found",
  },
  Deduction80CCD1B: {
  Gross: deduction80CCD1BMatch
  ? deduction80CCD1BMatch[1].trim()
  : "Not Found",
  Deductible: deduction80CCD1BMatch
  ? deduction80CCD1BMatch[2].trim()
  : "Not Found",
  },
  Deduction80CCD2: {
  Gross: deduction80CCD2Match
  ? deduction80CCD2Match[1].trim()
  : "Not Found",
  Deductible: deduction80CCD2Match
  ? deduction80CCD2Match[2].trim()
  : "Not Found",
  },
  Deduction80D: {
  Gross: deduction80DMatch ? deduction80DMatch[1].trim() : "Not Found",
  Deductible: deduction80DMatch ? deduction80DMatch[2].trim() : "Not Found",
  },
  Deduction80E: {
  Gross: deduction80EMatch ? deduction80EMatch[1].trim() : "Not Found",
  Deductible: deduction80EMatch ? deduction80EMatch[2].trim() : "Not Found",
  },
  Deduction80CCH: {
  Gross: deduction80CCHMatch ? deduction80CCHMatch[1].trim() : "Not Found",
  Deductible: deduction80CCHMatch
  ? deduction80CCHMatch[2].trim()
  : "Not Found",
  },
  DeductionCentralGovt80CCH: {
  Gross: deductionCentralGovt80CCHMatch
  ? deductionCentralGovt80CCHMatch[1].trim()
  : "Not Found",
  Deductible: deductionCentralGovt80CCHMatch
  ? deductionCentralGovt80CCHMatch[2].trim()
  : "Not Found",
  },
  };
  }
  

  function dataStorageForm16B(info) {
    console.log("heello i am jitu kumar jah");

    // const extractedInfoFromForm16B = {
    //     grossSalary: info.SalarySection17,
    //     grossTaxableIncomeStore: info.SalaryReceivedCurrentEmployer,
    //     lessStandrdDeductinStore: info.StandardDeduction,
    //     lic80CStore: info.Deduction80C.Gross,
    //     ccd280Store: info.Deduction80CCD2.Gross,
    //     ccH80Store: info.Deduction80CCH.Gross,
    //     e80Store: info.Deduction80E.Gross,
    // };
    const extractedInfoFromForm16B = {
        grossSalary: info.SalarySection17,
        grossTaxableIncome: info.SalaryReceivedCurrentEmployer,
        standardDeduction: info.StandardDeduction,
        c80LIC : info.Deduction80C.Gross,
        ccd80NPS: info.Deduction80CCD2.Gross,
        cch80: info.Deduction80CCH.Gross,
        e80: info.Deduction80E.Gross,
    };
    // const userData = JSON.parse(sessionStorage.getItem('useData'));
    // userData.grossSalary=info.SalarySection17;
    // userData.grossTaxableIncome=info.SalaryReceivedCurrentEmployer;
    // userData.standardDeduction = info.StandardDeduction;
    // userData.c80LIC  = info.Deduction80C.Gross;
    // userData.ccd80NPS =info.Deduction80CCD2.Gross;
    // userData.cch80 = info.Deduction80CCH.Gross;
    // userData.e80=info.Deduction80E.Gross;

    sessionStorage.setItem('extractedInfoFromForm16B', JSON.stringify(extractedInfoFromForm16B));
    // sessionStorage.setItem('extractedInfoFromForm16B', JSON.stringify(userData));
    console.log("Extracted information from Form 16B:", extractedInfoFromForm16B);
}


   // const outputDiv = document.getElementById("output");
    // console.log("outputDiv ---- ", outputDiv);
    // outputDiv.innerHTML = `
    //             <p><strong>Last Updated:</strong> ${info.LastUpdated}</p>
    //             <p><strong>Type of Form:</strong> ${info.FormType}</p>
    //             <p><strong>Opting out of taxation u/s 115BAC(1A):</strong> ${info.OptingOut}</p>
    //             <p><strong>Salary as per provisions contained in section 17(1):</strong> ${info.SalarySection17}</p>
    //             <p><strong>Value of perquisites under section 17(2) (as per Form No. 12BA, wherever applicable):</strong> ${info.PerquisitesSection17_2}</p>
    //             <p><strong>Profits in lieu of salary under section 17(3) (as per Form No. 12BA, wherever applicable):</strong> ${info.ProfitsInLieuOfSalarySection17_3}</p>
    //             <p><strong>(d) Total:</strong> ${info.Total}</p>
    //             <p><strong>Reported total amount of salary received from other employer(s):</strong> ${info.ReportedTotalSalaryOtherEmployers}</p>
    //             <p><strong>Travel concession or assistance under section 10(5):</strong> ${info.TravelConcession}</p>
    //             <p><strong>Death-cum-retirement gratuity under section 10(10):</strong> ${info.DeathCumRetirementGratuity}</p>
    //             <p><strong>Commuted value of pension under section 10(10A):</strong> ${info.CommutedValueOfPension}</p>
    //           <p><strong>House Rent Allowance under section 10(13A):</strong> ${info.HouseRentAllowance}</p>
    //           <p><strong>Other special allowances under section 10(14):</strong> ${info.OtherSpecialAllowances}</p>
    //            <p><strong>Total amount of any other exemption under section 10:</strong> ${info.OtherExemptionSection10}</p>
    //            <p><strong>Total amount of exemption claimed under section 10 [2(a)+2(b)+2(c)+2(d)+2(e)+2(f)+2(h)]:</strong> ${info.ExemptionClaimedSection10}</p>
    //            <p><strong>Total amount of salary received from current employer [1(d) - 2(i)]:</strong> ${info.SalaryReceivedCurrentEmployer}</p>
    //             <p><strong>Standard deduction under section 16(ia) :</strong> ${info.StandardDeduction}</p>
    //             <p><strong>Entertainment allowance under section 16(ii) :</strong> ${info.EntertainmentAllowance}</p>
    //             <p><strong>Tax on employment under section 16(iii)  :</strong> ${info.TaxOnEmployment}</p>
    //             <p><strong>Total amount of deductions under section 16 [4(a)+4(b)+4(c)]  :</strong> ${info.TotalDeductions}</p>
    //             <p><strong>Income (or admissible loss) from house property reported by employee offered for TDS   :</strong> ${info.IncomeFromHouseProperty}</p>
    //             <p><strong>Income under the head Other Sources offered for TDS   :</strong> ${info.IncomeFromOtherSources}</p>
    //             <p><strong>Total amount of other income reported by the employee [7(a)+7(b)]  :</strong> ${info.TotalOtherIncome}</p>
    //             <p><strong>Gross total income (6+8)   :</strong> ${info.GrossTotalIncome}</p>
    //              <p><strong>Deduction in respect of life insurance premia, contributions to provident fund etc. under section 80C (Gross):</strong> ${info.Deduction80C.Gross}</p>
    //     <p><strong>Deduction in respect of life insurance premia, contributions to provident fund etc. under section 80C (Deductible):</strong> ${info.Deduction80C.Deductible}</p>
    //      <p><strong>Deduction in respect of contribution to certain pension funds under section 80CCC (Gross):</strong> ${info.Deduction80CCC.Gross}</p>
    //     <p><strong>Deduction in respect of contribution to certain pension funds under section 80CCC (Deductible):</strong> ${info.Deduction80CCC.Deductible}</p>
    //     <p><strong>Deduction in respect of contribution by taxpayer to pension scheme under section 80CCD (1) (Gross):</strong> ${info.Deduction80CCD1.Gross}</p>
    //     <p><strong>Deduction in respect of contribution by taxpayer to pension scheme under section 80CCD (1) (Deductible):</strong> ${info.Deduction80CCD1.Deductible}</p>
    //     <p><strong>Deductions in respect of amount paid/deposited to notified pension scheme under section 80CCD (1B) (Gross):</strong> ${info.Deduction80CCD1B.Gross}</p>
    //     <p><strong>Deductions in respect of amount paid/deposited to notified pension scheme under section 80CCD (1B) (Deductible):</strong> ${info.Deduction80CCD1B.Deductible}</p>
    //     <p><strong>Deduction in respect of contribution by Employer to pension scheme under section 80CCD (2) (Gross):</strong> ${info.Deduction80CCD2.Gross}</p>
    //     <p><strong>Deduction in respect of contribution by Employer to pension scheme under section 80CCD (2) (Deductible):</strong> ${info.Deduction80CCD2.Deductible}</p>
    //     <p><strong>Deduction in respect of health insurance premia under section 80D (Gross):</strong> ${info.Deduction80D.Gross}</p>
    //     <p><strong>Deduction in respect of health insurance premia under section 80D (Deductible):</strong> ${info.Deduction80D.Deductible}</p>
    //     <p><strong>Deduction in respect of interest on loan taken for higher education under section 80E (Gross):</strong> ${info.Deduction80E.Gross}</p>
    //     <p><strong>Deduction in respect of interest on loan taken for higher education under section 80E (Deductible):</strong> ${info.Deduction80E.Deductible}</p>
    //     <p><strong>Deduction in respect of contribution by the employee to Agnipath Scheme under section 80CCH (Gross):</strong> ${info.Deduction80CCH.Gross}</p>
    //     <p><strong>Deduction in respect of contribution by the employee to Agnipath Scheme under section 80CCH (Deductible):</strong> ${info.Deduction80CCH.Deductible}</p>
    //     <p><strong>Deduction in respect of contribution by the Central Government to Agnipath Scheme under section 80CCH (Gross):</strong> ${info.DeductionCentralGovt80CCH.Gross}</p>
    //     <p><strong>Deduction in respect of contribution by the Central Government to Agnipath Scheme under section 80CCH (Deductible):</strong> ${info.DeductionCentralGovt80CCH.Deductible}</p>
    //     `;

  
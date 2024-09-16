
function extractInformationFromForm16A(text) {
    const employerSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank\s*(.*?)(?=Name\s+and\s+address\s+of\s+the\s+Employee\/|$)[\s\S]/; 
    const employeeSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employee\/Specified\s+senior\s+citizen\s+([\s\S]+?)\s+(?:Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank|$)/;
    const pincodeRegex = /\b\d{6}\b/;
    const houseNumberRegex = /(?:H\s*NO|House\s*Number)-?\s*(.*?)(?:,|$)/i; 
    const panRegex = /PAN\s+of\s+the\s+Employee\/Specified\s+senior\s+citizen\s+([A-Z0-9]+)/;
    const assessmentYearRegex = /Assessment\s+Year\s+(\d{4}-\d{2})/;
    const tanRegex = /TAN\s+of\s+the\s+Deductor\s+([A-Z0-9]+)/;
    // console.log("hello i am in the data_extraction",employerSectionRegex);
    const panMatch = text.match(panRegex);
    const assessmentYearMatch = text.match(assessmentYearRegex);
    const tanMatch = text.match(tanRegex);
    const employeeSectionMatch = text.match(employeeSectionRegex);
    const employerSectionMatch = text.match(employerSectionRegex);
    const pincodeMatch = employeeSectionMatch && employeeSectionMatch[1].match(pincodeRegex);
    const houseNumberMatch = employeeSectionMatch && employeeSectionMatch[1].match(houseNumberRegex);
    console.log("hello I am in data_extractionA.js");
    // let firstName = "";
    // let middleName = "";
    // let lastName = "";
    let employeePAN = "";
    let assessmentYear = "";
    let deductorTAN = "";
    let pincode = "";
    let houseNumber = "";
    let userData = JSON.parse(sessionStorage.getItem('userData')) ;
    // const userData=JSON.parse(sessionStorage.getItem('userData'));
    // console.log(text);

//   if (!employerSectionMatch) {
//     console.error("Employer section not found in the PDF.");
//     return; 
//   }

//   const nameAndAddress = employerSectionMatch[1].trim();

//   let companyName = "";
//   let subCompanyName="";
// //   let remainingAddress = "";
//   console.log("this is name and address of company",nameAndAddress);
//   let isCompanyName = true;
//   for (let i = 0; i < nameAndAddress.length; i++) {
//     if([ '/', ',','1','2','3','4','5','6','7','8','9','0'].includes(nameAndAddress[i])){
//         break;
//     }else{
//         subCompanyName+=nameAndAddress[i];
//         if(subCompanyName=="LLP" || subCompanyName=="LIMITED" || subCompanyName=="LTD" || subCompanyName=="PVT" ){
//             companyName+=subCompanyName;
//             break;
//         }
//     }
//     if(nameAndAddress[i]==' '){
        
//         companyName+=subCompanyName;
//         subCompanyName="";
//     }
    
//   }

//   companyName = companyName.trim();
//   remainingAddress = remainingAddress.trim(); 
  
//   console.log("hello jitu this is company name",companyName);
    if (panMatch && panMatch.length > 1) {
        employeePAN = panMatch[1].trim();
        console.log("hello this is employeepan",employeePAN)
    }
    if (assessmentYearMatch && assessmentYearMatch.length > 1) {
        assessmentYear = assessmentYearMatch[1].trim();
    }
    if (tanMatch && tanMatch.length > 1) {
        deductorTAN = tanMatch[1].trim();
    }
    // if (employeeSectionMatch) {
    //     const nameAndAddress = employeeSectionMatch[1].trim();

    //     // Extract house number
    //     if (houseNumberMatch && houseNumberMatch.length > 1) {
    //         houseNumber = houseNumberMatch[1].trim();
    //     }

    //     const nameLine = nameAndAddress.split('\n')[0].trim();
    //     const nameParts = nameLine.split(/\s+/);

    //     const nameTokens = nameParts.slice(0, 3);

    //     if (nameTokens.length === 2) {
    //         firstName = nameTokens[0];
    //         lastName = nameTokens[1];
    //     } else if (nameTokens.length === 3) {
    //         firstName = nameTokens[0];
    //         middleName = nameTokens[1];
    //         lastName = nameTokens[2];

    //         if (lastName.length === 1 || lastName.length === 2 || lastName=="House") {
    //             lastName = middleName;
    //             middleName = "";
    //         } else {
    //             for(let i=0;i<middleName.length;i++){
    //                 if(['.', '/', ',','1','2','3','4','5','6','7','8','9','0'].includes(middleName[i])) {
    //                     middleName="";
    //                     lastName="";
    //                 }
    //             }
    //             for (let i = 0; i < lastName.length; i++) {
    //                 if (['.', '/', ',','1','2','3','4','5','6','7','8','9','0','-'].includes(lastName[i])) {
    //                     lastName = middleName;
    //                     middleName = "";
    //                     break;
    //                 }
    //             }
                
    //         }
    //     } else if (nameTokens.length > 3) {
    //         firstName = nameTokens[0];
    //         middleName = nameTokens.slice(1, -1).join(' ');
    //         lastName = nameTokens[nameTokens.length - 1];
    //     } else {
    //         firstName = nameTokens[0];
    //     }

        if (pincodeMatch && pincodeMatch.length > 0) {
            pincode = pincodeMatch[0].trim();
        }
    // }
    let pdfInfo="";
        if(!sessionStorage.getItem('extractedInfoFromForm16A')){
             pdfInfo = {
                // companyName:companyName,
                // firstName: firstName,
                // middleName: middleName,
                // lastName: lastName,
                panNumber: employeePAN,
                assessmentYear: assessmentYear,
                deductorTAN: deductorTAN,
                pincode: pincode,
                houseNumber: houseNumber,
            };
        
        }else{
            pdfInfo=JSON.parse(sessionStorage.getItem('extractedInfoFromForm16A'));
            pdfInfo.panNumber= employeePAN;
            pdfInfo.assessmentYear= assessmentYear;
            pdfInfo.deductorTAN= deductorTAN;
            pdfInfo.pincode= pincode;
            pdfInfo.houseNumber= houseNumber;
            userData.firstName = pdfInfo.firstName;
    userData.middleName = pdfInfo.middleName;
    userData.lastName = pdfInfo.lastName;
        }
   
    // let userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    // userData.firstName = firstName;
    // userData.middleName = middleName;
    // userData.lastName = lastName;
    userData.panNumber = employeePAN;
    userData.assessmentYear = assessmentYear;
    userData.houseNumber = houseNumber;

    // console.log("this is employee name", firstName);

    let apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data[0].Status === "Success") {
                const postOfficeData = data[0].PostOffice[0];
                pdfInfo.state = postOfficeData.State;
                pdfInfo.district = postOfficeData.District;
                userData.state = postOfficeData.State;
                userData.district = postOfficeData.District;

                console.log(`State for pincode ${pincode}: ${postOfficeData.State}`);
                console.log(`District for pincode ${pincode}: ${postOfficeData.District}`);
                
                sessionStorage.setItem('extractedInfoFromForm16A', JSON.stringify(pdfInfo));
                sessionStorage.setItem('userData', JSON.stringify(userData));
            } else {
                console.error('Error: Pincode not found or invalid.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    console.log("Extracted Information by jitu:", pdfInfo);
    console.log("this is pincode", pincode);
    console.log("this is houseNumber", houseNumber);
}

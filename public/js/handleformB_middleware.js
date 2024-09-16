
    async function handleFormB(formType,text){
        const fileInput = document.getElementById("fileInput");
        const employerSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank\s*(.*?)(?=Name\s+and\s+address\s+of\s+the\s+Employee\/|$)[\s\S]/; 
        const employeeSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employee\/Specified\s+senior\s+citizen\s+([\s\S]+?)\s+(?:Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank|$)/;
        const employeeSectionMatch = text.match(employeeSectionRegex);
        const employerSectionMatch = text.match(employerSectionRegex);
        
    // Checking if a file is selected
    if (fileInput.files.length === 0) {
        alert("Please select a file to upload");
        return;
    }
    let firstNameEmployee="";

    if (employeeSectionMatch) {
        const nameEmployee = employeeSectionMatch[1].trim();

    
        const nameLineEmployee = nameEmployee.split('\n')[0].trim();
        const namePartsEmployee = nameLineEmployee.split(/\s+/);

        const nameTokensEmployee = namePartsEmployee.slice(0, 3);
        firstNameEmployee=nameTokensEmployee[0];
        // if (nameTokens.length === 2) {
            // firstNameEmployee = nameTokens[0];
            // lastName = nameTokens[1];
        // } else if (nameTokens.length === 3) {
            // firstNameEmployee = nameTokens[0];
            // middleName = nameTokens[1];
            // lastName = nameTokens[2];

            // if (lastName.length === 1 || lastName.length === 2 ) {
            //     lastName = middleName;
            //     middleName = "";
            // } else {
            //     for(let i=0;i<middleName.length;i++){
            //         if(['.', '/', ',','1','2','3','4','5','6','7','8','9','0'].includes(middleName[i])) {
            //             middleName="";
            //             lastName="";
            //         }
            //     }
            //     for (let i = 0; i < lastName.length; i++) {
            //         if (['.', '/', ',','1','2','3','4','5','6','7','8','9','0','-'].includes(lastName[i])) {
            //             lastName = middleName;
            //             middleName = "";
            //             break;
            //         }
            //     }
                
            // }
        // } else if (nameTokens.length > 3) {
            // firstNameEmployee = nameTokens[0];
            // middleName = nameTokens.slice(1, -1).join(' ');
            // lastName = nameTokens[nameTokens.length - 1];
        // } else {
            // firstNameEmployee = nameTokens[0];
        // }
        // sessionStorage.setItem('employeeName',firstName);
    }
    let  firstNameEmployer="";
    if(employerSectionMatch){
    const nameEmployer = employerSectionMatch[1].trim();
    const nameLineEmployer = nameEmployer.split('\n')[0].trim();
    const namePartsEmployer = nameLineEmployer.split(/\s+/);
    const nameTokensEmployer = namePartsEmployer.slice(0, 3);
    firstNameEmployer = nameTokensEmployer[0];
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
    //         if(subCompanyName=="LLP"  ){
    //             companyName+=subCompanyName;
    //             break;
    //         }
    //     }
    //     if(nameAndAddress[i]==' '){
            
    //         companyName+=subCompanyName;
    //         subCompanyName="";
    //     }
        
    //   }
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    const loadingIndicator = document.getElementById('loading');
    const progressText = loadingIndicator.querySelector('.progress');
    const content = document.getElementById('content');
    document.body.classList.add('loading');
    try {
        const response = await fetch("http://localhost:3000/convert", {
            method: 'POST',
            body: formData,
            headers: {
                // 'X-Custom-Header': 'value'  // This triggers a preflight request
                //  'Authorization': ''
            }
        });
        
        console.log(`hello this is api response`,response);
        // clearTimeout(timeoutId);  // Clearing the timeout on successful fetch

        if (!response.ok) {
            throw new Error('Error converting file');
        }
        successMessageShow(`Form 16 Part B.pdf`,formType);
        sessionStorage.setItem('formTypeB','true');
        if(sessionStorage.getItem('formTypeB') && sessionStorage.getItem('formTypeA')){
            document.getElementById('btnUpload').style.display='none';
        }
        else if(!sessionStorage.getItem('formTypeA')){
            const label = document.getElementById('btnUpload');
            label.childNodes.forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = '';
                }
            });
            var newText = document.createTextNode('UPLOAD FORM 16 A');
            label.insertBefore(newText, label.querySelector('input'));
        }else if(sessionStorage.getItem('formTypeA')){
            document.getElementById('btnUpload').style.display='none';
        }
        if(sessionStorage.getItem('formTypeA')){
            document.getElementById('continue').innerHTML=" Continue >>";
        }else{
            document.getElementById('continue').innerHTML=" Continue without form 16";
        }  
        
        const blob = await response.blob();
        console.log("this is blob ",blob)
        const processedPdfUrl = URL.createObjectURL(blob);
        console.log("this is proceespdfurl",processedPdfUrl);
        console.log("i am in the handleforB firstNameEmployee",firstNameEmployee);
        console.log("i am in the handleforB firstNameEmployer",firstNameEmployer);
        extractInformationFromForm16B(processedPdfUrl,firstNameEmployee, firstNameEmployer);
        console.log("extractTextFromPdfFromForm16B  has been called")
    } catch (error) {
        window.alert(`some error occure ${error}`)
        sessionStorage.removeItem('formTypeB')
    }finally {
        document.body.classList.remove('loading');
    }
    }



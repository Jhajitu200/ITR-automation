function typeCheck(text) {
    // const employerSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank\s*(.*?)(?=Name\s+and\s+address\s+of\s+the\s+Employee\/|$)[\s\S]/; 
    // const employeeSectionRegex = /Name\s+and\s+address\s+of\s+the\s+Employee\/Specified\s+senior\s+citizen\s+([\s\S]+?)\s+(?:Name\s+and\s+address\s+of\s+the\s+Employer\/Specified\s+Bank|$)/;
    const formTypeRegex = /PART\s+(A|B)/i;
    const certificateNumberRegexA = /Certificate No\.\s*([A-Z0-9]+)/i;
    const certificateMatchA = text.match(certificateNumberRegexA);
    const certificateNumberRegexB = /Certificate Number:\s*([A-Z0-9]+)/i;
    const certificateMatchB = text.match(certificateNumberRegexB);
    const formTypeMatch = text.match(formTypeRegex);
    // const employeeSectionMatch = text.match(employeeSectionRegex);
    // const employerSectionMatch = text.match(employerSectionRegex);
    console.log("heloo i am jitu kumkar jjha");
    // console.log(text);
    let formTypeA = "";
    let formTypeB = "";
    let certificateA = "";
    let certificateB = "";
    if (formTypeMatch && formTypeMatch.length > 1 && formTypeMatch[1].toUpperCase()=="A") {
        formTypeA = formTypeMatch[1].toUpperCase();
        certificateA= certificateMatchA[1];
        sessionStorage.setItem('certificateA',certificateA);
        console.log("this is certificate number",certificateA);
    }
    if (formTypeMatch && formTypeMatch.length > 1 && formTypeMatch[1].toUpperCase()== "B" ) {
        formTypeB = formTypeMatch[1].toUpperCase();
        certificateB = certificateMatchB[1];
        console.log("this is certificate number",certificateB);
        sessionStorage.setItem('certificateB',certificateB);
    }

    if (formTypeA === "A" && !sessionStorage.getItem('formTypeA')) {
        if(sessionStorage.getItem('formTypeB') && (certificateA!=sessionStorage.getItem('certificateB'))){
            alert('FORM 16 PART A not match with FORM 16 PART B, please upload correct form 16 PART A')
        }else{
        extractInformationFromForm16A(text);
        successMessageShow(`Form 16 Part ${formTypeA}.pdf`,formTypeA);
        document.getElementById('continue').innerHTML=" Continue >>";
        sessionStorage.setItem('formTypeA','true');
        if(sessionStorage.getItem('formTypeB') && sessionStorage.getItem('formTypeA')){
            document.getElementById('btnUpload').style.display='none';
        }
        else if(!sessionStorage.getItem('formTypeB')){
            var label = document.getElementById('btnUpload');
            label.childNodes.forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = '';
                }
            });
            var newText = document.createTextNode('UPLOAD FORM 16 B');
            label.insertBefore(newText, label.querySelector('input'));
            
        } 
    }
    }else if (formTypeB === "B" && !sessionStorage.getItem('formTypeB')) {
        if(sessionStorage.getItem('formTypeA') && (certificateB!=sessionStorage.getItem('certificateA'))){
            // console.log("This is form 16 B",certificateB)
            alert('FORM 16 PART B not match with FORM 16 PART A, please upload correct form 16 PART B')
        }else{
        handleFormB(formTypeB,text);
        
        // sessionStorage.setItem('formTypeB','true');
        }
    } else if(sessionStorage.getItem('formTypeB') && !sessionStorage.getItem('formTypeA')) {
       alert("you have already uploaded form16 PARTB") 
    }
    else if(!sessionStorage.getItem('formTypeB') && sessionStorage.getItem('formTypeA')) {
        alert("you have already uploaded form16 PARTA") 
    }
    else{
        alert("you have uploaded both part PARTA & PARTB")
    }

}

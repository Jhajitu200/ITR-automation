function typeCheck(text) {
    const formTypeRegex = /PART\s+(A|B)/i;
    const certificateNumberRegex = /Certificate No\.\s*([A-Z0-9]+)/i;
    const certificateMatch = text.match(certificateNumberRegex);
    const formTypeMatch = text.match(formTypeRegex);
    console.log("heloo i am jitu kumkar jjha");
    let formTypeA = "";
    let formTypeB = "";
    let certificateA = "";
    let certificateB = "";
    if (formTypeMatch && formTypeMatch.length > 1 && formTypeMatch[1].toUpperCase()=="A") {
        formTypeA = formTypeMatch[1].toUpperCase();
        certificateA= certificateMatch[0];
        console.log(certificateA);
    }
    if (formTypeMatch && formTypeMatch.length > 1 && formTypeMatch[1].toUpperCase()== "B" ) {
        formTypeB = formTypeMatch[1].toUpperCase();
        certificateB = certificateMatch[0];
    }

    if (formTypeA === "A" && !sessionStorage.getItem('formTypeA')) {
        
        extractInformationFromForm16A(text);
        successMessageShow(`Form 16 Part ${formTypeA}.pdf`,formTypeA);
        sessionStorage.setItem('certificateNoA',certificateA);
        sessionStorage.setItem('formTypeA','true');
        if(!sessionStorage.getItem('formTypeB')){
            const label = document.getElementById('btnUpload');
            label.childNodes.forEach(function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = '';
                }
            });
            var newText = document.createTextNode('UPLOAD FORM 16 B');
            label.insertBefore(newText, label.querySelector('input'));
        
        }else if(sessionStorage.getItem('formTypeB')){
            document.getElementById('btnUpload').style.display='none';
        }
    }else if (formTypeB === "B" && !sessionStorage.getItem('formTypeB')) {
        
        handleFormB(formTypeB);
        sessionStorage.setItem('certificateNoB',certificateB);
        sessionStorage.setItem('formTypeB','true');
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

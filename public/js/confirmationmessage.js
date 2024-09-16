
function confirmationMessage(popupMessage,formType) {
    console.log("this is form type",formType);
    var confirmationDialog = $(
        '<div id="confirmation-dialog" class="alert alert-warning alert-dismissible fade show" role="alert" style="position: relative; display: flex; align-items: center; padding: 10px; margin-top: 10px; ">' +
        `<span>Are you sure you want to delete form 16 PART ${formType}? </span>` +
        '<button id="confirm-yes" type="button" class="btn btn-danger" style="margin-left: auto; margin-right: 10px;">Yes</button>' +
        '<button id="confirm-no" type="button" class="btn btn-secondary">No</button>' +
        '</div>'
    );
    console.log("this is form type",formType)

    popupMessage.after(confirmationDialog);    
    confirmationDialog.find('#confirm-yes').on('click', function() {
        
        if(formType == "A"){
            console.log("i am in the under of form tyoe A",formType);
            sessionStorage.removeItem('extractedInfoFromForm16A');
            sessionStorage.removeItem('formTypeA')
            if(!sessionStorage.getItem('formTypeA') && sessionStorage.getItem('formTypeB')){
                uploadButton('UPLOAD FORM 16 A','true');
            }else{
                uploadButton('UPLOAD FORM 16 ','true');
            }
            // var label = document.getElementById('btnUpload');
            // label.childNodes.forEach(function(node) {
            //     if (node.nodeType === Node.TEXT_NODE) {
            //         node.textContent = '';
            //     }
            // });
            // var newText = document.createTextNode('UPLOAD FORM 16 A');
            // label.insertBefore(newText, label.querySelector('input'));
            // if(sessionStorage.getItem('formTypeB')){
            //     document.getElementById('continue').innerHTML=" Continue >>";
            // }else{
            //     document.getElementById('continue').innerHTML=" Continue without form 16";
            // }  
        }else{
            console.log("this is form",formType)
            sessionStorage.removeItem('extractedInfoFromForm16B')
            sessionStorage.removeItem('formTypeB')
            if(sessionStorage.getItem('formTypeA') && !sessionStorage.getItem('formTypeB')){
                uploadButton('UPLOAD FORM 16 B','true');
            }else{
                uploadButton('UPLOAD FORM 16 ',true);
            }
            // var label = document.getElementById('btnUpload');
            // label.childNodes.forEach(function(node) {
            //     if (node.nodeType === Node.TEXT_NODE) {
            //         node.textContent = '';
            //     }
            // });
            // var newText = document.createTextNode('UPLOAD FORM 16 B');
            // label.insertBefore(newText, label.querySelector('input'));
        }
        // function uploadButtonUpdate(message){
        //     console.log("i am  int the uploadButtonUpdate");
        //     var label = document.getElementById('btnUpload');
        //     label.childNodes.forEach(function(node) {
        //         if (node.nodeType === Node.TEXT_NODE) {
        //             node.textContent = '';
        //         }
        //     });
        //     var newText = document.createTextNode(message);
        //     label.insertBefore(newText, label.querySelector('input'));
        // }
        // if(!sessionStorage.getItem('formTypeA') && !sessionStorage.getItem('formTypeB')){
        //     console.log("both of the fomr has been deletd")
        //     document.getElementsByClassName('info')[0].style.display="block";
        //     var label = document.getElementById('btnUpload');
        //     label.childNodes.forEach(function(node) {
        //         if (node.nodeType === Node.TEXT_NODE) {
        //             node.textContent = '';
        //         }
        //     });
        //     var newText = document.createTextNode('UPLOAD FORM 16');
        //     label.insertBefore(newText, label.querySelector('input'));   
        // }
        // else if(sessionStorage.getItem('formTypeA') && !sessionStorage.getItem('formTypeB')){
        //     console.log("form 16 part has been deleted");
        //     var label = document.getElementById('btnUpload');
        //     label.childNodes.forEach(function(node) {
        //         if (node.nodeType === Node.TEXT_NODE) {
        //             node.textContent = '';
        //         }
        //     });
        //     var newText = document.createTextNode('UPLOAD FORM 16 B');
        //     label.insertBefore(newText, label.querySelector('input')); 
        // }
        // else if(!sessionStorage.getItem('formTypeA') && sessionStorage.getItem('formTypeB')){
        //     var label = document.getElementById('btnUpload');
        //     label.childNodes.forEach(function(node) {
        //         if (node.nodeType === Node.TEXT_NODE) {
        //             node.textContent = '';
        //         }
        //     });
        //     var newText = document.createTextNode('UPLOAD FORM 16 A');
        //     label.insertBefore(newText, label.querySelector('input')); 
        // }
        confirmationDialog.html('Your data has been deleted. Please upload another form 16.');

        setTimeout(function() {
            confirmationDialog.remove();
        }, 2000);

        
        popupMessage.remove();
    });

    
    confirmationDialog.find('#confirm-no').on('click', function() {
        confirmationDialog.remove();
    });
}

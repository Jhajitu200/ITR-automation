function successMessageShow(message,formType) {
    var popupMessage = $(
        '<div id="popup-message" class="alert alert-success alert-dismissible fade show" role="alert" style="position: relative;margin-top:10px; display: flex; align-items: center; justify-content: center; padding: 10px; margin-top: 10px; width: 90%; margin: auto; margin-top: 10px;text-align: center;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);">' +
        '<img src="public/images/icons/pdf-icon.jpg" alt="PDF" style="width: 20px; height: 20px; margin-right: 10px;">' +
        `${message}` +
        '<img src="public/images/icons/Ok.png" alt="PDF" style="width: 20px; height: 20px; margin-right: 10px;">' +
        'uploaded' +
        '<button type="button" class="close" aria-label="Close" style="position: absolute; top: 0; right: 0; padding: 10px; background: none; border: none; font-size: 1.5rem; line-height: 1;">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>'
    );
    
    $('.form-row').first().before(popupMessage);
    document.getElementsByClassName('info')[0].style.display="none";
    popupMessage.find('.close').on('click', function(event) {
        event.preventDefault();
        console.log("this is formtype",formType);
        confirmationMessage(popupMessage,formType);
    }); 

}



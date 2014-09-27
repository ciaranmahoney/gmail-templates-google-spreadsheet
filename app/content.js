//Function to insert linebreaks (<br> tags) when there is a linebreaks in the text. 
function lineBreaks (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
};

//Function to insert the email template data we setup in popup.js
function insertTemplate () {

    //Get the stored variables we created on the click event in popup.js
    chrome.storage.local.get(['emailSubject', 'emailBody'], function (result) {
        var emailSubject = result.emailSubject;
        var emailBodyRaw = result.emailBody;
        var emailBody = lineBreaks(emailBodyRaw, false);

        //Confirm box to give user the option to replace subject line, or not.
        if (confirm("Replace subject line? Click OK to replace or CANCEL to keep existing.")){

            //Inserts data to respective areas in the Gmail compose message screen
            $(".Am.Al.editable").prepend(emailBody);
            $("input[name='subjectbox'").val(emailSubject);
            console.log(emailBody);
        } else {
            $(".Am.Al.editable").prepend(emailBody);
        };
    });
};


// Load function when windows is loaded
window.onload = insertTemplate();
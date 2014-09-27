// Let's Rock 'n' Roll!!!

//Function to get the email template data from the Google Spreadsheet
function getJson () {
	//Get the saved Spreadsheet JSONified URL.
	chrome.storage.local.get('savedUrl', function (result) {
        var jsonUrl = result.savedUrl;
   		
        //Send ajax call to get spreadsheet data
		$.getJSON(jsonUrl, function(data) {

			//Prepare Templates HTML variable. We will build the template data and then evetually display this.
			var templatesHTML = '';

			// Loop through rows to get title, description, subject, body from spreadsheet
			$.each(data.feed.entry, function(index, template){
				//Display list of available templates
				templatesHTML += ' <h2 class="templateTitle">' 
					+ template.gsx$title.$t 
					+ '</h2><p class="templateDescription"><button class="insertTemplate">INSERT</button>' 
					+ template.gsx$description.$t 
					+ '</p> <p class="templateSubject">' 
					+ template.gsx$subject.$t + '</p> <p class="templateBody">' 
					+ template.gsx$body.$t + '</p>';
			})
			
			// Display templates HTML in templatesList ID div
			$('#templatesList').html(templatesHTML);
		});	
	});
};

//Function to prepare the selected template data and run the content.js file, which inserts it into the Gmail message
function sendTemplate () {

	// Do some stuff on the click event for the button inside templatesList ID
	$('#templatesList').on('click', 'button.insertTemplate', (function(cl){
		//Prevent any default actions on the button
		cl.preventDefault();

		//Create variables for the subject and body bvy grabbing the data from the existing paragraphs 
		var templateSubject = $(this).parent().next().text();
		var templateBody = $(this).parent().next().next().html();

		//Store these variables in chrome local storage so they can be retrived from content.js. We don't need any callback function here.
		chrome.storage.local.set({'emailSubject': templateSubject, 'emailBody': templateBody});

		//Once everything is ready to go, we execute jquery and then content.js script.
		chrome.tabs.executeScript(null, {file: 'jquery-2.1.1.min.js'}, function(){
			chrome.tabs.executeScript(null, {file: 'content.js'}); 

			//Once the click event is completed and we have trigged conject.js, we close the popup window.
			window.close();
		});
	}));
};

// Load functions once the window is completely loaded.
window.onload = function () {
	getJson();
	sendTemplate();
};

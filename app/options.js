//Saves options to chrome.storage
function save_options() {
	//We expect people to copy and paste a full Google Spreadsheet URL into the options box.
	var spreadsheetUrl = document.getElementById("spreadsheetUrl").value;

	//But we need to use the json version of the url. 
	//Therefore, we strip out everything but the key and do some concatenation to create the json url
	var jsonUrl = "https://spreadsheets.google.com/feeds/list/" + spreadsheetUrl.match(/[-\w]{25,}/) + "/od6/public/values?alt=json-in-script&callback=?";

	//Now we store that json url in chrome storage
	chrome.storage.local.set( {"savedUrl": jsonUrl}, function() {
		//This posts a temporary message to confirm options saved
		var status = document.getElementById('status');
		status.textContent = "URL Saved";
		setTimeout(function(){
			status.textContent = '';
		}, 5000);
	});
}

//Restore options from chrome storage
function restore_options() {
	chrome.storage.local.get({
		savedUrl:'Not set'
	}, function(items){
		document.getElementById('spreadsheetUrl').value = items.savedUrl;
	});
}

// Call the functions 
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
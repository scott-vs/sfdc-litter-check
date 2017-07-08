// SFDC login
var nforce = require('nforce');

var fs = require("fs");
var sfdcConfig = JSON.parse(fs.readFileSync("sfdc-config.js"));

var clientId = sfdcConfig.SFDC_CLIENT_ID;
var clientSecret = sfdcConfig.SFDC_CLIENT_SECRET;
var userName = sfdcConfig.SFDC_USERNAME;
var password = sfdcConfig.SFDC_PASSWORD;

var org = nforce.createConnection({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single',
  autoRefresh: true
});
var oauth;

org.authenticate({ username: userName, password: password}, function(err, resp){
  if(!err) {
  	console.log('Logged into SFDC');
  	oauth = org.oauth;
  	queryButtonAddresses();
  } else console.log(err);
});

// dash button functions
var buttonMappings = {};

var getButtonAddresses = function(){
	var buttonAddresses = [];
	for (var key in buttonMappings)
		buttonAddresses.push(key);
	return buttonAddresses;
}

var queryButtonAddresses = function(){
	var q = 'SELECT Name, Dash_Button_Address__c FROM Litter_Box__c';
	org.query({ query: q, oauth: oauth}, function(err, resp){
		if (!err){
			for (var x in resp.records){
				var record = resp.records[x];
				buttonMappings[record.get('dash_button_address__c')] = record.get('name');
			}
			startButtonListener();
		} else console.log(err);
	});
}

var handelButtonPress = function (dash_id){
    var location = buttonMappings[dash_id];
    if (location != null)
    	publishCleanEvent(location);
}

var publishCleanEvent = function(location){
	var cleanEvent = nforce.createSObject('Litter_Clean__e');

	cleanEvent.set('Location__c',location);

	org.insert({ sobject: cleanEvent, oauth: oauth }, function(err, resp){
  		if(!err) console.log('Clean Event for '+location+' sent to SFDC.');
  		else console.log(err);
	});
}

var startButtonListener = function(){
	var dash_button = require('node-dash-button');
	var dash = dash_button(getButtonAddresses(), null, null, 'all'); //address from step above 
	dash.on("detected",handelButtonPress);
	console.log('dash button listener started');
}

console.log("sfdc-litter-check loaded.");
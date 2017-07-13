({
	doInit : function(component, event, helper) {
		var cleanDate = new Date(component.get('v.litterBox.Last_Clean__c'));
        component.set('v.cleanDate', cleanDate);
        
        var oneDayAgo = Date.now()-(24*60*60*1000);
        var twoDaysAgo = Date.now()-(2*24*60*60*1000);
        
        if (cleanDate < twoDaysAgo)
            component.set('v.backgroundColor', 'red');
        else if (cleanDate < oneDayAgo)
            component.set('v.backgroundColor', 'yellow');
	}
})
({
	getLitterBoxes : function(component) {
		var action = component.get("c.getLitterBoxes");
        action.setParam('recordId', component.get('v.recordId'));
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.litterBoxes", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})
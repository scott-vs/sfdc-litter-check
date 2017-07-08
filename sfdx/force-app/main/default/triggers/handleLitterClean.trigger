trigger handleLitterClean on Litter_Clean__e (after insert) {
    
    // gather locations
    List<String> locationList = new List<String>();
    for (Litter_Clean__e cleanEvent : Trigger.new)
        locationList.add(cleanEvent.Location__c);
    
    // find boxes in those locations
    List<Litter_Box__c> litterBoxes = [SELECT Id FROM Litter_Box__c WHERE Name =: locationList];
    
    // update last clean field
    for (Litter_Box__c litterBox : litterBoxes){
        litterBox.Last_Clean__c = System.now();
    }
    update litterBoxes;
}
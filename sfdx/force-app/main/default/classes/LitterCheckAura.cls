public class LitterCheckAura {

    @AuraEnabled
    public static List<Litter_Box__c> getLitterBoxes(String recordId) {
        if (recordId == null)
        	return [SELECT Id, Name, Last_Clean__c FROM Litter_Box__c ORDER BY Last_Clean__c ASC];
        return [SELECT Id, Name, Last_Clean__c FROM Litter_Box__c WHERE Id =: recordId];
    }
}
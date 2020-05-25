public class FieldLocationTH 
{
    public void afterInsertOrUpdate(FieldLocation__c fieldLoc)
    {
        LocationService.setCoordinates(fieldLoc.Id);
    }
}

public class LocationService 
{
    @future(callout=true)
    public static void setCoordinates(String fieldLocId)
    {
        List<FieldLocation__c> field_loc = [
            SELECT Street__c,PostalCode__c, State__c, City__c,Country__c
            FROM FieldLocation__c WHERE Id =: fieldLocId
        ];

        if(field_loc.size() == 0 )
        {
            throw new LocationServiceException('No Field Location found!');
        }
        String address = '';
        address = field_loc[0].Street__c != null ? address + field_loc[0].Street__c + ',' : address + ' ,';
        address = field_loc[0].City__c != null ? address + field_loc[0].City__c + ',' : address + ' ,';
        address = field_loc[0].State__c != null ? address + field_loc[0].State__c + ',' : address + ' ,';
        address = field_loc[0].PostalCode__c != null ? address + field_loc[0].PostalCode__c + ',' : address + ' ,';
        address = EncodingUtil.urlEncode(address, 'UTF-8');

        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=false');
        req.setMethod('GET');
        req.setTimeout(5000);
        HttpResponse res = http.send(req);
        /*JSONParser parser = JSON.createParser(res.getBody());
        double lat = null;
        double lon = null;

        if (lat != null)
        {
            field_loc[0].Coordinates__Latitude__s = lat;
            field_loc[0].Coordinates__Longitude__s = lon;
            update field_loc;
        }*/
    }

    public class LocationServiceException extends Exception{}
}
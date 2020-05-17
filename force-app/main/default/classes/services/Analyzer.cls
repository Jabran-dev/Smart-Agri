@RestResource(urlMapping='/Analyzer/*')
global class Analyzer 
{

    static String FERTILIZATION_TYPE = 'Fertilization';
    static String IRRIGATION_TYPE = 'Irrigation';

    @HttpPost
    global static void doPost() 
    { 
        
        RestResponse res = RestContext.response;
        RestRequest req = RestContext.request;
        RestContext.response.addHeader('Content-Type', 'application/json'); 
        Map<String, Object> response_body = new Map<String, Object>();
        try
        {
            Blob body = req.requestBody;
            Map<String, Object> request_body = (Map<String, Object>)JSON.deserializeUntyped(body.toString());
            String service_type = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
            
            if(String.isEmpty(service_type) || service_type.equalsIgnoreCase('Null'))
            {
                throw new AnalyzerException(Label.ServiceTypeNotDefined);
            }

            if(service_type.equalsIgnoreCase(FERTILIZATION_TYPE))
            {
                response_body = fertilizationService(request_body);
            }
            res.statusCode = 200;
        }
        catch(Exception ex)
        {
            res.statusCode = 400;
            response_body.put('errorCode', 'APEX_ERROR');
            response_body.put('message', ex.getMessage());
        }
        finally 
        {
            res.responseBody = Blob.valueOf(JSON.serializePretty(response_body));
        }
    }

    private static Map<String, Object> fertilizationService(Map<String, Object> requestBody)
    {
        List<FertilizationPlanner__c> fertilization_planner = [
            SELECT Id, Day__c, Nitrogen__c, Phosphorus__c,
            Potassium__c FROM FertilizationPlanner__c
            WHERE ScheduleDate__c =: date.valueOf('2020-06-15')
        ];

        if(fertilization_planner.size() == 0)
        {
            throw new  AnalyzerException(Label.NotFound.replace('{!sobject}', SObjectType.FertilizationPlanner__c.getLabel()));           
        }

        Map<String, Object> response_body = new Map<String, Object>();
        Decimal nitrogen = (Decimal)requestBody.get('Nitrogen');
        Decimal phosphorus = (Decimal)requestBody.get('Phosphorus');
        Decimal potassium = (Decimal)requestBody.get('Potassium');

        Decimal actuator_nitrogen = fertilization_planner[0].Nitrogen__c - nitrogen;
        Decimal actuator_phosphorus = fertilization_planner[0].Phosphorus__c - phosphorus;
        Decimal actuator_potassium = fertilization_planner[0].Potassium__c - potassium;

        if(actuator_nitrogen > 0 || actuator_phosphorus > 0 || actuator_potassium > 0)
        {
            response_body.put('Message', 'Recommended');
        }
        else 
        {
            response_body.put('Message', 'Not Recommended');    
        }

        response_body.put('Suggested Nitrogen', actuator_nitrogen);
        response_body.put('Suggested Phosphorus', actuator_phosphorus);
        response_body.put('Suggested Potassium', actuator_potassium);
        
        return response_body;
    }

    public class AnalyzerException extends Exception{}
}
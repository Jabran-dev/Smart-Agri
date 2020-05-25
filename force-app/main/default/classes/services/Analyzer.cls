@RestResource(urlMapping='/Analyzer/*')
global class Analyzer 
{

    static String FERTILIZATION_TYPE = 'Fertilization';
    static String IRRIGATION_TYPE = 'Irrigation';
    static String WEATHER_API_KEY = '2fd1f5080d164626353fa9c2f7e8abbb';

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

            if(service_type.equalsIgnoreCase(IRRIGATION_TYPE))
            {
                response_body = irrigationService(request_body);
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

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> fertilizationService(Map<String, Object> requestBody)
    {
        List<FertilizationPlanner__c> fertilization_planner = [
            SELECT Id, Day__c, Nitrogen__c, Phosphorus__c,
            Potassium__c FROM FertilizationPlanner__c
            WHERE ScheduleDate__c =: System.today()
        ];

        if(fertilization_planner.size() == 0)
        {
            throw new AnalyzerException(Label.NotFound.replace('{!sobject}', SObjectType.FertilizationPlanner__c.getLabel()));           
        }

        Map<String, Object> response_body = new Map<String, Object>();
        Decimal nitrogen = Decimal.valueOf(String.valueOf(requestBody.get('Nitrogen')));
        Decimal phosphorus = Decimal.valueOf(String.valueOf(requestBody.get('Phosphorus')));
        Decimal potassium = Decimal.valueOf(String.valueOf(requestBody.get('Potassium')));

        Decimal actuator_nitrogen = fertilization_planner[0].Nitrogen__c - nitrogen;
        Decimal actuator_phosphorus = fertilization_planner[0].Phosphorus__c - phosphorus;
        Decimal actuator_potassium = fertilization_planner[0].Potassium__c - potassium;

        if(actuator_nitrogen > 0 || actuator_phosphorus > 0 || actuator_potassium > 0)
        {
            response_body.put('Message', 'Recommended: Amount of fertilizers are low');
        }
        else 
        {
            response_body.put('Message', 'Not Recommended: Aount of fertilizers meets the requirements');
        }

        response_body.put('Suggested Nitrogen', actuator_nitrogen);
        response_body.put('Suggested Phosphorus', actuator_phosphorus);
        response_body.put('Suggested Potassium', actuator_potassium);
        
        return response_body;
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> irrigationService(Map<String, Object> requestBody)
    {
        List<IrrigationPlanner__c> irrigation_planner = [
            SELECT Id, Day__c, WaterLevel__c, ScheduleDate__c
            FROM IrrigationPlanner__c
            WHERE ScheduleDate__c =: System.today()
        ];

        if(irrigation_planner.size() == 0)
        {
            throw new  AnalyzerException(Label.NotFound.replace('{!sobject}', SObjectType.IrrigationPlanner__c.getLabel()));           
        }

        Map<String, Object> response_body = new Map<String, Object>();
        Decimal water_level = Decimal.valueOf(String.valueOf(requestBody.get('Water Level')));
        
        Decimal actuator_water_level = irrigation_planner[0].WaterLevel__c - water_level;

        if(actuator_water_level > 0)
        {
            FieldLocation__c field_loc = getFieldLocation();
            System.debug('>>>>>>>');
            System.debug(field_loc);
            Weather weather_data = weatherService(
                String.valueOf(field_loc.Coordinates__Latitude__s), 
                String.valueOf(field_loc.Coordinates__Longitude__s),
                'current,minutely,hourly'
            );
            if(weather_data.isRainForcast())
            {
                response_body.put('Message', 'Not Recommended: The rain is forcasted for today');
            }
            else 
            {
                response_body.put('Message', 'Recommended: The water level is low');
            }        
            
        }
        else 
        {
            response_body.put('Message', 'Not Recommended: The water level meet the requirements');    
        }

        response_body.put('Suggested Water Level', actuator_water_level);
        
        return response_body;
    }

    

    public static Weather weatherService(String lat, String lon, String exclude)
    {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String request_params = 'lat={!lat}&lon={!lon}&appid={!api_key}';
        request_params = request_params.replace('{!lat}', lat);
        request_params = request_params.replace('{!lon}', lon);
        request_params = request_params.replace('{!api_key}', WEATHER_API_KEY);
        String request_url = 'https://api.openweathermap.org/data/2.5/onecall';
        request.setEndpoint(request_url+'?'+request_params);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        Weather weather_data;
        if (response.getStatusCode() == 200) 
        {
            Map<String, Object> weather_obj = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> weather_forcast_list = (List<Object>) weather_obj.get('daily');
            if(weather_forcast_list.size() == 0)
            {
                throw new AnalyzerException(Label.WeatherServiceDown);
            }

            weather_data = new Weather(
                (Map<String,Object>)weather_forcast_list[0]
            );
        }
        else 
        {
            throw new AnalyzerException(Label.WeatherServiceDown);
        }
        return weather_data;
    }

    public static FieldLocation__c getFieldLocation()
    {
        List<FieldLocation__c> field_loc = [
            SELECT Coordinates__Latitude__s, Coordinates__Longitude__s
            FROM FieldLocation__c WHERE isActive__c = true
            LIMIT 1
        ];
        if(field_loc.size() == 0)
        {
            throw new AnalyzerException('No Active Field Location is Found');
        }
        return field_loc[0];
    }
    public class AnalyzerException extends Exception{}
}
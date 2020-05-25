public class Weather {

    Datetime dt {get;set;}
    Datetime sunrise {get;set;}
    Datetime sunset {get;set;}
    Decimal tempMin {get;set;}
    Decimal tempMax {get;set;}
    Decimal pressure {get;set;}
    Decimal humidity {get;set;}

    Integer THUNDERSTORM_START_CODE = 200, THUNDERSTORM_END_CODE = 232, 
    DRIZZLE_START_CODE = 300, DRIZZLE_END_CODE = 321, 
    RAIN_START_CODE = 500, RAIN_END_CODE = 531;

    public Map<String, WeatherCondition> weatherConditions;

    public Weather(Map<String, Object> weather_data)
    {
        dt = convertTimestamp(weather_data.get('dt'));
        sunrise = convertTimestamp(weather_data.get('sunrise'));
        sunset = convertTimestamp(weather_data.get('sunset')); 
        Map<String, Object> temp = (Map<String,Object>)weather_data.get('temp');
        
        tempMin = kelvinToCelsius((Decimal)temp.get('min'));
        tempMax = kelvinToCelsius((Decimal)temp.get('max'));
        pressure = (Decimal)weather_data.get('pressure');
        humidity = (Decimal)weather_data.get('humidity');

        List<Object> weather_list = (List<Object>) weather_data.get('weather');
        weatherConditions = new Map<String, WeatherCondition>();
        for(Object obj : weather_list)
        {
            Map<String, Object> weather_map = (Map<String,Object>)obj;
            weatherConditions.put(
                String.valueOf(weather_map.get('id')),
                new WeatherCondition(
                    String.valueOf(weather_map.get('id')),
                    String.valueOf(weather_map.get('main'))
                )
            );
        } 
    }

    Decimal kelvinToCelsius(Decimal kelvin)
    {
        return kelvin - 273.15;
    }

    Datetime convertTimestamp(Object value)
    {
        datetime date_obj = datetime.newInstance(0);
        Integer timestamp = Integer.valueOf(String.valueOf(value));
        date_obj = date_obj.addSeconds(timestamp);
        return date_obj;
    }
    
    public boolean isRainForcast()
    {
        Boolean is_rain_forcast = false;
        for(String key : this.weatherConditions.keySet())
        {
            Integer key_val = Integer.valueOf(key);
            if(key_val >= THUNDERSTORM_START_CODE && key_val <= THUNDERSTORM_END_CODE)
            {
                is_rain_forcast = true;
                break;
            }
            else if(key_val >= DRIZZLE_START_CODE && key_val <= DRIZZLE_END_CODE)
            {
                is_rain_forcast = true;
                break;
            }
            else if(key_val >= RAIN_START_CODE && key_val <= RAIN_END_CODE)
            {
                is_rain_forcast = true;
                break;
            }
        }
        return is_rain_forcast;
    }

    public class WeatherCondition 
    {
        String id {get;set;}
        String main {get;set;}
        public WeatherCondition(String id, String main)
        {
            this.id = id;
            this.main = main;
        }
    }
}

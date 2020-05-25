import { LightningElement } from 'lwc';
import fertilizationService from '@salesforce/apex/Analyzer.fertilizationService';
import irrigationService from '@salesforce/apex/Analyzer.irrigationService';

export default class Analyzer extends LightningElement {
    nitrogen = 0.0;
    phosphorus = 0.0;
    potassium = 0.0;
    water_level = 0.0;

    input_window = true;
    output_window = false;
    rec_nitrogen = 0.0;
    rec_phosphorus = 0.0;
    rec_potassium = 0.0;
    npk_message = '';
    npk_error = '';
    npk_reason = '';
    rec_water_level = 0.0;
    wl_message = '';
    wl_error = '';
    wl_reason = '';
    

    handleChange(event) 
    {
        const field = event.target.name;
        if (field === 'nitrogen') 
        {
            this.nitrogen = event.target.value;
        } 
        else if (field === 'phosphorus') 
        {
            this.phosphorus = event.target.value;
        }
        else if (field === 'potassium') 
        {
            this.potassium = event.target.value;
        }
        else if (field === 'water_level') 
        {
            this.water_level = event.target.value;
        }
    }
    analyzeState()
    {
        var fertilization_map = {};
        fertilization_map["Nitrogen"] = this.nitrogen;
        fertilization_map["Phosphorus"] = this.phosphorus;
        fertilization_map["Potassium"] = this.potassium;
        fertilizationService({ requestBody: fertilization_map })
        .then((result) => {
            console.log(result);
            this.rec_nitrogen = result["Suggested Nitrogen"];
            this.rec_phosphorus = result["Suggested Phosphorus"];
            this.rec_potassium = result["Suggested Potassium"];
            this.npk_message = result["Message"];      
        })
        .catch((error) => {
            this.npk_error = error;
            console.log(this.npk_error);
        });

        var irrigation_map = {};
        irrigation_map["Water Level"] = this.water_level;
        
        irrigationService({ requestBody: irrigation_map })
        .then((result) => {
            this.rec_water_level = result["Suggested Water Level"];
            this.wl_message = result["Message"];
            this.input_window = false;
            this.output_window = true;
        })
        .catch((error) => {
            this.wl_error = error;
        });

    }

    reenter()
    {
        this.input_window = true;
        this.output_window = false;
    }
}
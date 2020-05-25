import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue  } from 'lightning/uiRecordApi';
import STREET_FIELD from '@salesforce/schema/FieldLocation__c.Street__c';
import STATE_FIELD from '@salesforce/schema/FieldLocation__c.State__c';
import CITY_FIELD from '@salesforce/schema/FieldLocation__c.City__c';

export default class LocationMap extends LightningElement {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: [STREET_FIELD, STATE_FIELD, CITY_FIELD] })
    field_loc;

    
    get mapMarkers()
    {
        let map_markers = [
            {
                location: {
                    Street: this.field_loc.data.fields.Street__c.value,
                    State: this.field_loc.data.fields.State__c.value,
                    City: this.field_loc.data.fields.City__c.value
                },
    
                title: this.field_loc.data.fields.Street__c.value,
            }
        ];
        return map_markers;
    }
}
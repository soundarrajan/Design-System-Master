import { Injectable } from '@angular/core';

@Injectable()
export class JSONSchemaFormBuilder {
  /**
   * Build the schema of the Configurable UI
   * @param arrayOfSchemaProperties
   */
  buildSchema(arrayOfSchemaProperties: any): any {
    const requiredArray = this.getRequiredFields(arrayOfSchemaProperties);
    const pattern_array: [any] = [{ key: '', pattern: '' }];
    pattern_array.pop();

    let properties = {};
    for (let i = 0; i < arrayOfSchemaProperties.length; i++) {
      const minLength = arrayOfSchemaProperties[i].minLength !== undefined ? arrayOfSchemaProperties[i].minLength : 0;
      const maxLength = arrayOfSchemaProperties[i].maxLength !== undefined ? arrayOfSchemaProperties[i].maxLength : 524288;
      const minimum = arrayOfSchemaProperties[i].minimum !== undefined ? arrayOfSchemaProperties[i].minimum : -1e12;
      const maximum = arrayOfSchemaProperties[i].maximum !== undefined ? arrayOfSchemaProperties[i].maximum : 1e12;
      if (arrayOfSchemaProperties[i].pattern !== undefined && arrayOfSchemaProperties[i].pattern !== '' && arrayOfSchemaProperties[i].pattern !== null) {
        pattern_array.push({ key: arrayOfSchemaProperties[i].key, pattern: arrayOfSchemaProperties[i].pattern });
      }

      if (arrayOfSchemaProperties[i].innerType === 'numbermd') {
        arrayOfSchemaProperties[i].type = 'number';
      }
      properties[arrayOfSchemaProperties[i].key] = arrayOfSchemaProperties[i];

      properties[arrayOfSchemaProperties[i].key]['minimum'] = minimum;
      properties[arrayOfSchemaProperties[i].key]['maximum'] = maximum;
      properties[arrayOfSchemaProperties[i].key]['maxLength'] = maxLength;
      properties[arrayOfSchemaProperties[i].key]['minLength'] = minLength;

      // properties += '"' + arrayOfSchemaProperties[i].key + '":{' + '"title":"' + arrayOfSchemaProperties[i].title
      //     + '","mapTo":"' + arrayOfSchemaProperties[i].mapTo+ '"notitle":"' + arrayOfSchemaProperties[i].notitle +
      //     + '","type":"' + arrayOfSchemaProperties[i].type + '","minLength":' + minLength
      //     + ',"maxLength":' + maxLength + ',"minimum":' + minimum + ',"maximum":' + maximum + ',"pattern":""},';
    }
    // if (properties.length > 1) {
    //     properties = properties.substr(0, properties.length - 1);
    // }
    // properties = properties + '}';
    // properties = JSON.parse(properties);

    for (let i = 0; i < pattern_array.length; ++i) {
      const prop: any = properties[pattern_array[i].key];
      prop.pattern = pattern_array[i].pattern;
    }

    var schemaJSON = {
      type: 'object',
      required: requiredArray,
      properties
    };

    return schemaJSON;
  }
  /**
   * Get the array of Required Fields in from Schema Properties
   * @param arrayOfSchemaProperties
   */
  getRequiredFields(arrayOfSchemaProperties: any): any {
    const arr = arrayOfSchemaProperties.filter(function(element) {
      return element.required === true;
    });
    const finalArray = [];
    for (let i = 0; i < arr.length; i++) {
      var index = finalArray.findIndex(x => x === arr[i].key);
      if (index === -1) finalArray.push(arr[i].key);
    }
    return finalArray;
  }
}

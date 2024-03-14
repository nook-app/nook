/* tslint:disable */
/* eslint-disable */
/**
 * Once Upon
 * API documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BioDto
 */
export interface BioDto {
    /**
     * Text of the bio
     * @type {string}
     * @memberof BioDto
     */
    text: string;
    /**
     * List of mentioned profiles
     * @type {Array<string>}
     * @memberof BioDto
     */
    mentionedProfiles: Array<string>;
}

/**
 * Check if a given object implements the BioDto interface.
 */
export function instanceOfBioDto(value: object): boolean {
    if (!('text' in value)) return false;
    if (!('mentionedProfiles' in value)) return false;
    return true;
}

export function BioDtoFromJSON(json: any): BioDto {
    return BioDtoFromJSONTyped(json, false);
}

export function BioDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BioDto {
    if (json == null) {
        return json;
    }
    return {
        
        'text': json['text'],
        'mentionedProfiles': json['mentionedProfiles'],
    };
}

export function BioDtoToJSON(value?: BioDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'text': value['text'],
        'mentionedProfiles': value['mentionedProfiles'],
    };
}


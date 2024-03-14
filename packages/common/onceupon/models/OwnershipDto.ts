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
 * @interface OwnershipDto
 */
export interface OwnershipDto {
    /**
     * 
     * @type {number}
     * @memberof OwnershipDto
     */
    chainId: number;
    /**
     * 
     * @type {string}
     * @memberof OwnershipDto
     */
    token: string;
    /**
     * 
     * @type {string}
     * @memberof OwnershipDto
     */
    owner: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof OwnershipDto
     */
    tokens?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof OwnershipDto
     */
    totalTokens?: number;
    /**
     * 
     * @type {string}
     * @memberof OwnershipDto
     */
    netValue?: string;
}

/**
 * Check if a given object implements the OwnershipDto interface.
 */
export function instanceOfOwnershipDto(value: object): boolean {
    if (!('chainId' in value)) return false;
    if (!('token' in value)) return false;
    if (!('owner' in value)) return false;
    return true;
}

export function OwnershipDtoFromJSON(json: any): OwnershipDto {
    return OwnershipDtoFromJSONTyped(json, false);
}

export function OwnershipDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): OwnershipDto {
    if (json == null) {
        return json;
    }
    return {
        
        'chainId': json['chainId'],
        'token': json['token'],
        'owner': json['owner'],
        'tokens': json['tokens'] == null ? undefined : json['tokens'],
        'totalTokens': json['totalTokens'] == null ? undefined : json['totalTokens'],
        'netValue': json['netValue'] == null ? undefined : json['netValue'],
    };
}

export function OwnershipDtoToJSON(value?: OwnershipDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'chainId': value['chainId'],
        'token': value['token'],
        'owner': value['owner'],
        'tokens': value['tokens'],
        'totalTokens': value['totalTokens'],
        'netValue': value['netValue'],
    };
}


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
import type { Attribute } from './Attribute';
import {
    AttributeFromJSON,
    AttributeFromJSONTyped,
    AttributeToJSON,
} from './Attribute';

/**
 * 
 * @export
 * @interface ENSDto
 */
export interface ENSDto {
    /**
     * ENS node
     * @type {string}
     * @memberof ENSDto
     */
    node?: string;
    /**
     * ENS name
     * @type {string}
     * @memberof ENSDto
     */
    name: string;
    /**
     * ENS owner address
     * @type {string}
     * @memberof ENSDto
     */
    owner?: string;
    /**
     * ENS token ID
     * @type {string}
     * @memberof ENSDto
     */
    tokenId?: string;
    /**
     * ENS reverse
     * @type {string}
     * @memberof ENSDto
     */
    reverse?: string;
    /**
     * List of attributes associated with the ENS
     * @type {Array<Attribute>}
     * @memberof ENSDto
     */
    attributes?: Array<Attribute>;
}

/**
 * Check if a given object implements the ENSDto interface.
 */
export function instanceOfENSDto(value: object): boolean {
    if (!('name' in value)) return false;
    return true;
}

export function ENSDtoFromJSON(json: any): ENSDto {
    return ENSDtoFromJSONTyped(json, false);
}

export function ENSDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ENSDto {
    if (json == null) {
        return json;
    }
    return {
        
        'node': json['node'] == null ? undefined : json['node'],
        'name': json['name'],
        'owner': json['owner'] == null ? undefined : json['owner'],
        'tokenId': json['tokenId'] == null ? undefined : json['tokenId'],
        'reverse': json['reverse'] == null ? undefined : json['reverse'],
        'attributes': json['attributes'] == null ? undefined : ((json['attributes'] as Array<any>).map(AttributeFromJSON)),
    };
}

export function ENSDtoToJSON(value?: ENSDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'node': value['node'],
        'name': value['name'],
        'owner': value['owner'],
        'tokenId': value['tokenId'],
        'reverse': value['reverse'],
        'attributes': value['attributes'] == null ? undefined : ((value['attributes'] as Array<any>).map(AttributeToJSON)),
    };
}


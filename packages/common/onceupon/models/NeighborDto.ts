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
 * @interface NeighborDto
 */
export interface NeighborDto {
    /**
     * Address of the neighbor.
     * @type {string}
     * @memberof NeighborDto
     */
    address: string;
    /**
     * Chain ID associated with the neighbor.
     * @type {number}
     * @memberof NeighborDto
     */
    chainId: number;
    /**
     * Timestamp or number indicating the last run.
     * @type {number}
     * @memberof NeighborDto
     */
    lastRun: number;
    /**
     * Gifts given by the neighbor, with key-value pairs representing address and amount.
     * @type {{ [key: string]: number; }}
     * @memberof NeighborDto
     */
    gifted: { [key: string]: number; };
    /**
     * Gifts received by the neighbor, with key-value pairs representing address and amount.
     * @type {{ [key: string]: number; }}
     * @memberof NeighborDto
     */
    received: { [key: string]: number; };
    /**
     * Other neighbors connected to this neighbor, with key-value pairs representing address and some numeric metric or count.
     * @type {{ [key: string]: number; }}
     * @memberof NeighborDto
     */
    neighbors: { [key: string]: number; };
}

/**
 * Check if a given object implements the NeighborDto interface.
 */
export function instanceOfNeighborDto(value: object): boolean {
    if (!('address' in value)) return false;
    if (!('chainId' in value)) return false;
    if (!('lastRun' in value)) return false;
    if (!('gifted' in value)) return false;
    if (!('received' in value)) return false;
    if (!('neighbors' in value)) return false;
    return true;
}

export function NeighborDtoFromJSON(json: any): NeighborDto {
    return NeighborDtoFromJSONTyped(json, false);
}

export function NeighborDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NeighborDto {
    if (json == null) {
        return json;
    }
    return {
        
        'address': json['address'],
        'chainId': json['chainId'],
        'lastRun': json['lastRun'],
        'gifted': json['gifted'],
        'received': json['received'],
        'neighbors': json['neighbors'],
    };
}

export function NeighborDtoToJSON(value?: NeighborDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'address': value['address'],
        'chainId': value['chainId'],
        'lastRun': value['lastRun'],
        'gifted': value['gifted'],
        'received': value['received'],
        'neighbors': value['neighbors'],
    };
}


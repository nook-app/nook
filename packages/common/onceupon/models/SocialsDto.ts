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
import type { FarcasterProfileDto } from './FarcasterProfileDto';
import {
    FarcasterProfileDtoFromJSON,
    FarcasterProfileDtoFromJSONTyped,
    FarcasterProfileDtoToJSON,
} from './FarcasterProfileDto';

/**
 * 
 * @export
 * @interface SocialsDto
 */
export interface SocialsDto {
    /**
     * Farcaster profile details
     * @type {FarcasterProfileDto}
     * @memberof SocialsDto
     */
    farcaster: FarcasterProfileDto;
    /**
     * Opensea details
     * @type {object}
     * @memberof SocialsDto
     */
    opensea: object;
}

/**
 * Check if a given object implements the SocialsDto interface.
 */
export function instanceOfSocialsDto(value: object): boolean {
    if (!('farcaster' in value)) return false;
    if (!('opensea' in value)) return false;
    return true;
}

export function SocialsDtoFromJSON(json: any): SocialsDto {
    return SocialsDtoFromJSONTyped(json, false);
}

export function SocialsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SocialsDto {
    if (json == null) {
        return json;
    }
    return {
        
        'farcaster': FarcasterProfileDtoFromJSON(json['farcaster']),
        'opensea': json['opensea'],
    };
}

export function SocialsDtoToJSON(value?: SocialsDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'farcaster': FarcasterProfileDtoToJSON(value['farcaster']),
        'opensea': value['opensea'],
    };
}

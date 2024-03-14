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


import * as runtime from '../runtime';
import type {
  CreateLabelDto,
  LabelDto,
  UpdateLabelDto,
} from '../models/index';
import {
    CreateLabelDtoFromJSON,
    CreateLabelDtoToJSON,
    LabelDtoFromJSON,
    LabelDtoToJSON,
    UpdateLabelDtoFromJSON,
    UpdateLabelDtoToJSON,
} from '../models/index';

export interface LabelsControllerCreateLabelRequest {
    createLabelDto: CreateLabelDto;
}

export interface LabelsControllerDeleteLabelRequest {
    address: string;
}

export interface LabelsControllerGetLabelRequest {
    address: string;
}

export interface LabelsControllerGetPublicLabelRequest {
    address: string;
    labelledAddress: string;
}

export interface LabelsControllerGetPublicLabelsRequest {
    address: string;
}

export interface LabelsControllerUpdateLabelRequest {
    address: string;
    updateLabelDto: UpdateLabelDto;
}

/**
 * 
 */
export class LabelsApi extends runtime.BaseAPI {

    /**
     * Create a new label
     */
    async labelsControllerCreateLabelRaw(requestParameters: LabelsControllerCreateLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LabelDto>> {
        if (requestParameters['createLabelDto'] == null) {
            throw new runtime.RequiredError(
                'createLabelDto',
                'Required parameter "createLabelDto" was null or undefined when calling labelsControllerCreateLabel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/labels`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateLabelDtoToJSON(requestParameters['createLabelDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LabelDtoFromJSON(jsonValue));
    }

    /**
     * Create a new label
     */
    async labelsControllerCreateLabel(requestParameters: LabelsControllerCreateLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LabelDto> {
        const response = await this.labelsControllerCreateLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a label
     */
    async labelsControllerDeleteLabelRaw(requestParameters: LabelsControllerDeleteLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling labelsControllerDeleteLabel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/labels/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a label
     */
    async labelsControllerDeleteLabel(requestParameters: LabelsControllerDeleteLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.labelsControllerDeleteLabelRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieve user label
     */
    async labelsControllerGetLabelRaw(requestParameters: LabelsControllerGetLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LabelDto>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling labelsControllerGetLabel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/labels/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LabelDtoFromJSON(jsonValue));
    }

    /**
     * Retrieve user label
     */
    async labelsControllerGetLabel(requestParameters: LabelsControllerGetLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LabelDto> {
        const response = await this.labelsControllerGetLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve user labels
     */
    async labelsControllerGetLabelsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<LabelDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/labels`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LabelDtoFromJSON));
    }

    /**
     * Retrieve user labels
     */
    async labelsControllerGetLabels(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LabelDto>> {
        const response = await this.labelsControllerGetLabelsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Retrieve user public label
     */
    async labelsControllerGetPublicLabelRaw(requestParameters: LabelsControllerGetPublicLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LabelDto>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling labelsControllerGetPublicLabel().'
            );
        }

        if (requestParameters['labelledAddress'] == null) {
            throw new runtime.RequiredError(
                'labelledAddress',
                'Required parameter "labelledAddress" was null or undefined when calling labelsControllerGetPublicLabel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/labels/public/{address}/{labelledAddress}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address']))).replace(`{${"labelledAddress"}}`, encodeURIComponent(String(requestParameters['labelledAddress']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LabelDtoFromJSON(jsonValue));
    }

    /**
     * Retrieve user public label
     */
    async labelsControllerGetPublicLabel(requestParameters: LabelsControllerGetPublicLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LabelDto> {
        const response = await this.labelsControllerGetPublicLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve user public labels
     */
    async labelsControllerGetPublicLabelsRaw(requestParameters: LabelsControllerGetPublicLabelsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<LabelDto>>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling labelsControllerGetPublicLabels().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/labels/public/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LabelDtoFromJSON));
    }

    /**
     * Retrieve user public labels
     */
    async labelsControllerGetPublicLabels(requestParameters: LabelsControllerGetPublicLabelsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<LabelDto>> {
        const response = await this.labelsControllerGetPublicLabelsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a label
     */
    async labelsControllerUpdateLabelRaw(requestParameters: LabelsControllerUpdateLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LabelDto>> {
        if (requestParameters['address'] == null) {
            throw new runtime.RequiredError(
                'address',
                'Required parameter "address" was null or undefined when calling labelsControllerUpdateLabel().'
            );
        }

        if (requestParameters['updateLabelDto'] == null) {
            throw new runtime.RequiredError(
                'updateLabelDto',
                'Required parameter "updateLabelDto" was null or undefined when calling labelsControllerUpdateLabel().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/labels/{address}`.replace(`{${"address"}}`, encodeURIComponent(String(requestParameters['address']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateLabelDtoToJSON(requestParameters['updateLabelDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LabelDtoFromJSON(jsonValue));
    }

    /**
     * Update a label
     */
    async labelsControllerUpdateLabel(requestParameters: LabelsControllerUpdateLabelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LabelDto> {
        const response = await this.labelsControllerUpdateLabelRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

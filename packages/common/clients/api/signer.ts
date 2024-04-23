import { PendingCast } from "../../prisma/nook";
import {
  GetSignerResponse,
  SubmitCastAddRequest,
  SubmitCastRemoveRequest,
  SubmitFrameActionRequest,
  SubmitLinkAddRequest,
  SubmitLinkRemoveRequest,
  SubmitMessageError,
  SubmitMessageResponse,
  SubmitReactionAddRequest,
  SubmitReactionRemoveRequest,
  ValidateSignerResponse,
} from "../../types";
import { BaseAPIClient } from "./base";

export class SignerAPIClient extends BaseAPIClient {
  API_ENDPOINT = process.env.SIGNER_API_ENDPOINT;

  async getSigner(token: string): Promise<GetSignerResponse> {
    const response = await this.makeRequest("/signer", {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async validateSigner(
    token: string,
    signerToken: string,
  ): Promise<ValidateSignerResponse> {
    const response = await this.makeRequest(
      `/signer/validate?token=${signerToken}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitCastAdd(
    token: string,
    data: SubmitCastAddRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/cast-add", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitCastAddThread(
    token: string,
    data: { data: SubmitCastAddRequest[] },
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/cast-add/thread", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitScheduledCasts(data: PendingCast[]) {
    const response = await this.makeRequest("/signer/cast-add/scheduled", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as [string, string | null][];
  }

  async submitCastRemove(
    token: string,
    data: SubmitCastRemoveRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/cast-remove", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitReactionAdd(
    token: string,
    data: SubmitReactionAddRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/reaction-add", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitReactionRemove(
    token: string,
    data: SubmitReactionRemoveRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/reaction-remove", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitLinkAdd(
    token: string,
    data: SubmitLinkAddRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/link-add", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitLinkRemove(
    token: string,
    data: SubmitLinkRemoveRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/link-remove", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async submitFrameAction(
    token: string,
    data: SubmitFrameActionRequest,
  ): Promise<SubmitMessageResponse | SubmitMessageError> {
    const response = await this.makeRequest("/signer/frame-action", {
      method: "POST",
      headers: {
        Authorization: token,
        ContentType: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
}

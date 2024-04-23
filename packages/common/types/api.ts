import { Frame } from "frames.js";
import { UrlContentResponse } from "./content";
import {
  Channel,
  FarcasterCastContext,
  FarcasterCastEngagement,
  FarcasterUser,
} from "./farcaster";
import { RawNotificationResponse } from "./notifications";
import { TransactionDto } from "../onceupon";
import { Nook } from "./nook";
import { PendingCast } from "../prisma/nook";

export type FarcasterCastResponse = {
  hash: string;
  timestamp: number;
  user: FarcasterUser;
  text: string;
  mentions: {
    user: FarcasterUser;
    position: string;
  }[];
  embedCasts: FarcasterCastResponse[];
  embeds: UrlContentResponse[];
  rootParentFid?: string;
  rootParentHash?: string;
  parentFid?: string;
  parentHash?: string;
  parent?: FarcasterCastResponse;
  parentUrl?: string;
  channel?: Channel;
  channelMentions: {
    channel: Channel;
    position: string;
  }[];
  engagement: FarcasterCastEngagement;
  context?: FarcasterCastContext;
  ancestors?: FarcasterCastResponse[];
  thread?: FarcasterCastResponse[];
  signer: string;
  appFid: string;
};

export type GetFarcasterChannelRequest = {
  id: string;
};

export type GetFarcasterChannelsRequest = {
  channelIds?: string[];
  parentUrls?: string[];
};

export type GetFarcasterChannelsResponse = {
  data: Channel[];
  nextCursor?: string;
};

export type GetFarcasterUserRequest = {
  fid: string;
};

export type GetFarcasterUsersRequest = {
  fids?: string[];
  addresses?: string[];
};

export type GetFarcasterCastRequest = {
  hash: string;
};

export type GetFarcasterCastRepliesRequest = {
  hash: string;
};

export type GetFarcasterCastClientRequest = {
  hash: string;
};

export type GetFarcasterCastsRequest = {
  hashes: string[];
};

export type GetFarcasterCastsResponse = {
  data: FarcasterCastResponse[];
  nextCursor?: string;
};

export type GetFarcasterUsersResponse = {
  data: FarcasterUser[];
  nextCursor?: string;
};

export type GetContentRequest = {
  uri: string;
};

export type GetContentsRequest = {
  uris: string[];
};

export type GetContentsResponse = {
  data: UrlContentResponse[];
};

export type GetFarcasterUserFollowersRequest = {
  fid: string;
};

export type GetSignerResponse = {
  publicKey: string;
  token: string;
  deeplinkUrl: string;
  state: string;
};

export type ValidateSignerResponse = {
  state: string;
};

export type SubmitCastAddRequest = {
  text: string;
  parentUrl?: string;
  parentFid?: string;
  parentHash?: string;
  castEmbedFid?: string;
  castEmbedHash?: string;
  embeds?: string[];
};

export type PendingCastRequest = SubmitCastAddRequest & {
  id: string;
  scheduledFor: Date | null;
};

export type PendingCastResponse = {
  data: PendingCast[];
  nextCursor?: string;
};

export type SubmitCastRemoveRequest = {
  hash: string;
};

export type SubmitReactionAddRequest = {
  reactionType: number;
  targetFid: string;
  targetHash: string;
};

export type SubmitReactionRemoveRequest = {
  reactionType: number;
  targetFid: string;
  targetHash: string;
};

export type SubmitLinkAddRequest = {
  linkType: string;
  targetFid: string;
};

export type SubmitLinkRemoveRequest = {
  linkType: string;
  targetFid: string;
};

export type SubmitMessageResponse = {
  hashes?: string[];
  hash: string;
  trustedBytes?: string;
};

export type SubmitMessageError = {
  message: string;
};

export type SubmitFrameActionRequest = {
  url: string;
  castFid: string;
  castHash: string;
  postUrl: string;
  action?: string;
  inputText?: string;
  buttonIndex: number;
  state?: string;
  address?: `0x${string}`;
  transactionId?: `0x${string}`;
};

export type FramePayload = {
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText?: string;
    state?: string;
    castId: {
      fid: number;
      hash: string;
    };
    address?: `0x${string}`;
    transactionId?: `0x${string}`;
  };
  trustedData: {
    messageBytes: string;
  };
};

export type SubmitFrameActionResponse = {
  location?: string;
  frame?: Frame;
};

export type GetNotificationsRequest = {
  fid: string;
  types?: string[];
  priority?: boolean;
};

export type GetNotificationsResponse = {
  data: RawNotificationResponse[];
  nextCursor?: string;
};

export type GetTransactionsResponse = {
  data: TransactionDto[];
  nextCursor?: string;
};

export type GetNftsRequest = {
  fid: string;
};

export type GetNftRequest = {
  chain: string;
  address: string;
  identifier: string;
};

export type GetNftCollectionRequest = {
  chain: string;
  address: string;
};

export type NftsByIdsOrRangeRequest = {
  ids?: string[];
  range?: {
    start: number;
    end: number;
  };
};

export type GetNftsResponse = {
  nfts: TransactionDto[];
  next_cursor?: string;
};

export type GetNooksResponse = {
  data: Nook[];
  nextCursor?: string;
};

export type FarcasterTrendingCashtag = {
  cashtag: string;
  score: number;
  count6h: number;
  powerBadgeCount6h: number;
  count3h: number;
  powerBadgeCount3h: number;
  count1h: number;
  powerBadgeCount1h: number;
};

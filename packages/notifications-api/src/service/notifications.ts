import { PrismaClient } from "@nook/common/prisma/notifications";
import {
  FarcasterFollowNotification,
  FarcasterLikeNotification,
  FarcasterMentionNotification,
  FarcasterPostNotification,
  FarcasterQuoteNotification,
  FarcasterRecastNotification,
  FarcasterReplyNotification,
  GetNotificationsRequest,
  GetNotificationsResponse,
  NotificationPreferences,
  NotificationType,
  RawNotificationResponse,
} from "@nook/common/types";
import { FastifyInstance } from "fastify";
import { decodeCursorTimestamp, encodeCursor } from "@nook/common/utils";

export const DB_MAX_PAGE_SIZE = 1000;
export const MAX_PAGE_SIZE = 25;

export class NotificationsService {
  private client: PrismaClient;

  constructor(fastify: FastifyInstance) {
    this.client = fastify.notifications.client;
  }

  async getNotificationUser(
    fid: string,
  ): Promise<NotificationPreferences | undefined> {
    const data = await this.client.user.findUnique({
      where: {
        fid,
      },
      include: {
        subscriptions: true,
      },
    });

    if (!data) return;

    return {
      disabled: data.disabled,
      receive: data.receive,
      onlyPowerBadge: data.onlyPowerBadge,
      subscriptions: data.subscriptions.map((sub) => sub.shelfId),
    };
  }

  async updateNotificationUser(fid: string, data: NotificationPreferences) {
    await this.client.user.update({
      where: {
        fid,
      },
      data: {
        disabled: data.disabled,
        receive: data.receive,
        onlyPowerBadge: data.onlyPowerBadge,
      },
    });
  }

  async deleteNotificationUser(fid: string) {
    await this.client.user.updateMany({
      where: {
        fid,
      },
      data: {
        disabled: true,
      },
    });
  }

  async createNotificationUser(fid: string, token: string) {
    await this.client.user.upsert({
      where: {
        fid,
      },
      update: {
        token,
        disabled: false,
      },
      create: {
        fid,
        token,
      },
    });
  }

  async getPostNotifications(
    req: GetNotificationsRequest,
    cursor?: string,
  ): Promise<GetNotificationsResponse> {
    const data = await this.client.notification.findMany({
      where: {
        fid: req.fid,
        type: NotificationType.POST,
        deletedAt: null,
        timestamp: decodeCursorTimestamp(cursor),
        sourceFid: {
          not: req.fid,
        },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: MAX_PAGE_SIZE,
    });

    return {
      data: data.map((notification) => ({
        type: NotificationType.POST,
        hash: (notification as unknown as FarcasterPostNotification).data.hash,
        timestamp: new Date(notification.timestamp).getTime(),
      })),
      nextCursor:
        data.length === MAX_PAGE_SIZE
          ? encodeCursor({
              timestamp: data[data.length - 1].timestamp.getTime(),
            })
          : undefined,
    };
  }

  async getNotifications(req: GetNotificationsRequest, cursor?: string) {
    const data = await this.client.notification.findMany({
      where: {
        fid: req.fid,
        type: req.types
          ? {
              in: req.types,
            }
          : undefined,
        timestamp: decodeCursorTimestamp(cursor),
        deletedAt: null,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: DB_MAX_PAGE_SIZE,
    });

    const mentions = data.filter(
      (notification) => notification.type === NotificationType.MENTION,
    ) as unknown as FarcasterMentionNotification[];
    const replies = data.filter(
      (notification) => notification.type === NotificationType.REPLY,
    ) as unknown as FarcasterReplyNotification[];
    const likes = data.filter(
      (notification) => notification.type === NotificationType.LIKE,
    ) as unknown as FarcasterLikeNotification[];
    const recasts = data.filter(
      (notification) => notification.type === NotificationType.RECAST,
    ) as unknown as FarcasterRecastNotification[];
    const quotes = data.filter(
      (notification) => notification.type === NotificationType.QUOTE,
    ) as unknown as FarcasterQuoteNotification[];
    const follows = data.filter(
      (notification) => notification.type === NotificationType.FOLLOW,
    ) as unknown as FarcasterFollowNotification[];

    const likeMap = likes.reduce(
      (acc, like) => {
        if (!acc[like.data.targetHash]) {
          acc[like.data.targetHash] = {
            type: NotificationType.LIKE,
            hash: like.data.targetHash,
            timestamp: new Date(like.timestamp).getTime(),
            fids: [],
          };
        }

        acc[like.data.targetHash].fids?.push(like.sourceFid);
        return acc;
      },
      {} as Record<string, RawNotificationResponse>,
    );
    const likeResponse = Object.values(likeMap);

    const recastMap = recasts.reduce(
      (acc, recast) => {
        if (!acc[recast.data.targetHash]) {
          acc[recast.data.targetHash] = {
            type: NotificationType.RECAST,
            hash: recast.data.targetHash,
            timestamp: new Date(recast.timestamp).getTime(),
            fids: [],
          };
        }

        acc[recast.data.targetHash].fids?.push(recast.sourceFid);
        return acc;
      },
      {} as Record<string, RawNotificationResponse>,
    );
    const recastResponse = Object.values(recastMap);

    const mentionResponses: RawNotificationResponse[] = mentions.map(
      (mention) => ({
        type: NotificationType.MENTION,
        hash: mention.data.hash,
        timestamp: new Date(mention.timestamp).getTime(),
      }),
    );

    const replyResponses: RawNotificationResponse[] = replies.map((reply) => ({
      type: NotificationType.REPLY,
      hash: reply.data.hash,
      timestamp: new Date(reply.timestamp).getTime(),
    }));

    const quoteResponses: RawNotificationResponse[] = quotes.map((quote) => ({
      type: NotificationType.QUOTE,
      hash: quote.data.hash,
      timestamp: new Date(quote.timestamp).getTime(),
    }));

    const followResponses: RawNotificationResponse[] = follows.map(
      (follow) => ({
        type: NotificationType.FOLLOW,
        timestamp: new Date(follow.timestamp).getTime(),
        fids: [follow.sourceFid],
      }),
    );

    const allResponses = [
      ...mentionResponses,
      ...replyResponses,
      ...likeResponse,
      ...recastResponse,
      ...quoteResponses,
      ...followResponses,
    ];

    const allResponsesSorted = allResponses.sort(
      (a, b) => b.timestamp - a.timestamp,
    );

    const allResponsesMergedFollows = allResponsesSorted.reduce(
      (acc, notification) => {
        if (
          notification.type === NotificationType.FOLLOW &&
          acc[acc.length - 1]?.type === NotificationType.FOLLOW
        ) {
          acc[acc.length - 1].fids?.push(...(notification.fids || []));
        } else {
          acc.push(notification);
        }
        return acc;
      },
      [] as RawNotificationResponse[],
    );

    const sliced = allResponsesMergedFollows.slice(0, MAX_PAGE_SIZE);

    return {
      data: sliced,
      nextCursor:
        sliced.length === MAX_PAGE_SIZE
          ? encodeCursor({
              timestamp: sliced[sliced.length - 1]?.timestamp,
            })
          : undefined,
    };
  }

  async getUnreadNotifications(fid: string) {
    return await this.client.notification.count({
      where: {
        fid,
        read: false,
      },
    });
  }

  async markNotificationsRead(fid: string) {
    await this.client.notification.updateMany({
      where: {
        fid,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }
}

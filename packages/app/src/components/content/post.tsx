import { ContentFeedItem } from "@flink/api/types";
import { PostData } from "@flink/common/types";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";
import { Embed } from "@/components/embeds";
import { Feed } from "@/components/feed";
import { Avatar } from "@/components/avatar";
import { PostContent } from "@/components/utils";

export const ContentPost = ({
  item: { data, entityMap, contentMap },
}: { item: ContentFeedItem<PostData> }) => {
  const engagement = contentMap[data.contentId].engagement;
  const entity = entityMap[data.entityId.toString()];

  return (
    <ScrollView>
      <YStack padding="$2" gap="$3">
        <XStack gap="$2">
          <Avatar entity={entity} />
          <YStack gap="$1">
            {entity.farcaster.displayName && (
              <Text fontWeight="700">{entity.farcaster.displayName}</Text>
            )}
            {entity.farcaster.username && (
              <Text color="$gray11">{`@${entity.farcaster.username}`}</Text>
            )}
            {!entity.farcaster && <Text color="$gray11">Unknown</Text>}
          </YStack>
        </XStack>
        <PostContent data={data} entityMap={entityMap} />
        {data.embeds.map((embed, i) => (
          <Embed
            key={embed}
            embed={embed}
            data={data}
            entityMap={entityMap}
            contentMap={contentMap}
          />
        ))}
        <Text color="$gray11">
          {new Date(data.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" · "}
          {new Date(data.timestamp).toLocaleDateString()}
        </Text>
        <XStack gap="$2">
          <View flexDirection="row" alignItems="center" gap="$1">
            <Text fontWeight="700">{engagement.replies}</Text>
            <Text color="$gray11">Replies</Text>
          </View>
          <View flexDirection="row" alignItems="center" gap="$1">
            <Text fontWeight="700">{engagement.reposts}</Text>
            <Text color="$gray11">Reposts</Text>
          </View>
          <View flexDirection="row" alignItems="center" gap="$1">
            <Text fontWeight="700">{engagement.likes}</Text>
            <Text color="$gray11">Likes</Text>
          </View>
        </XStack>
        <Feed
          filter={{
            type: "REPLY",
            deletedAt: null,
            topics: {
              type: "TARGET_CONTENT",
              value: data.contentId,
            },
          }}
          asList
        />
      </YStack>
    </ScrollView>
  );
};
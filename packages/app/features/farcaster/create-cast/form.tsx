import {
  NookButton,
  Separator,
  View,
  XStack,
  YStack,
  TextArea,
  Input,
  Spinner,
  useToastController,
  useDebounce,
  NookText,
} from "@nook/app-ui";
import { useCreateCast } from "./context";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { CdnAvatar } from "../../../components/cdn-avatar";
import { useAuth } from "../../../context/auth";
import { ChevronDown, X } from "@tamagui/lucide-icons";
import { useParams, useRouter } from "solito/navigation";
import { UrlContentResponse } from "@nook/common/types";
import { fetchChannel, useCast } from "../../../api/farcaster";
import { fetchContent } from "../../../api/content";
import { EmbedCast } from "../../../components/embeds/EmbedCast";
import { Embed } from "../../../components/embeds/Embed";
import {
  NativeSyntheticEvent,
  Platform,
  TextInputChangeEventData,
} from "react-native";
import { ChannelSelect } from "../../../components/farcaster/channels/channel-select";
import { CreateCastMentions } from "./mentions";
import { useTheme } from "../../../context/theme";

export const CreateCastButton = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { allCastsValid, isCasting, cast, reset, thread } = useCreateCast();
  const toast = useToastController();
  const router = useRouter();
  const { theme } = useTheme();

  const handleCast = useCallback(async () => {
    const response = await cast();
    if (response) {
      toast.show("Successfully casted!");
      if (Platform.OS === "web") {
        router.push(`/casts/${response.hash}`);
      } else {
        router.push(`/(drawer)/(tabs)/(a)/casts/${response.hash}`);
      }
    }
    onSubmit?.();
    reset();
  }, [cast, toast, router, onSubmit, reset]);

  return (
    <NookButton
      variant="primary"
      height="$3"
      paddingHorizontal="$3"
      fontSize="$4"
      onPress={handleCast}
      disabled={!allCastsValid || isCasting}
      disabledStyle={{
        opacity: 0.5,
      }}
      color={!theme ? "$color1" : "white"}
      backgroundColor={!theme ? "$color12" : "$color9"}
    >
      {isCasting ? (
        <Spinner color={!theme ? "$color1" : "white"} />
      ) : thread.parentHash ? (
        "Reply"
      ) : (
        "Cast"
      )}
    </NookButton>
  );
};

export const CreateCastItem = ({ index }: { index: number }) => {
  const { updateText, activeIndex, removeCast, setActiveIndex, casts, cast } =
    useCreateCast();
  const { user } = useAuth();

  const post = casts[index];
  const inputRef = useRef<Input>(null);

  const handleFocusOnPress = () => {
    setActiveIndex(index);
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (Platform.OS !== "web") return;
    const target = event.target;
    // @ts-ignore
    target.style.height = "inherit";
    // @ts-ignore
    target.style.height = `${target.scrollHeight}px`;
  };

  // @ts-ignore
  const handleKeyDown = (event) => {
    if (event.metaKey && event.key === "Enter") {
      event.preventDefault();
      cast();
    }
  };

  return (
    <>
      <XStack
        gap="$3"
        opacity={activeIndex === index ? 1 : 0.4}
        animation="quick"
        onPress={handleFocusOnPress}
        minHeight="$10"
      >
        <YStack alignItems="center" width="$4">
          <CdnAvatar src={user?.pfp} size="$4" />
          <Separator
            vertical
            borderWidth="$0.5"
            borderColor="$color5"
            backgroundColor="$color5"
            opacity={casts[index + 1] ? 1 : 0}
            animation={"100ms"}
          />
        </YStack>
        <YStack gap="$3" marginTop="$1.5" width="100%" flexShrink={1}>
          {Platform.OS === "web" && <CreateCastChannelSelector />}
          <View>
            <TextArea
              ref={inputRef}
              value={post.text}
              onChangeText={(text) => updateText(index, text)}
              onChange={handleInput}
              placeholder={index > 0 ? "Add another post" : "What's happening?"}
              placeholderTextColor="$mauve11"
              fontSize="$6"
              padding="$0"
              borderWidth="$0"
              borderRadius="$0"
              color="$mauve12"
              scrollEnabled={false}
              backgroundColor="transparent"
              onFocus={handleFocusOnPress}
              focusVisibleStyle={{
                outlineWidth: 0,
              }}
              width="100%"
              wordWrap="break-word"
              rows={1}
              $platform-web={{
                resize: "none",
                fontSize: "$7",
              }}
              onKeyPress={handleKeyDown}
            />
            <View
              position="absolute"
              bottom={-16}
              left={0}
              backgroundColor="$blue11"
            >
              <CreateCastMentions>
                <View />
              </CreateCastMentions>
            </View>
          </View>
          <CreateCastEmbeds index={index} />
        </YStack>
        <YStack width="$3">
          {activeIndex === index && index > 0 && (
            <NookButton
              variant="ghost"
              size="$2"
              scaleIcon={1.5}
              circular
              icon={X}
              onPress={(e) => {
                e.stopPropagation();
                removeCast(index);
              }}
            />
          )}
        </YStack>
      </XStack>
      {casts[index + 1] && <CreateCastItem index={index + 1} />}
    </>
  );
};

export const CreateCastChannelSelector = () => {
  const { thread, channel, updateChannel } = useCreateCast();
  const params = useParams();

  const fetchAndSetChannel = useCallback(
    async (channelId: string) => {
      const channel = await fetchChannel(channelId);
      updateChannel(channel);
    },
    [updateChannel],
  );

  useEffect(() => {
    if (params?.channelId) {
      fetchAndSetChannel(params.channelId as string);
    }
  }, [params?.channelId, fetchAndSetChannel]);

  if (thread.parentHash) return null;

  return (
    <XStack>
      <ChannelSelect channel={channel} setChannel={updateChannel}>
        <NookButton
          borderRadius="$10"
          paddingHorizontal="$2.5"
          height="$2"
          borderWidth="$0.5"
          borderColor="$color7"
          backgroundColor="transparent"
          hoverStyle={{
            // @ts-ignore
            transition: "all 0.2s ease-in-out",
            backgroundColor: "$color3",
          }}
        >
          <XStack alignItems="center" gap="$1.5">
            {channel?.imageUrl && (
              <CdnAvatar src={channel.imageUrl} size="$0.9" />
            )}
            <NookText color="$color12" fontWeight="600" fontSize="$2">
              {channel?.name || "Channel"}
            </NookText>
            <ChevronDown size={16} color="$color12" />
          </XStack>
        </NookButton>
      </ChannelSelect>
    </XStack>
  );
};

const CreateCastEmbeds = memo(({ index }: { index: number }) => {
  const { removeEmbed, isUploadingImages, activeCast } = useCreateCast();
  const [embeds, setEmbeds] = useState<UrlContentResponse[]>([]);
  const [isFetchingEmbeds, setIsFetchingEmbeds] = useState(false);

  const { data: embed } = useCast(activeCast.castEmbedHash || "");

  const fetchEmbeds = useDebounce(async () => {
    const allEmbeds: string[] = [];
    if (activeCast.embeds && activeCast.embeds.length > 0) {
      for (const activeEmbed of activeCast.embeds) {
        allEmbeds.push(activeEmbed);
      }
    }
    if (activeCast.parsedEmbeds && activeCast.parsedEmbeds.length > 0) {
      for (const activeEmbed of activeCast.parsedEmbeds) {
        allEmbeds.push(activeEmbed);
      }
    }

    if (allEmbeds.length === 0) {
      setEmbeds([]);
      setIsFetchingEmbeds(false);
      return;
    }

    const extraEmbeds = embeds.filter(
      (embed) => !allEmbeds.some((e) => e === embed.uri),
    );
    const embedsToFetch = allEmbeds.filter(
      (embed) => !embeds.some((e) => e.uri === embed),
    );

    if (embedsToFetch.length === 0) {
      setEmbeds((prev) =>
        prev.filter((e) => !extraEmbeds.some((extra) => extra.uri === e.uri)),
      );
      setIsFetchingEmbeds(false);
      return;
    }

    setIsFetchingEmbeds(true);
    const fetchedEmbeds = await Promise.all(embedsToFetch.map(fetchContent));
    setEmbeds(
      (prev) =>
        allEmbeds
          .map(
            (embed) =>
              prev.find((e) => e.uri === embed) ||
              fetchedEmbeds.find((e) => e?.uri === embed),
          )
          .filter(Boolean) as UrlContentResponse[],
    );
    setIsFetchingEmbeds(false);
  }, 1000);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchEmbeds();
  }, [activeCast.embeds]);

  return (
    <YStack gap="$2">
      {((embeds.length === 0 && isFetchingEmbeds) || isUploadingImages) && (
        <View padding="$2">
          <Spinner />
        </View>
      )}
      {embeds.length > 0 && (
        <YStack padding="$2" marginTop="$4" gap="$2">
          <PostEmbedsDisplay
            embeds={embeds}
            onRemove={(url) => removeEmbed(index, url)}
          />
        </YStack>
      )}
      {embed && (
        <View padding="$2.5">
          <EmbedCast cast={embed} disableLink />
        </View>
      )}
    </YStack>
  );
});

const PostEmbedsDisplay = ({
  embeds,
  onRemove,
}: {
  embeds: UrlContentResponse[];
  onRemove: (content: string) => void;
}) => {
  const isAllImages = embeds.every((content) =>
    content.contentType?.startsWith("image/"),
  );
  if (isAllImages && embeds.length > 1) {
    return (
      <XStack gap="$1">
        {embeds.map((content) => (
          <View width="50%" padding="$1" key={content.uri}>
            <RemovalEmbed content={content} onRemove={onRemove} />
          </View>
        ))}
      </XStack>
    );
  }

  return (
    <YStack gap="$2">
      {embeds.map((content) => (
        <RemovalEmbed key={content.uri} content={content} onRemove={onRemove} />
      ))}
    </YStack>
  );
};

const RemovalEmbed = ({
  content,
  onRemove,
}: {
  content: UrlContentResponse;
  onRemove: (content: string) => void;
}) => {
  const { count } = useCreateCast();
  return (
    <View width={count > 1 ? "50%" : "100%"}>
      <Embed content={content} />
      <View
        cursor="pointer"
        width="$2"
        height="$2"
        justifyContent="center"
        alignItems="center"
        borderRadius="$10"
        hoverStyle={{
          // @ts-ignore
          transition: "all 0.2s ease-in-out",
          backgroundColor: "#000000cc",
        }}
        pressStyle={{
          // @ts-ignore
          transition: "all 0.2s ease-in-out",
          backgroundColor: "#000000ee",
        }}
        onPress={() => onRemove(content.uri)}
        position="absolute"
        backgroundColor="#000000aa"
        top={3}
        left={3}
      >
        <X size={16} color="white" strokeWidth={2} />
      </View>
    </View>
  );
};

import { Avatar, Text, View, XStack, YStack } from "tamagui";
import { Nook, NookType } from "@nook/common/types";
import { useNooks } from "@/hooks/useNooks";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatNumber } from "@/utils";
import { ModalButton } from "../buttons/ModalButton";
import { ModalName } from "@/modals/types";
import { useEntity } from "@/hooks/useEntity";

const EntityMetadata = ({ nook }: { nook: Nook }) => {
  const entity = useEntity(nook.nookId.replace("entity:", ""));

  return (
    <XStack gap="$2">
      <ModalButton
        modalName={ModalName.EntityFollowing}
        modalArgs={{ entityId: entity?.entity._id.toString() || "" }}
        disabled={!entity?.entity.farcaster.following}
      >
        <View flexDirection="row" alignItems="center" gap="$1">
          <Text fontWeight="700">
            {formatNumber(entity?.entity.farcaster.following || 0)}
          </Text>
          <Text color="$gray11" fontSize="$3">
            following
          </Text>
        </View>
      </ModalButton>
      <ModalButton
        modalName={ModalName.EntityFollowers}
        modalArgs={{ entityId: entity?.entity._id.toString() || "" }}
        disabled={!entity?.entity.farcaster.following}
      >
        <View flexDirection="row" alignItems="center" gap="$1">
          <Text fontWeight="700">
            {formatNumber(entity?.entity.farcaster.followers || 0)}
          </Text>
          <Text color="$gray11" fontSize="$3">
            followers
          </Text>
        </View>
      </ModalButton>
    </XStack>
  );
};

const ActiveNookHeader = ({ nook }: { nook: Nook }) => {
  return (
    <YStack
      gap="$2"
      padding="$3"
      backgroundColor="$backgroundStrong"
      borderRadius="$6"
    >
      <Text
        color="$gray11"
        fontSize="$1"
        fontWeight="700"
        textTransform="uppercase"
      >
        {nook.type === NookType.Entity ? "User" : nook.type}
      </Text>
      <XStack gap="$2" alignItems="center">
        <Avatar circular size="$3.5">
          <Avatar.Image src={nook.image} />
          <Avatar.Fallback backgroundColor="$backgroundPress" />
        </Avatar>
        <YStack>
          <Text fontWeight="700" fontSize="$5">
            {nook.name}
          </Text>
          <Text color="$gray11" fontSize="$4">
            {nook.slug}
          </Text>
        </YStack>
      </XStack>
      <View paddingVertical="$1">
        <Text fontSize="$3">{nook.description}</Text>
      </View>
      {nook.type === NookType.Entity && <EntityMetadata nook={nook} />}
    </YStack>
  );
};

export const ActiveNook = () => {
  const { activeNook, activeShelf, navigateToShelf } = useNooks();

  const onPress = useCallback(
    (shelfId: string) => {
      navigateToShelf(shelfId);
    },
    [navigateToShelf],
  );

  if (!activeNook) {
    return null;
  }

  return (
    <YStack minHeight="100%" marginRight="$2" gap="$2">
      <ActiveNookHeader nook={activeNook} />
      <View
        backgroundColor="$backgroundStrong"
        borderRadius="$6"
        padding="$3"
        flexGrow={1}
      >
        {activeNook?.shelves.map((shelf, i) => (
          <TouchableOpacity
            key={shelf.slug}
            onPress={() => onPress(shelf.slug)}
          >
            <View
              padding="$2"
              backgroundColor={
                activeShelf?.slug === shelf.slug || (!activeShelf && i === 0)
                  ? "$backgroundFocus"
                  : "$backgroundStrong"
              }
              borderRadius="$4"
            >
              <Text
                fontWeight={
                  activeShelf?.slug === shelf.slug || (!activeShelf && i === 0)
                    ? "700"
                    : "500"
                }
              >
                {shelf.name}
              </Text>
              <Text color="$gray11" fontSize="$3">
                {shelf.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </YStack>
  );
};

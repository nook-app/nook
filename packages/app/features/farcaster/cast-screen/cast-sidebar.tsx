"use client";

import { YStack } from "@nook/app-ui";
import { SearchBar } from "../../search/search-bar";
import { ChannelOverview } from "../../../components/farcaster/channels/channel-overview";
import { FarcasterCastV1 } from "@nook/common/types";

export const CastSidebar = ({ cast }: { cast: FarcasterCastV1 }) => {
  return (
    <YStack
      padding="$3"
      gap="$3"
      top={0}
      $platform-web={{
        position: "sticky",
      }}
    >
      <SearchBar />
      {cast?.channel && <ChannelOverview channel={cast.channel} asLink />}
    </YStack>
  );
};

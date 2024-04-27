"use client";

import { YStack } from "@nook/ui";
import { SearchBar } from "../../search/search-bar";
import { FarcasterUser } from "../../../types";

export const UserSidebar = ({ user }: { user: FarcasterUser }) => {
  return (
    <YStack
      padding="$3"
      gap="$3"
      top={0}
      $platform-web={{
        position: "sticky",
      }}
    >
      <SearchBar user={user} />
    </YStack>
  );
};
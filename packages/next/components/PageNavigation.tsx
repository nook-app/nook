import { View, XStack } from "@nook/ui";
import { ReactNode } from "react";

export const PageNavigation = ({ children }: { children: ReactNode }) => {
  return (
    <XStack>
      <View
        flex={1}
        borderLeftColor="$color4"
        borderLeftWidth="$0.5"
        borderRightColor="$color4"
        borderRightWidth="$0.5"
      >
        {children}
      </View>
      <View width={400} />
    </XStack>
  );
};

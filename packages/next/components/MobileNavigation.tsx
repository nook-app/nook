"use client";

import { FarcasterUserAvatar } from "@nook/app/components/farcaster/users/user-display";
import { useAuth } from "@nook/app/context/auth";
import { useTheme } from "@nook/app/context/theme";
import { AccountSwitcher } from "@nook/app/features/auth/account-switcher";
import { CreateCastDialog } from "@nook/app/features/farcaster/create-cast/disalog";
import { EnableSignerDialog } from "@nook/app/features/farcaster/enable-signer/dialog";
import { FarcasterUser, Session } from "@nook/app/types";
import { NookButton, View, YStack } from "@nook/ui";
import {
  Bell,
  Home,
  LogIn,
  Pencil,
  Search,
  Settings,
} from "@tamagui/lucide-icons";
import Link from "next/link";
import { ReactNode } from "react";

export const MobileNavigation = ({
  session,
  children,
}: { session?: Session; children: ReactNode }) => {
  return (
    <View $md={{ flex: 1 }}>
      <View $md={{ flex: 1 }}>{children}</View>
      <MobileTabMenu user={session?.user} />
      <MobileCreateButton session={session} />
    </View>
  );
};

const MobileTabMenu = ({ user }: { user?: FarcasterUser }) => {
  return (
    <YStack
      backgroundColor="$color2"
      borderTopWidth="$0.5"
      borderTopColor="$borderColorBg"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="row"
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display="none"
      $xs={{ display: "flex" }}
      $platform-web={{
        position: "fixed",
      }}
    >
      <Link href="/" style={{ flexGrow: 1 }}>
        <NookButton
          padding="$0"
          borderRadius="$0"
          height="$5"
          width="100%"
          backgroundColor="transparent"
          borderWidth="$0"
          scaleIcon={1.6}
          icon={<Home />}
        />
      </Link>
      <Link href="/explore" style={{ flexGrow: 1 }}>
        <NookButton
          padding="$0"
          borderRadius="$0"
          height="$5"
          width="100%"
          backgroundColor="transparent"
          borderWidth="$0"
          scaleIcon={1.6}
          icon={<Search />}
        />
      </Link>
      {user && (
        <>
          <Link href="/notifications" style={{ flexGrow: 1 }}>
            <NookButton
              padding="$0"
              width="100%"
              borderRadius="$0"
              height="$5"
              backgroundColor="transparent"
              borderWidth="$0"
              scaleIcon={1.6}
              icon={<Bell />}
            />
          </Link>
          <Link href="/settings" style={{ flexGrow: 1 }}>
            <NookButton
              padding="$0"
              width="100%"
              borderRadius="$0"
              height="$5"
              backgroundColor="transparent"
              borderWidth="$0"
              scaleIcon={1.6}
              icon={<Settings />}
            />
          </Link>
        </>
      )}
      <MobileNavigationAuth user={user} />
    </YStack>
  );
};

const MobileNavigationAuth = ({ user }: { user?: FarcasterUser }) => {
  const { login } = useAuth();
  const { theme } = useTheme();

  if (!user?.fid) {
    return (
      <NookButton
        variant="ghost"
        flexGrow={1}
        height="$5"
        padding="$0"
        justifyContent="center"
        alignItems="center"
        onPress={login}
      >
        <LogIn
          size={20}
          color={["light", "dark"].includes(theme) ? "$color1" : "white"}
        />
      </NookButton>
    );
  }

  return (
    <AccountSwitcher>
      <NookButton
        variant="ghost"
        flexGrow={1}
        height="$5"
        padding="$0"
        justifyContent="center"
        alignItems="center"
      >
        <FarcasterUserAvatar user={user} size="$2" />
      </NookButton>
    </AccountSwitcher>
  );
};

const MobileCreateButton = ({ session }: { session?: Session }) => {
  const { theme } = useTheme();

  if (!session) return null;

  if (session.signer?.state !== "completed") {
    return (
      <View display="none" $xs={{ display: "flex" }}>
        <EnableSignerDialog>
          <NookButton
            variant="primary"
            zIndex={1000}
            width="$5"
            height="$5"
            padding="$1"
            right={15}
            bottom={65}
            $platform-web={{
              position: "fixed",
            }}
            borderWidth="$0"
            backgroundColor={
              ["light", "dark"].includes(theme) ? "$color12" : "$color9"
            }
            pressStyle={{
              backgroundColor: ["light", "dark"].includes(theme)
                ? "$color11"
                : "$color10",
            }}
          >
            <Pencil
              color={["light", "dark"].includes(theme) ? "$color1" : "white"}
            />
          </NookButton>
        </EnableSignerDialog>
      </View>
    );
  }

  return (
    <View display="none" $xs={{ display: "flex" }}>
      <CreateCastDialog initialState={{ text: "" }}>
        <NookButton
          variant="primary"
          zIndex={1000}
          width="$5"
          height="$5"
          padding="$1"
          right={15}
          bottom={65}
          $platform-web={{
            position: "fixed",
          }}
          borderWidth="$0"
          backgroundColor={
            ["light", "dark"].includes(theme) ? "$color12" : "$color9"
          }
          pressStyle={{
            backgroundColor: ["light", "dark"].includes(theme)
              ? "$color11"
              : "$color10",
          }}
        >
          <Pencil
            color={["light", "dark"].includes(theme) ? "$color1" : "white"}
          />
        </NookButton>
      </CreateCastDialog>
    </View>
  );
};

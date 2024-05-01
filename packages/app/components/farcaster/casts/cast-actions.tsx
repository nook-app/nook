import { Dialog, Image, View, useTheme, useToastController } from "@nook/ui";
import {
  Heart,
  Image as ImageIcon,
  Link,
  MessageSquare,
  MessageSquareQuote,
  Repeat2,
  Share,
} from "@tamagui/lucide-icons";
import { CreateCastDialog } from "../../../features/farcaster/create-cast/dialog";
import { FarcasterCast } from "../../../types";
import { useLikeCast } from "../../../hooks/useLikeCast";
import { useRecastCast } from "../../../hooks/useRecastCast";
import { KebabMenu, KebabMenuItem } from "../../kebab-menu";
import { EnableSignerDialog } from "../../../features/farcaster/enable-signer/dialog";
import { useAuth } from "../../../context/auth";

export const FarcasterReplyActionButton = ({
  cast,
}: { cast: FarcasterCast }) => {
  const { session, login } = useAuth();
  return (
    <View
      onPress={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!session) {
          login();
          return;
        }
      }}
    >
      <CreateCastDialog
        initialState={{
          text: "",
          parentFid: cast.user.fid,
          parentHash: cast.hash,
        }}
      >
        <View
          cursor="pointer"
          width="$2.5"
          height="$2.5"
          justifyContent="center"
          alignItems="center"
          borderRadius="$10"
          group
          hoverStyle={{
            // @ts-ignore
            transition: "all 0.2s ease-in-out",
            backgroundColor: "$color3",
          }}
        >
          <MessageSquare
            size={20}
            opacity={0.4}
            $group-hover={{
              color: "$blue9",
              opacity: 1,
            }}
          />
        </View>
      </CreateCastDialog>
    </View>
  );
};

export const FarcasterRecastActionButton = ({
  cast,
}: { cast: FarcasterCast }) => {
  const theme = useTheme();
  const { recastCast, unrecastCast, isRecasted } = useRecastCast(cast);
  const { session, login } = useAuth();

  if (isRecasted || !session) {
    return (
      <View
        cursor="pointer"
        width="$2.5"
        height="$2.5"
        justifyContent="center"
        alignItems="center"
        borderRadius="$10"
        group
        hoverStyle={{
          // @ts-ignore
          transition: "all 0.2s ease-in-out",
          backgroundColor: "$color3",
        }}
        onPress={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!session) {
            login();
            return;
          }
          unrecastCast();
        }}
      >
        <Repeat2
          size={24}
          opacity={isRecasted ? 1 : 0.4}
          $group-hover={{
            color: "$green9",
            opacity: 1,
          }}
          strokeWidth={isRecasted ? 2.5 : 1.75}
          color={isRecasted ? theme.green9.val : undefined}
        />
      </View>
    );
  }

  return (
    <CreateCastDialog
      initialState={{
        text: "",
        castEmbedHash: cast.hash,
        castEmbedFid: cast.user.fid,
      }}
    >
      <KebabMenu
        trigger={
          <View
            cursor="pointer"
            width="$2.5"
            height="$2.5"
            justifyContent="center"
            alignItems="center"
            borderRadius="$10"
            group
            hoverStyle={{
              // @ts-ignore
              transition: "all 0.2s ease-in-out",
              backgroundColor: "$color3",
            }}
          >
            <Repeat2
              size={24}
              opacity={isRecasted ? 1 : 0.4}
              $group-hover={{
                color: "$green9",
                opacity: 1,
              }}
              strokeWidth={isRecasted ? 2.5 : 1.75}
              color={isRecasted ? theme.green9.val : undefined}
            />
          </View>
        }
      >
        <KebabMenuItem
          Icon={Repeat2}
          title="Recast"
          onPress={() => {
            recastCast();
          }}
        />
        <FarcasterQuoteMenuItem />
      </KebabMenu>
    </CreateCastDialog>
  );
};

const FarcasterQuoteMenuItem = ({ closeMenu }: { closeMenu?: () => void }) => {
  return (
    <Dialog.Trigger>
      <KebabMenuItem
        Icon={MessageSquareQuote}
        title="Quote"
        closeMenu={closeMenu}
      />
    </Dialog.Trigger>
  );
};

export const FarcasterLikeActionButton = ({
  cast,
}: { cast: FarcasterCast }) => {
  const theme = useTheme();
  const { likeCast, unlikeCast, isLiked } = useLikeCast(cast);
  const { session, login } = useAuth();
  return (
    <EnableSignerDialog>
      <View
        cursor="pointer"
        width="$2.5"
        height="$2.5"
        justifyContent="center"
        alignItems="center"
        borderRadius="$10"
        group
        hoverStyle={{
          // @ts-ignore
          transition: "all 0.2s ease-in-out",
          backgroundColor: "$color3",
        }}
        onPress={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!session) {
            login();
            return;
          }
          if (isLiked) {
            unlikeCast();
          } else {
            likeCast();
          }
        }}
      >
        <Heart
          size={20}
          opacity={isLiked ? 1 : 0.4}
          $group-hover={{
            color: "$red9",
            opacity: 1,
          }}
          color={isLiked ? theme.red9.val : undefined}
          fill={isLiked ? theme.red9.val : "transparent"}
        />
      </View>
    </EnableSignerDialog>
  );
};

export const FarcasterShareButton = ({ cast }: { cast: FarcasterCast }) => {
  const toast = useToastController();
  return (
    <KebabMenu
      trigger={
        <View
          cursor="pointer"
          width="$2.5"
          height="$2.5"
          justifyContent="center"
          alignItems="center"
          borderRadius="$10"
          group
          hoverStyle={{
            // @ts-ignore
            transition: "all 0.2s ease-in-out",
            backgroundColor: "$color3",
          }}
        >
          <Share
            size={20}
            opacity={0.4}
            $group-hover={{
              color: "$color9",
              opacity: 1,
            }}
          />
        </View>
      }
    >
      <KebabMenuItem
        Icon={Link}
        title="Copy link"
        onPress={() => {
          navigator.clipboard.writeText(
            `https://nook.social/casts/${cast.hash}`,
          );
          toast.show("Link copied to clipboard");
        }}
      />
      <KebabMenuItem
        Icon={ImageIcon}
        title="Share image"
        onPress={() =>
          window.open(
            `https://client.warpcast.com/v2/cast-image?castHash=${cast.hash}`,
          )
        }
      />
    </KebabMenu>
  );
};

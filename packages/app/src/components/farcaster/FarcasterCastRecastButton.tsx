import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useCast } from "@/hooks/useCast";
import { useModal } from "@/hooks/useModal";
import { ModalName } from "@/modals/types";
import { farcasterApi } from "@/store/apis/farcasterApi";
import { recastCast, unrecastCast } from "@/store/slices/cast";
import { RefreshCw } from "@tamagui/lucide-icons";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, useTheme } from "tamagui";
import * as Haptics from "expo-haptics";

export const FarcasterCastRecastButton = ({
  hash,
  withAmount,
}: { hash: string; withAmount?: boolean }) => {
  const signerEnabled = useAppSelector((state) => state.auth.signerEnabled);
  const { open } = useModal(ModalName.EnableSigner);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const cast = useCast(hash);

  const onPress = useCallback(() => {
    if (!cast.context) return;
    if (!signerEnabled) {
      open();
      return;
    }
    if (cast.context.recasted) {
      dispatch(
        farcasterApi.endpoints.unrecastCast.initiate({
          hash: cast.hash,
        }),
      );
      dispatch(unrecastCast({ hash: cast.hash }));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      dispatch(
        farcasterApi.endpoints.recastCast.initiate({
          hash: cast.hash,
        }),
      );
      dispatch(recastCast({ hash: cast.hash }));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [cast, dispatch, signerEnabled, open]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View flexDirection="row" alignItems="center" gap="$1.5" width="$3">
        <RefreshCw
          size={16}
          color={cast.context?.recasted ? "$green9" : "$gray10"}
        />
        {withAmount && (
          <Text color="$gray10" fontSize="$4">
            {cast.engagement.recasts}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
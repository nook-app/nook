import { useCallback, useState } from "react";
import { FarcasterCastV1 } from "@nook/common/types";
import { useToastController } from "@nook/app-ui";
import { useAuth } from "../context/auth";
import { useMuteStore } from "../store/useMuteStore";
import { submitCastRemove } from "../api/farcaster/actions";
import { fetchCast } from "../api/farcaster";
import { useParams, useRouter } from "solito/navigation";
import { haptics } from "../utils/haptics";

export const useDeleteCast = (cast: FarcasterCastV1) => {
  const { session, login } = useAuth();
  const toast = useToastController();
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const router = useRouter();

  const storeCast = useMuteStore((state) => state.casts[cast.hash]);
  const updateDelete = useMuteStore((state) => state.deleteCast);

  const handleDeleteCast = useCallback(async () => {
    if (!session) {
      login();
      return;
    }

    setIsDeleting(true);
    try {
      await submitCastRemove({
        hash: cast.hash,
      });

      const maxAttempts = 60;

      let response;
      let currentAttempts = 0;
      while (currentAttempts < maxAttempts && response) {
        currentAttempts++;
        response = await fetchCast(cast.hash);
        if (!response) break;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (response) {
        setIsDeleting(false);
        toast.show("Failed to refresh");
        return;
      }

      setIsDeleting(false);
      toast.show("Cast deleted");
      haptics.impactMedium();
      updateDelete(cast);

      if (params?.hash === cast.hash) {
        router.push("/");
      }
    } catch (e) {
      toast.show("An error occurred. Try again later.");
      haptics.notificationError();
    }
  }, [cast, updateDelete, toast, session, login, router, params?.hash]);

  return {
    deleteCast: handleDeleteCast,
    isDeleted: storeCast ?? false,
    isDeleting,
  };
};

import { X } from "@tamagui/lucide-icons";
import { NookButton, Dialog, XStack, Adapt, Popover } from "@nook/app-ui";
import { useCallback, useState } from "react";
import { CastAction } from "@nook/common/types";
import { useAuth } from "../../context/auth";
import { InstallAction } from "./install-action";

export const InstallActionDialog = ({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: CastAction;
}) => {
  const { settings } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  const actions: (CastAction | null)[] = [];
  for (let i = 0; i < 8; i++) {
    const existingAction = settings?.actions.find((a) => a.index === i);
    actions.push(existingAction ? existingAction.action : null);
  }

  return (
    <Dialog modal disableRemoveScroll open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
          <Popover.Sheet.Overlay
            animation="100ms"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Popover.Sheet.Frame
            paddingBottom="$8"
            paddingTop="$2"
            backgroundColor="$color2"
          >
            <Adapt.Contents />
          </Popover.Sheet.Frame>
        </Popover.Sheet>
      </Adapt>

      <Dialog.Portal
        justifyContent="flex-start"
        paddingTop="$10"
        $xs={{ paddingTop: "$0" }}
      >
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.75}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "100ms",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          width={600}
          padding="$2"
          $xs={{ width: "100%", height: "100%" }}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <Dialog.Close asChild>
              <NookButton
                size="$3"
                scaleIcon={1.5}
                circular
                icon={X}
                backgroundColor="transparent"
                borderWidth="$0"
                hoverStyle={{
                  backgroundColor: "$color4",
                  // @ts-ignore
                  transition: "all 0.2s ease-in-out",
                }}
              />
            </Dialog.Close>
          </XStack>
          <InstallAction action={action} onInstall={close} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

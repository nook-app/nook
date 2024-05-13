import { LmDatepickerProvider } from "@tamagui-extras/date/src/datepicker/DatepickerProvider";
import {
  FocusedInput,
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
} from "@datepicker-react/hooks";
import { useId, useState } from "react";
import { Input, useMedia, XGroup, XStack } from "tamagui";
import { usePopoverState } from "@tamagui-extras/core";
import { getLocaleDate } from "@tamagui-extras/date/src/dateHelper";
import { LmFormFieldContainer } from "@tamagui-extras/form";
import { Platform } from "react-native";
import { LmDatepickerProps } from "@tamagui-extras/date/src/datepicker/datepickerTypes";
import { LmDatepickerPopover } from "./LmDatepickerPopover"; // change language see: https://github.com/tomgreenwood1/react-datepicker/blob/master/packages/styled/src/components/DateRangeInput/DateRangeInput.stories.tsx#L228

// modified from https://github.com/dohomi/tamagui-kitchen-sink

export function LmDatepicker({
  numberOfMonths,
  isRangePicker,
  onChange,
  labelFunctions,
  startDate = null,
  endDate = null,
  required,
  error,
  helperText,
  helperTextProps,
  label,
  labelProps,
  labelInline,
  fullWidth,
  inputProps,
  buttonProps,
  popoverProps,
  containerProps,
  size,
}: LmDatepickerProps) {
  const id = useId();
  const media = useMedia();
  const popoverState = usePopoverState(false);
  const [state, setState] = useState<OnDatesChangeProps>({
    startDate: startDate,
    endDate: endDate,
    focusedInput: START_DATE,
  });

  const monthsCount: number = isRangePicker
    ? media.xs
      ? 1
      : numberOfMonths ?? 2
    : 1;

  const { activeMonths, firstDayOfWeek, ...context } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput as FocusedInput,
    onDatesChange: (data) => {
      if (!data.focusedInput) {
        setState({ ...data, focusedInput: START_DATE });
      } else {
        setState(data);
      }
      if (typeof onChange === "function") {
        onChange(data);
      }
      if (!isRangePicker) {
        popoverState.onOpenChange(false);
      }
    },
    numberOfMonths: monthsCount,
    ...(!isRangePicker && {
      minBookingDays: 1,
      exactMinBookingDays: true,
    }),
    isDateBlocked: (date) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date.getTime() < now.getTime();
    },
  });

  const getInputValue = isRangePicker
    ? `${getLocaleDate({ date: state.startDate })}${
        state.endDate ? ` - ${getLocaleDate({ date: state.endDate })}` : ""
      }`
    : getLocaleDate({ date: state.startDate });
  return (
    <LmDatepickerProvider {...context}>
      <LmFormFieldContainer
        id={id}
        error={error}
        required={required}
        labelProps={labelProps}
        label={label}
        labelInline={labelInline}
        helperText={helperText}
        helperTextProps={helperTextProps}
        fullWidth={fullWidth}
        size={size}
        {...containerProps}
      >
        <XStack
          space
          {...(fullWidth
            ? {
                flexGrow: 1,
              }
            : {
                width: Platform.OS === "web" ? "100%" : undefined,
              })}
        >
          <XGroup
            flexGrow={fullWidth ? 1 : undefined}
            alignItems={"center"}
            flexDirection={"row"}
          >
            <XGroup.Item>
              <Input
                width={"100%"}
                minWidth={isRangePicker ? "$16" : undefined}
                value={getInputValue}
                onPressIn={() => popoverState.onOpenChange(true)}
                size={size}
                {...inputProps}
              />
            </XGroup.Item>
            <XGroup.Item>
              <LmDatepickerPopover
                activeMonths={activeMonths}
                monthsCount={monthsCount}
                firstDayOfWeek={firstDayOfWeek}
                labelFunctions={labelFunctions}
                buttonProps={buttonProps}
                size={size}
                {...popoverState}
                {...popoverProps}
              />
            </XGroup.Item>
          </XGroup>
        </XStack>
      </LmFormFieldContainer>
    </LmDatepickerProvider>
  );
}

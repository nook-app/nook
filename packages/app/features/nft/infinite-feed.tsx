"use client";

import { Separator, Spinner, View } from "@nook/app-ui";
import { InfiniteScrollList } from "../../components/infinite-scroll-list";

export const NftInfiniteFeed = ({
  data,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  ListHeaderComponent,
  refetch,
  isRefetching,
  paddingTop,
  paddingBottom,
  asTabs,
  renderItem,
  numColumns,
}: {
  data: unknown[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  ListHeaderComponent?: JSX.Element;
  refetch?: () => Promise<void>;
  isRefetching?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  asTabs?: boolean;
  renderItem: ({ item }: { item: unknown }) => JSX.Element;
  numColumns?: number;
}) => {
  return (
    <InfiniteScrollList
      data={data}
      renderItem={renderItem}
      onEndReached={fetchNextPage}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View marginVertical="$3">
            <Spinner />
          </View>
        ) : null
      }
      ListHeaderComponent={ListHeaderComponent}
      numColumns={numColumns}
    />
  );
};

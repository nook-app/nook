"use client";

import {
  FetchNftEventsResponse,
  GetNftCollectionEventsRequest,
  GetNftEventsRequest,
  NftEvent,
} from "@nook/common/types";
import { useNftCollectionEvents, useNftEvents } from "../../hooks/api/nfts";
import { InfiniteFeed } from "../../components/infinite-feed";
import { Loading } from "../../components/loading";
import { NftEventItem } from "./nft-event-item";
import { Separator } from "@nook/app-ui";

export const NftEvents = ({
  req,
  initialData,
  asTabs,
  paddingTop,
  paddingBottom,
}: {
  req: GetNftEventsRequest;
  initialData?: FetchNftEventsResponse;
  asTabs?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
}) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNftEvents(req, initialData);

  if (isLoading) {
    return <Loading />;
  }

  const events = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <InfiniteFeed
      data={events}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      asTabs={asTabs}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      renderItem={({ item }) => <NftEventItem event={item as NftEvent} />}
      ItemSeparatorComponent={() => (
        <Separator width="100%" borderBottomColor="$borderColorBg" />
      )}
    />
  );
};

export const NftCollectionEvents = ({
  req,
  initialData,
  asTabs,
  paddingTop,
  paddingBottom,
}: {
  req: GetNftCollectionEventsRequest;
  initialData?: FetchNftEventsResponse;
  asTabs?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
}) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNftCollectionEvents(req, initialData);

  if (isLoading) {
    return <Loading />;
  }

  const events = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <InfiniteFeed
      data={events}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      asTabs={asTabs}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      renderItem={({ item }) => <NftEventItem event={item as NftEvent} />}
      ItemSeparatorComponent={() => (
        <Separator width="100%" borderBottomColor="$borderColorBg" />
      )}
    />
  );
};

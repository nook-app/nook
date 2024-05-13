import { Channel, FetchChannelsResponse } from "@nook/common/types";
import { makeRequest } from "../utils";
import {
  useQuery,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useChannelStore } from "../../store/useChannelStore";

export const fetchChannel = async (channelId: string): Promise<Channel> => {
  return await makeRequest(`/farcaster/channels/${channelId}`);
};

export const useChannel = (channelId: string) => {
  const addChannels = useChannelStore((state) => state.addChannels);
  return useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const channel = await fetchChannel(channelId);
      addChannels([channel]);
      return channel;
    },
    enabled: !!channelId,
  });
};

export const fetchRecommendedChannels =
  async (): Promise<FetchChannelsResponse> => {
    // return await makeRequest("/farcaster/channels/recommended");
    return await makeRequest("/farcaster/users/0/recommended-channels");
  };

export const useRecommendedChannels = () => {
  const addChannels = useChannelStore((state) => state.addChannels);
  return useQuery<FetchChannelsResponse>({
    queryKey: ["channels", "recommended"],
    queryFn: async () => {
      const channels = await fetchRecommendedChannels();
      addChannels(channels.data);
      return channels;
    },
  });
};

export const searchChannels = async (
  query: string,
  cursor?: string,
  limit?: number,
): Promise<FetchChannelsResponse> => {
  return await makeRequest(
    `/farcaster/channels?query=${query}${cursor ? `&cursor=${cursor}` : ""}${
      limit ? `&limit=${limit}` : ""
    }`,
  );
};

export const useSearchChannels = (
  query: string,
  limit?: number,
  initialData?: FetchChannelsResponse,
) => {
  const addChannels = useChannelStore((state) => state.addChannels);
  return useInfiniteQuery<
    FetchChannelsResponse,
    unknown,
    InfiniteData<FetchChannelsResponse>,
    string[],
    string | undefined
  >({
    queryKey: ["channels", "search", limit?.toString() || "", query],
    queryFn: async ({ pageParam }) => {
      const data = await searchChannels(query, pageParam, limit);
      addChannels(data.data);
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [undefined],
        }
      : undefined,
    initialPageParam: initialData?.nextCursor,
    enabled: !!query,
  });
};

export const fetchChannels = async (
  channelIds: string[],
): Promise<FetchChannelsResponse> => {
  return await makeRequest("/farcaster/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channelIds }),
  });
};

export const useChannels = (channelIds: string[]) => {
  const addChannels = useChannelStore((state) => state.addChannels);
  return useQuery<FetchChannelsResponse>({
    queryKey: ["channels", channelIds.join(",")],
    queryFn: async () => {
      const channels = await fetchChannels(channelIds);
      addChannels(channels.data);
      return channels;
    },
    enabled: channelIds.length > 0,
  });
};

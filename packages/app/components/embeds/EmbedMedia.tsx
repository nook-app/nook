import { EmbedImage, EmbedImages } from "./EmbedImage";
import { EmbedVideo } from "./EmbedVideo";
import { EmbedTwitter } from "./EmbedTwitter";
import { Text } from "tamagui";
import { FarcasterCastResponse, UrlContentResponse } from "@nook/common/types";
import { formatToCDN } from "../../utils";

export const EmbedMedia = ({
  cast,
}: {
  cast: FarcasterCastResponse;
}) => {
  const isAllImages = cast.embeds.every(
    (embed) =>
      embed.type?.startsWith("image/") ||
      (!embed.type && embed.uri.includes("imgur.com")),
  );
  if (isAllImages) {
    return (
      <EmbedImages
        uris={cast.embeds.map(({ uri, type }) => formatToCDN(uri, { type }))}
      />
    );
  }

  const sortedEmbeds = cast.embeds.sort((a, b) => {
    const aPriority =
      a.type?.startsWith("image/") || a.type?.startsWith("video/") ? 1 : 0;
    const bPriority =
      b.type?.startsWith("image/") || b.type?.startsWith("video/") ? 1 : 0;
    return aPriority - bPriority;
  });

  return (
    <>
      {sortedEmbeds.map((content) => (
        <EmbedSingleMedia key={content.uri} content={content} />
      ))}
    </>
  );
};

const EmbedSingleMedia = ({ content }: { content: UrlContentResponse }) => {
  if (
    content.type?.startsWith("image/") ||
    (!content.type && content.uri.includes("imgur.com"))
  ) {
    return (
      <EmbedImage uri={formatToCDN(content.uri, { type: content.type })} />
    );
  }
  if (
    content.type?.startsWith("video/") ||
    content.type?.startsWith("application/x-mpegURL")
  ) {
    return <EmbedVideo content={content} />;
  }

  if (content.uri.includes("twitter.com") || content.uri.includes("x.com")) {
    return <EmbedTwitter content={content} />;
  }

  return (
    <Text numberOfLines={1} color="$mauve12">
      {content.uri}
    </Text>
  );
};

import { FarcasterUserFollowing } from "@nook/app/features/farcaster/user-profile/user-following";
import { fetchUserFollowing } from "@nook/app/api/farcaster/users";

export default async function User({
  params,
}: { params: { username: string } }) {
  const initialData = await fetchUserFollowing(params.username);
  return (
    <FarcasterUserFollowing
      username={params.username}
      initialData={initialData}
    />
  );
}

// https://warpcast.com/~/add-cast-action?url=https://fartcaster-action.vercel.app/api/fart

import { InstallAction } from "@nook/app/features/actions/install-action";
import { notFound } from "next/navigation";
import { PageNavigation } from "../../../components/PageNavigation";
import { DefaultSidebar } from "@nook/app/features/home/default-sidebar";
import { getServerSession } from "@nook/app/server/session";

const getActionMetadata = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default async function Install({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  if (!searchParams.url) return notFound();

  const [session, action] = await Promise.all([
    getServerSession(),
    getActionMetadata(searchParams.url),
  ]);

  if (!session || !action) {
    return notFound();
  }

  return (
    <PageNavigation sidebar={<DefaultSidebar />}>
      <InstallAction
        action={{
          name: action.name,
          icon: action.icon,
          description: action.description,
          aboutUrl: action.aboutUrl,
          actionType: action.action.type,
          postUrl: action.postUrl,
        }}
        redirectOnInstall
      />
    </PageNavigation>
  );
}

"use server";

import Header from "./components/Header";
import getAlbaTalkDetail from "./getAlbaTalkDetail";
import Content from "./components/Content";
import CommentSection from "./components/CommentSection";
import { cookies } from "next/headers";

interface pageProps {
  params: Promise<{ talkId: string }>;
}

const AlbaTalkDetailPage = async ({ params }: pageProps) => {
  const { talkId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("id")?.value;

  const response = await getAlbaTalkDetail(talkId);
  const info = response?.data;

  return (
    <div>
      <Header info={info} userId={Number(userId)} isLogin={accessToken} />
      <Content content={info.content} />
      <CommentSection
        id={info.id}
        userId={Number(userId)}
        isLogin={accessToken}
      />
    </div>
  );
};

export default AlbaTalkDetailPage;

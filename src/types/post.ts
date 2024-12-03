export interface PostCardProps {
  writer: {
    imageUrl: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
  content: string;
  title: string;
  id: number;
}

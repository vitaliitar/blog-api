export class CreateCommentDto {
  userId: string;
  postId: string;
  content: string;
}

export class UpdateCommentDto {
  userId?: string;
  postId?: string;
  content?: string;
}

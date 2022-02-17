export class CreatePostDto {
  userId: string;
  name: string;
  content: string;
}

export class UpdatePostDto {
  userId?: string;
  name?: string;
  content?: string;
}

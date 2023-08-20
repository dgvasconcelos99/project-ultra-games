export class CreateGameDto {
  id: string;
  title: string;
  price: number;
  publisherId: string;
  tags: string[];
  releaseDate: Date;
}

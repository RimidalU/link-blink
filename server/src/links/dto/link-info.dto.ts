import { IsString, IsDate, IsNumber } from 'class-validator';

export class LinkInfoDto {
  @IsString()
  originalUrl: string;

  @IsDate()
  createdAt: Date;

  @IsNumber()
  clickCount: number;
}

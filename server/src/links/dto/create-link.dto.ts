import {
  IsUrl,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MaxLength(20)
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message: 'Alias can contain only letters, numbers, underscore and dash',
  })
  alias?: string;

  @IsOptional()
  expiresAt?: Date;
}

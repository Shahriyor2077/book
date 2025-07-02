import { PartialType } from '@nestjs/swagger';
import { CreateBookMarkDto } from './create-book-mark.dto';

export class UpdateBookMarkDto extends PartialType(CreateBookMarkDto) {}

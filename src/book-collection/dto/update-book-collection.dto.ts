import { PartialType } from '@nestjs/swagger';
import { CreateBookCollectionDto } from './create-book-collection.dto';

export class UpdateBookCollectionDto extends PartialType(CreateBookCollectionDto) {}

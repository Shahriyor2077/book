import { PartialType } from "@nestjs/swagger";
import { CreateBookVersionDto } from "./create-book-version.dto";

export class UpdateBookVersionDto extends PartialType(CreateBookVersionDto) {}

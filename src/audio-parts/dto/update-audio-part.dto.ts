import { PartialType } from '@nestjs/swagger';
import { CreateAudioPartDto } from './create-audio-part.dto';

export class UpdateAudioPartDto extends PartialType(CreateAudioPartDto) {}

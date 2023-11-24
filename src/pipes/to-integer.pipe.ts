import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ToIntegerPipe implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata): number {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException(`conversion to number failed ${val}`);
    }
    return val;
  }
}

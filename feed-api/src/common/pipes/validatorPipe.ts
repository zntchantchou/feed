import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodObject } from 'zod';

export class ValidatorPipe implements PipeTransform {
  // better typing ?
  constructor(private schema: ZodObject<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (err: any) {
      let errors;
      if (err?.format()['_errors']) {
        errors = { ...err.format() };
        delete errors['_errors'];
      }
      throw new BadRequestException(errors);
    }
    return value;
  }
}

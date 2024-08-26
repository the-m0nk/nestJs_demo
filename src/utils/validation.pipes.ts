import {
    BadRequestException,
    Injectable,
    PipeTransform,
    ArgumentMetadata,
  } from '@nestjs/common';
  import Joi from 'joi';
  
  @Injectable()
  export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema) {}
  
    transform(value: any, metadata: ArgumentMetadata) {
      const { error } = this.schema.validate(value);
  
      if (error) {
        throw new BadRequestException(
          `Validation failed: ${error.message}`,
          error.message,
        );
      }
  
      return value;
    }
  }
  
  @Injectable()
  export class JoiHeaderValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema) {}
  
    transform(value: any, metadata: ArgumentMetadata) {
      const { error } = this.schema.validate(value);
  
      if (error) {
        throw new BadRequestException(
          `Header validation failed: ${error.message}`,
          error.message,
        );
      }
  
      return value;
    }
  }
  
  @Injectable()
  export class JoiValidationCompositePipe implements PipeTransform {
    constructor(
      private readonly bodySchema: Joi.ObjectSchema,
      private readonly headerSchema: Joi.ObjectSchema,
    ) {}
  
    transform(value: any, metadata: ArgumentMetadata) {
      if (metadata.type === 'body') {
        return new JoiValidationPipe(this.bodySchema).transform(value, metadata);
      } else if (metadata.type === 'custom' && metadata.data === 'headers') {
        return new JoiHeaderValidationPipe(this.headerSchema).transform(
          value,
          metadata,
        );
      }
  
      return value;
    }
  }
  
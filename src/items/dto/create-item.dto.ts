import Joi from "joi";

export class CreateItemDto {
    readonly name: string;
    readonly description?: string;
    readonly quantity?: number;
  }


  export class getDto {
    name : string;
    description : string;
    quantity : number;
    static validateSchema = {
      query: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required()
      }
    };
  }
  
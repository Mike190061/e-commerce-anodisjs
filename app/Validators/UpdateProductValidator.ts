import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      name: schema.string({ trim: true }),
      price: schema.number()
    })
  
    public messages = {}
  }
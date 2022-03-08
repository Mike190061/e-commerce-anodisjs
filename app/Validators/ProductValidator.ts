import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
    constructor(protected ctx: HttpContextContract) {}
  
    public schema = schema.create({
      name: schema.string({ trim: true }),
      price: schema.number(),
      category_slug: schema.string()
    })
  
    public messages = {}
  }
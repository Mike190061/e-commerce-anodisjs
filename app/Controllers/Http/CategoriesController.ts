import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreCategoryValidator from 'App/Validators/StoreCategoryValidator'
import Category from 'App/Models/Category'
import UpdateValidator from 'App/Validators/UpdateValidatior'

export default class CategoriesController {
    public async store({ request }: HttpContextContract) {
        const payload = await request.validate(StoreCategoryValidator)
        
        const category = await Category.create(payload)

        return category
    }

    public async update({request}: HttpContextContract){
        const payload = await request.validate(UpdateValidator)
        const updatedCategory = await Category.query().where('name', payload.name).update('icon', payload.icon)
        return updatedCategory

    }
}


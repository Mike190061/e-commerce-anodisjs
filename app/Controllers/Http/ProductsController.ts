import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
    public async create({ request, response }: HttpContextContract) {
        const payload = await request.validate(ProductValidator)
        const category = await Category.findBy('slug', payload.category_slug)
        if (!category){
            return response.notFound('Category not found!')
        }
        else {
            const product = await Product.create({
                name: payload.name,
                price: payload.price,
                categoryId: category.id
            })
            return product
        }
    }

    public async update({request, params, response}: HttpContextContract){
        const payload = await request.validate(UpdateProductValidator)
        const product = await Product.find(params.id)
        if (!product){
            return response.notFound('Product not found')
        }

        await product.merge(payload).save()
        return product
    }

    public async show({request}: HttpContextContract){
        const page = request.qs().page || 1
        const pageLimit = request.qs().pageLimit || 5
        const products = await Product.query().preload('category').paginate(page, pageLimit)
        return products
    }
}


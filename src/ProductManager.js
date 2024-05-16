import fs from "fs";

class ProductManager {
    constructor () {
        this.products = []
        this.path = './src/Productos.json'
    }

    getProducts = async (limit)  => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            this.product = JSON.parse(data)
            return limit === 0 ? this.product:this.product.slice(0, limit)
        }
        catch (error){
            return (error)
        }
    }


    addProduct  = async (newProduct) => {
        this.getProducts()
        try{
            if (!newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.thumbnail ||
                !newProduct.stock ||
                !newProduct.code) return 'Error: Todos los campos son obligatorios'
            let codProd = this.product.find(prod => prod.code === newProduct.code)
            if (codProd) return 'Codigo duplicado' 
            this.product.push({id: this.product.length + 1 , ...newProduct})
            await fs.promises.writeFile(this.path, JSON.stringify(this.product,'utf-8','\t'))
            return 'Producto cargado'
        }
        catch (error){
            return(error)
        }
	}	

    getProductById = async (id) => {
        this.getProducts()
        let producto = this.product.find(prod => prod.id === id)
        if (!producto) return 'No encontrado' 
        return producto
    }

    updateProduct  = async (id, updProd) => {
        try{
            let producto = this.product.find(prod => prod.id === id)
            if (!producto) return 'No encontrado'
            producto.title = updProd.title
            producto.description = updProd.description
            producto.price = updProd.price
            producto.thumbnail = updProd.thumbnail
            producto.stock = updProd.stock
            producto.code= updProd.code
            await fs.promises.writeFile(this.path, JSON.stringify(this.product,'utf-8','\t'))
            return 'Producto Actualizado'
            }
        catch (error){
            return(error)
        }
    }

    deleteProduct  = async (idDelete) => {
        this.products = await this.getProducts()
        try{
            const remove = this.product.filter(prod => prod.id !== idDelete) 
            if (!remove) return 'Id no encontrado'
            console.log(remove)
            await fs.promises.writeFile(this.path, JSON.stringify(remove,'utf-8','\t'))
            return 'Producto eliminado'
        }
        catch (error){
            return(error)
        }
    }
}

export default ProductManager;

// const producto = new ProductManager('./Productos.json');
// const fileUse = async() =>{
//     console.log(await producto.getProducts())
    // console.log(await producto.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'sin imagen', stock: 25, code: 'abc123'}))
    // console.log(await producto.addProduct({title: 'producto prueba2', description: 'Este es un producto prueba2', price: 200, thumbnail: 'sin imagen', stock: 200, code: 'abc124'}))
    // console.log(await producto.addProduct({title: 'producto prueba3', description: 'Este es un producto prueba3', price: 300, thumbnail: 'sin imagen', stock: 200, code: 'abc125'}))
//     console.log(await producto.getProducts())
    // console.log(await producto.updateProduct(1, {title: 'producto modificado', description: 'Este es un producto prueba', price: 200, thumbnail: 'sin imagen', stock: 200, code: 'abc125'}))
//     console.log(await producto.deleteProduct(2))
//     console.log(await producto.getProducts())
//     console.table(await producto.getProductById(2))
// }
// fileUse();
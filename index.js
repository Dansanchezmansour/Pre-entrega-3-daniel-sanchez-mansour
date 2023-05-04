
const cardsContainerHTML = document.querySelector(".cards-container")


class CartManager {
    constructor(){
        this.cart = []
    }
    saveCart = () =>{
        localStorage.setItem("cart", JSON.stringify(this.cart))
    }
    getLocalCart = () =>{
        const obteinedCart = JSON.parse(localStorage.getItem("cart"))
        if(obteinedCart){
            this.cart = obteinedCart
        }else{
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
    }
    addToCart = (productToAdd) =>{
        if(this.cart.some(product => Number(product.id) === Number(productToAdd.id))){
            this.cart.forEach(product => {
                if(Number(product.id) === Number(productToAdd.id)){
                    product.quantity++
                }
            })
        }else{
            this.cart.push({...productToAdd, quantity: 1})
        }
        this.saveCart()
    }
}
/* const products =  */
class ProductsManager {
    constructor(){
        this.productsToRender = [
            {
                category:{
                    id: 1,
                    name: "Clothes",
                },
                price: 372,
                title: "Remera",
                id: 0,
                images: [
                    "https://www.segutecnica.com/thumb/000000000001756537023remera-gris-segutecnica_800x800.png"
                ]
            },
            {
                category:{
                    id: 1,
                    name: "Clothes",
                },
                price: 458,
                title: "Remera gris",
                id: 1,
                images: [
                    "https://www.segutecnica.com/thumb/000000000001756537023remera-gris-segutecnica_800x800.png"
                ]
            },
            {
                category:{
                    id: 1,
                    name: "Clothes",
                },
                price: 572,
                title: "Remera verde",
                id: 2,
                images: [
                    "https://www.segutecnica.com/images/000000000000078772934camisa-verde-segutecnica.png"
                ]
            },
            {
                category:{
                    id: 1,
                    name: "Clothes",
                },
                price: 372,
                title: "Remera azul",
                id: 3,
                images: [
                    "https://www.segutecnica.com/images/000000000000681572978camisa-azul-segutecnica.png"
                ]
            },
        ]
    }

    addProduct = (product) =>{
        this.productsToRender.push(product)
    }
    getProducts = () => this.productsToRender
    renderProducts = () =>{

        cardsContainerHTML.innerHTML = ""
        this.productsToRender.forEach((product) => {
            cardsContainerHTML.innerHTML += `
            <div class="card">
                <h3>${product.title}</h3>
                <img src=${product.images[0]} class="card-img">
                <div class="card-info-container">
                    <p>Price: $${product.price} </p>
                    <span class="card-category">${product.category.name}</span>
                </div>
                <button class="btn card-btn-add" id="btn-buy-${product.id}">Add</button>
            </div>
            `
        })
        const btnBuyListHTML = document.getElementsByClassName("card-btn-add")
        for(const btn of btnBuyListHTML){
            btn.addEventListener("click", () =>{
                cartManager.addToCart(
                    this.productsToRender.find(product => product.id === Number(btn.id.split("-").pop()))
                    )
            })
        }
        
    }

}

const productsManager = new ProductsManager()
const cartManager = new CartManager()
cartManager.getLocalCart()
productsManager.renderProducts()



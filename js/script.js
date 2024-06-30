async function getProducts (){
    let response = await fetch("store_db.json")
    let products = await response.json()
    return products
}
let products = await getProducts()
console.log(products)



function getCardHTML(product) {
    let productData = JSON.stringify(product) // Створюємо JSON-рядок з даними про товар
    return      `<div class="my-card" style="">
                    <img src="img/${product.image}">
                    <h5 class="text-my-card">${product.title}</h5>
                    <p class="description-card"> ${product.description} </p>
                    <button type="button" data-product='${productData}' class="cart-btn">Купити</button>
                </div>`
}


getProducts().then(function(products){
    let productsList = document.querySelector('.products-list')
    if (productsList) { 
        products.forEach(function(product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
})

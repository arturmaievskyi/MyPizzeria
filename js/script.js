async function getProducts (){
    let response = await fetch("store_db.json")
    let products = await response.json()
    return products
}


let products = await getProducts()
console.log(products)



function getCardHTML(product) {
    let productData = JSON.stringify(product); 
    return      `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
}


getProducts().then(function(products){
    let productsList = document.querySelector('.pizzas')
    if (productsList) { 
        products.forEach(function(product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
})

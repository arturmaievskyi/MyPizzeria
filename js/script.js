async function getProducts ()

{
    let response = await fetch("store_db.json")
    let products = await response.json()
    return products
}


function getCardHTML(product) 
{
    let productData = JSON.stringify(product); 
    return      `<div class="card text-bg-dark" style="max-width: 25rem;">
                    <img src="${product.image}" class="card-img" >
                    <div class="card-img-overlay">
                      <h5 class="card-title">${product.name}<h5>
                      <p class="card-text ">${product.description}</p>
                      <div><p class="badge rounded-pill text-bg-warning">Price: ${product.price} euro</p></div>
                      <button type="button" class="btn btn-danger cart-btn">Order</button>
                    </div>
                  </div>`
}



getProducts().then(function(products)
{
    let productsList = document.querySelector('.pizzas')
    if (productsList) { 
        products.forEach(function(product) {
            productsList.innerHTML += getCardHTML(product)
        })
    }
})



async function getSlaves ()
{
    let response = await fetch("slaves.json")
    let slaves = await response.json()
    return slaves
}



function getSlavesHTML(slaves) 
{
    let slavesData = JSON.stringify(slaves); 
    return      `   <div class="slave card text-bg-dark">
                        <img src="${slaves.image}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${slaves.name}</h5>
                            <p class="card-text">${slaves.about}</p>
                            <p>He recievs ${slaves.pay}</p>
                            <p>He is: ${slaves.work}<p>
                        </div>
                    </div>`
}



getSlaves().then(function(slaves)
{
    let slavesList = document.querySelector('.slaves')
    if (slavesList) { 
        slaves.forEach(function(slaves) {
            slavesList.innerHTML += getSlavesHTML(slaves)
        })
    }
})



function addToCart(event) 
{
    const productData = event.target.getAttribute('data-product')
    const product = JSON.parse(productData)
    cart.addItem(product)
}



getAll().then(function (all) 
{

    let buyButtons = document.querySelectorAll('.cart-btn')
    if (buyButtons) {
        buyButtons.forEach(function (button) 
        {
            button.addEventListener('click', addToCart)
        });
    }
})



class ShoppingCart 
{
    constructor() 
    {
        this.items = {}
        this.total = 0  
    }



    addItem(item) 
    {
        if (this.items[item.title]) 
        {
        this.items[item.title].quantity += 1         
        } 
        else 
        {
            this.items[item.title] = item
            this.items[item.title].quantity = 1
        }
        this.saveCartToCookies() 
    }
          
    
    
    calculateTotalPrice() 
    {
    } 
        saveCartToCookies() 
        {
            let cartJSON = JSON.stringify(this.items)
            document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`
        }
    

        
    loadCartFromCookies() 
    {
        let cartCookie = getCookieValue('cart') 
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie)
        }
    }
}



let cart = new ShoppingCart()
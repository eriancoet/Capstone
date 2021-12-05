let count = 0;
/* The products */
let products = [{
    name: 'Blackberry',
    tag: 'blackberry-style',
    detail: '64GB dual Chip Sim',
    price: 5600,
    inCart: 0,
  },
  {
    name: 'Boost Mobile',
    tag: 'Boost-mobile',
    detail: '32GB Dual Sim',
    price: 6400,
    inCart: 0,
  },
  {
    name: 'Iphone4',
    tag: 'iphone4',
    detail: '128GB dual chip sim',
    price: 8400,
    inCart: 0,
  },
  {
    name: 'LG Tribute2',
    tag: 'LGTribute2',
    detail: '64GBDual Chip sim',
    price: 7400,
    inCart: 0,
  },
  {
    name: 'NET10-SIII',
    tag: 'NET10-SIII',
    detail: '64GBDual Chip sim',
    price: 6400,
    inCart: 0,
  },
  {
    name: 'Optimus-t500',
    tag: 'Optimus-t500',
    detail: '32GB dual chip sim',
    price: 6300,
    inCart: 0,
  }

]

/* This is the add button, the code that adds the number and cost */
let cartCost = localStorage.getItem('totalCost');
let cartAddBtn = document.querySelectorAll('.cart-btn');
for (let i = 0; i < cartAddBtn.length; i++) {
  cartAddBtn[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);

  })
}


/* The code is to load the Cart amount, the amount of products */
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart-nav .item-count').textContent = productNumbers;
  }
}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');


  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart-nav .item-count').textContent = productNumbers + 1;

  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart-nav .item-count').textContent = 1;
  }
  setItems(product);
}

/* To set the items to local storage */
function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }

    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}
//if add to cart btn clicked
$('.cart-btn').on('click', function () {
  let cart = $('.cart-nav');
  // find the img of that card which button is clicked by user
  let imgtodrag = $(this).parent('.buttons').parent('.content').parent('.card').find("img").eq(0);
  if (imgtodrag) {
    // duplicate the img
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      'opacity': '0.8',
      'position': 'absolute',
      'height': '150px',
      'width': '150px',
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 20,
      'left': cart.offset().left + 30,
      'width': 75,
      'height': 75
    }, 1000, 'easeInOutExpo');
    setTimeout(function () {
      count++;
      $(".cart-nav .item-count").text(count);
    }, 1500);
    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach()
    });
  }
});
/* The totalCost of the products is cartCost */
function totalCost(product) {

  // console.log("The product price is ", product.price);
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {

    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost +
      product.price);
    alert("Total is R" + cartCost);



  } else {
    localStorage.setItem("totalCost", product.price);

  }
}


/* To display the cart */

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
  <div class="product"> 
    
    <img src="images/${item.tag}.jpeg">
    <span>${item.name}</span>
  
    
    <div class="crtPrice">R${item.price}</div>
   
    <div class="quantity">
    <ion-icon name="arrow-dropleft"></ion-icon>
    <span>${item.inCart}</span> 
    <ion-icon name="arrow-dropright"></ion-icon>
    </div>

    <div class="total">
    R${item.inCart * item.price}.00
    </div>
    `
    });
    productContainer.innerHTML += `
<div class="basketTotalContainer">
<h5 class="basketTotalTitle">
Cart Total
</h5>
<h5 class="basketTotal">
  R${cartCost}.00
  </h5>
  </div>
`

  }
}

/* The shipping is below */

function getShipping() {
  let door = document.getElementById("door");
  let post = document.getElementById("post");
  let pickUp = document.getElementById("pickUp");
  let cartCost = localStorage.getItem('totalCost');
  let cartCount = parseInt(cartCost);


  if (door.checked == true) {
    totalDoor = (300 + cartCount);
    alert("Your total is :" + totalDoor);

    document.getElementsById('shipTotal').innerHTML = cartCount;

  } else if (post.checked == true) {
    totalPost = (80 + cartCount);
    alert("The total is: " + totalPost);
  } else if (pickUp.checked == true) {
    alert("The channel selected is: " + cartCount);

  }

}

//add click functionality to radio buttons
Array.from(document.querySelectorAll('input[type="radio"]')).forEach(function (item, index) {
  item.addEventListener('click', save);
});

function save() {
  //Radiobuttons  
  let radioBut = document.querySelector('input[name="shipping-cost"]:checked');
  radioBut = (radioBut) ? radioBut.value : '';
  localStorage.setItem("radioBut", radioBut);
}

function reload() {
  // Radiobuttons    
  // get a list of DOM elements
  let radBut = Array.from(document.getElementsByName('shipping-cost'));
  let val1 = localStorage.getItem('radioBut');
  for (let i = 0; i < radBut.length; i++) {
    if (radBut[i].value == val1) {
      radBut[i].checked = true;


    }
  }
}

/* This is to set the final Total on the check out page
*/
function finalTot() {
  let cartCost = localStorage.getItem('totalCost');
  let shippingAdd = localStorage.getItem('radioBut');
  let cartCount = parseInt(cartCost);
  let shipCount = parseInt(shippingAdd);
  let finalName = (shipCount + cartCount);
  document.getElementById('shipTotal').innerHTML = ("R" + finalName);
}

/* For coupon discount */
function couponDiscount() {
  let cartCost = localStorage.getItem('totalCost');
  let shippingAdd = localStorage.getItem('radioBut');
  let cartCount = parseInt(cartCost);
  let shipCount = parseInt(shippingAdd);
  let finalName = (shipCount + cartCount);

  let discount = (0.7 * finalName);

  document.getElementById('finalTotal').innerHTML = ("R" + discount);
}

/* To clear the localstorage after checkout is complete */
function clearClick() {
  window.open("finished.html")
  localStorage.clear();
}

/* Functions */
reload();
onLoadCartNumbers();
displayCart();
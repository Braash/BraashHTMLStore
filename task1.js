//A variable that looks for any elements with the class of '.addtocart'.
let carts = document.querySelectorAll('.addtocart');
let breakingpoint = 0;
//My print objects(6).
let prints = [
  {
    name: 'Mark Rothko',
    price: 500,
    inCart: 0,
    tag: '01.jpg',
  },
  {
    name: 'Jenny Saville',
    price: 400,
    inCart: 0,
    tag: '02.png',
  },
  {
    name: 'Francis Bacon',
    price: 550,
    inCart: 0,
    tag: '03.jpg',
  },
  {
    name: 'Avery Singer',
    price: 400,
    inCart: 0,
    tag: '04.jpg',
  },
  {
    name: 'Albert Oehlen',
    price: 450,
    inCart: 0,
    tag: '05.jpg',
  },
  {
    name: 'Paul Cezanne',
    price: 600,
    inCart: 0,
    tag: '06.jpg',
  },
]

let aprice = prints.price;

//The for loop loops through the '.addtocart' buttons and when the user clicks on one: the function cartNumbers is called with the print as a parameter.
for(let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(prints[i]);
    totalCost(prints[i]);
  })
};

/*
This function checks if anything is stored in localStorage.
if something exists, the number equals the value of printNumbers variable(which has the value of cartNumbers).
*/
function onLoadCartNumbers(){
  let printNumbers = localStorage.getItem('cartNumbers');

  if(printNumbers){
    document.querySelector('#carticon span').textContent = printNumbers;
  }
}

/*
This function checks if anything is stored in localStorage and saves that value to a variable called printNumbers.
If something is stored in localStorage, that value will still be in the form of a string.
parseInt will convert that value to a number.
The if statement checks whether something exists. If so, it adds 1 to the existing number(printNumbers).
And adds 1 to the span number thats is exists in my HTML file.
else, cartNumbers will be given the value of one(the first order) and the inner HTML of span with increase by 1.
setItems is declared with the parameter of (print).
*/
function cartNumbers(print){
  let printNumbers = localStorage.getItem('cartNumbers');

  printNumbers = parseInt(printNumbers);

  if(printNumbers){
    localStorage.setItem('cartNumbers', printNumbers + 1);
    document.querySelector('#carticon span').textContent = printNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('#carticon span').textContent = 1;
  }

  setItems(print);
}


/*
This function is called in the cartNumbers function.
This function checks if anything is stored in localStorage with the key of 'printsInCart'.
*/
function setItems(print){
  let cartItems = localStorage.getItem("printsInCart")
  cartItems = JSON.parse(cartItems);

  if(cartItems != null) { //if cartItems is different to null.

    if(cartItems[print.name] == undefined){//if cartItems[print.name] == undefined
       cartItems = {
          ...cartItems, // Rest operator grabs whatever was in your cartItems from before.
          [print.name]: print // And then adds this new print
       }
    }
    cartItems[print.name].inCart += 1; //The inCart method is increased by 1 (cartItems[print.name]=cartItems['Mark Rothko'])
  }else{
    print.inCart = 1; // Your inCart will be set to 1 because its the users first order.
     cartItems = {
        [print.name]: print
    }
  }
   localStorage.setItem("printsInCart", JSON.stringify(cartItems));
}

/*
This function gets the totalCost from the local storage and stores it inside a variable named cartCost.
The if statement check whether something exists inside the localStorage, If so, the totalCost + prints price is stored as the updated totalCost.
Else the prints price is stored as the totalCost because its the first item added to the cart.
The user is then alerted about the amount that is stored.
*/
function totalCost(print){
  let cartCost = localStorage.getItem("totalCost");
  

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + print.price);
  }else{
    localStorage.setItem("totalCost", print.price)
  };

  alert(localStorage.getItem("totalCost"));

};

/*
This function alerts the user of the final amount owed once the user checks out.
And gives the user a unique reference number.
*/
function alertFTotal(){
  let cartCost = localStorage.getItem("totalCost");
  let vatTotal = Math.ceil(cartCost * 1.14)
  let refC = Math.floor(Math.random() * 55555)
  alert('Your total is ' + vatTotal + ' and your unique Reference number is ' + refC);
};

/*
This function checks what delivery option, location and coupon the user will apply to their order.
The delivery option is done using radio buttons and alyers the final cost if the user decides to use the delivery option.
The location selector uses a dropdown and depending on what location the user chooses influences the prices of the final amount.
The coupon system uses a input that takes in a random code.
Once the user has set their preferences, the only thing left to do is click the Apply button which will invoke the function below.
*/
function dOrC(){
  if (breakingpoint == 0){
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    let rb1 = document.getElementById("rb1");
    let d1 = document.getElementById("disc").innerHTML;
    let d2 = document.getElementById("discount").innerHTML;
    document.getElementById("discount");
    
    let s = document.getElementById("inlineFormCustomSelect").value
    
      if (s == "1"){
          localStorage.setItem("totalCost", cartCost * 1.1);
        }else if(s == "2"){
          localStorage.setItem("totalCost", cartCost * 1.2);
        }else if(s == "3"){
          localStorage.setItem("totalCost", cartCost * 1.2);
        }else{
          localStorage.setItem("totalCost", cartCost);
        };

        
        let input = document.getElementById("cc").value;
        if(input){
        localStorage.setItem("totalCost", cartCost * 0.8);
      }
      if(rb1.checked == true){
        d1 = cartCost * 1.1
        d2 = cartCost * 1.1
        let final = localStorage.getItem("totalCost");
        final = final * 1.1
        localStorage.setItem("totalCost", final);
      }
        breakingpoint++;
        displayCart()
        }
        
    displayCart();
};
 
/*
This function displays the contents of the order once you reach the checkout page.
*/
function displayCart(){
  let cartItems = localStorage.getItem("printsInCart");
  cartItems = JSON.parse(cartItems);

  let container = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if(cartItems && container){
    container.innerHTML = '';
    Object.values(cartItems).map(item =>{
      container.innerHTML += `
      <div class= "product"> 
        <img src="images/${item.tag}">
        <span>${item.name}</span>
      </div>
      <div class="price">${item.price}</div>
      <div class="quantity">
        <span>${item.inCart}</span>
      </div>
      <div class="total">
        <span>${item.inCart * item.price}</span>
      </div>
      `;
    });

    container.innerHTML +=`

    
    
    <div class="baskettc">
     <h5 class="baskettt">
        Total 
     </h5>
     <h4 id="disc" class="baskett">
     ${Math.round(cartCost)}
     </h4>
     <br>
     <h5 class="baskettt">
        Total inc (VAT)
     </h5>
     <h4 id="discount" class="baskett">
      ${Math.round(cartCost * 1.14)}
     </h4>
     <button class="basketb" onclick="alertFTotal()">Checkout</button>
    </div>
    `;
  }
}

// JQUERY

$(document).ready(function() {
  $("#picturejq").click(function(){
    $("#picturejq").hide("slow");
  });

//This function slowly hides a <p> element once the user clicks on it.

$("#butt2").click(function(){
  $("*").css("backgroundColor", "black").slideUp(2000).slideDown(2000);
});
//This function will chain all page elements once the button has been clicked by the user.
//The background colour will also change in the process.

$("#cat").click(function(){
  $("#cat").fadeOut(2000);
});

//This function hides a div element in 2 seconds once the user clicks on it.

$('.parentmenu').hover(function() {
  if ($(this).find('.dropdown').css('display') == 'none'){
    $(this).find('.dropdown').addClass('deployed');
  }
  else {
    $(this).find('.dropdown').removeClass('deployed');
  }

//This function creates an accordion dropdown.
//The dropdown will fall once the user hovers over the element.

});
});

// Functions onLoadCartNumbers(); displayCart(); being invoked.

onLoadCartNumbers(); 
displayCart();



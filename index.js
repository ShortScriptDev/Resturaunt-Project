var order = [];
var orderIndex = 0;
var stateTax = 0.1;
var subtotal = 0;
var total = 0;
var nameadded = false;
var numadded = false;
var addressadded = false;
var amountOfItem = 0;
var orderNum = 0;
var orderItems = {};
var i = 0;
var itemsadded = [];
var deliveryFee = 8.0;
var delivery = false;
var finalOrder = [];

var addBttns = document.getElementsByClassName('additem');
console.log(addBttns);
for(let i = 0; i < addBttns.length; i++){
  addBttns[i].addEventListener("click", ()=>{
    // eventlistener for order started
    var orderBegin = document.querySelector(".placeorder-bttn");
    orderBegin.innerHTML = '<button class="orderstarted">MANAGE ORDER</button>'; 
    document.querySelector(".orderstarted").addEventListener("click", () => {
      document.querySelector(".manage-order").style = "visibility: visible";
    }) 
    document.querySelector(".bi-x-circle-fill").addEventListener("click", () => {
      document.querySelector(".manage-order").style = "visibility: hidden";
    });
    document.querySelector(".delivery").addEventListener("click", () => {
      document.querySelector(".selected").classList.remove("selected");
      document.querySelector(".delivery").classList.add("selected");
    })
    document.querySelector(".pickup").addEventListener("click", () => {
      document.querySelector(".selected").classList.remove("selected");
      document.querySelector(".pickup").classList.add("selected");
        });
    var parentEl = addBttns[i].parentElement;
    var menuItem = parentEl.innerText;
    var orderDetails = menuItem.split(/\n\n/);
    var number = orderDetails[1].replace("$", "");
    console.log(parentEl);
    console.log(menuItem);
    console.log(orderDetails);
    console.log(number);
    subtotal = number;
    taxes = number * 0.2;
    total = subtotal + taxes;
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);
  
    //end of click eventlistener for each button.
  });
  //end of for loop for each button
};

//add event listener for start order *
//add event listener for add item to order *
//add event listener for remove item from order
// event listener for place order

// calulate order total plus tax
// create an object from element innerText and add to an array for order *
// get parent element of button clicked. *
// to add each order array to the Final order array *

//integrate payment api system for place order button.
// send data to api.
/*var order = [];
var orderIndex = 0;
var stateTax = 0.1;
var subtotal = 0;
var total = 0;
var nameadded = false;
var numadded = false;
var addressadded = false;
var amountOfItem = 0;
var orderNum = 0;
var orderItems = {};
var i = 0;
var itemsadded = [];
var deliveryFee = 8.0;
var delivery = false;
var finalOrder = [];*/
/*
arrClass.forEach((item, i) => {
  //there are 28 items and i(index) in the arrClass
  item.addEventListener("click", (event) => {
    var parentEl = event.target.parentElement;
    var menuItem = parentEl.innerText;
    var orderDetails = menuItem.split(/\n\n/);
    var number = orderDetails[1].replace("$", "");
    orderItems = {};
    var price = Number(number);
    //add data from element to the global order array
    orderItems.title = orderDetails[0];
    orderItems.price = price;
    //orderitems is changing everytime we additem
    order.push(orderItems);
    // add price to the subtotal of order
    subtotal += price;
    //
    var taxes = subtotal * stateTax;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);

    //incrament order number
    if (itemsadded.includes(i)) {
      var itemEl = document.getElementById(order[orderNum].title);
      itemEl = itemEl.parentElement.querySelector(".amountofitem");
      var quantity = itemEl.innerText;
      quantity = Number(quantity);
      var updateQuant = quantity + 1;
      itemEl.innerHTML = `${updateQuant}`;
        console.log(order);
        } else {
      var orderLists = document.querySelector(".placeorder-items");
      var placeOrderItem = document.createElement("div");
      placeOrderItem.innerHTML = `
     <div class="order-list">\
     <p id="${order[orderNum].title}">${order[orderNum].title}</p>\
     <p class="price" >${order[orderNum].price}</p>
     <div class="order-manage">\
     <p class="amountofitem">1</p>\
     <div style="display: grid;grid-template-columns: 1fr 1fr;">\
     <button class="removeitems">-</button>\
     <button class="additems">+</button>\
     </div>\
     </div>`;
      orderLists.append(placeOrderItem);
      itemsadded.push(i);
    }
    orderNum++;
    amountOfItem++;
    // eventlistener for order started
    var orderBegin = document.querySelector(".placeorder-bttn");
    orderBegin.innerHTML = '<button class="orderstarted">MANAGE ORDER</button>';

    document.querySelector(".orderstarted").addEventListener("click", () => {
      document.querySelector(".manage-order").style = "visibility: visible";
      document
        .querySelector(".bi-x-circle-fill")
        .addEventListener("click", () => {
          document.querySelector(".manage-order").style = "visibility: hidden";
        });
      document.querySelector(".delivery").addEventListener("click", () => {
        document.querySelector(".selected").classList.remove("selected");
        document.querySelector(".delivery").classList.add("selected");
        var customerInfo = document.querySelector(".customer-info");
        var addToSummary = document.querySelector(".summary");
        var DelivAdd = document.createElement("div");
        customerInfo.append(DelivAdd);
        DelivAdd.innerHTML =
          '<div>\
            <p>Delivery Address</p>\
            <input id="delivery-address" required placeholder="123 street unit/apt #"type="text"/>\
            <button class="addaddress">Add to order</button>\
            </div>';
        //
        var addDeliveryFee = document.createElement("div");
        addDeliveryFee.classList.add("orderdetails");
        addDeliveryFee.classList.add("delivery-fee");
        addDeliveryFee.innerHTML = `<p>Delivery Fee</p><p>${deliveryFee}</p>`;
        total += deliveryFee;
        console.log(addDeliveryFee);
        document.querySelector(".total").innerHTML = total.toFixed(2);
        document.querySelector(".summary").prepend(addDeliveryFee);
        delivery = true;

        document.querySelector(".pickup").addEventListener("click", () => {
          document.querySelector(".selected").classList.remove("selected");
          document.querySelector(".pickup").classList.add("selected");
          DelivAdd.remove();
          var deliveryAddEl = document.querySelector(".delivery-address");
          var deliveryFeeEl = document.querySelector(".delivery-fee");
          if (typeof deliveryAddEl != "undefined" && deliveryAddEl != null) {
            document.querySelector(".delivery-address").remove();
          }
          if (typeof deliveryFeeEl != "undefined" && deliveryFeeEl != null) {
            document.querySelector(".delivery-fee").remove();
            total -= deliveryFee;
            document.querySelector(".total").innerHTML = total.toFixed(2);
            delivery = false;
          }
        });
        document.querySelector(".addaddress").addEventListener("click", () => {
          var addToSummary = document.querySelector(".summary");
          var address = document.getElementById("delivery-address").value;
          var addAddress = document.createElement("div");
          addAddress.classList.add("orderdetails");
          addAddress.classList.add("delivery-address");
          var element = document.querySelector(".delivery-address");
          //

          if (typeof element != "undefined" && element != null) {
            // Exists.
            console.log("address exists already");
            var updatedAdress =
              document.getElementById("delivery-address").value;
            document.querySelector(".addressadded").innerText = updatedAdress;
            document.getElementById("delivery-address").value = "";
          } else {
            console.log("address not added");
            addAddress.innerHTML = `<p>Delivery Address</p> <p class="addressadded">${address}</p>`;
            addToSummary.prepend(addAddress);
            document.getElementById("delivery-address").value = "";
            var addAddbutt = document.querySelector(".addaddress");
            addAddbutt.style = "background-color:lightgreen";
            addAddbutt.innerText = "Update Address";
          }
        });
      });
      document.querySelector(".addname").addEventListener("click", () => {
        var addToSummary = document.querySelector(".summary");
        var name = document.getElementById("name").value;
        var addName = document.createElement("div");
        addName.classList.add("orderdetails");
        if (nameadded === false) {
          addName.innerHTML = `<p>Name on Order</p> <p class="nameadded">${name}</p>`;
          addToSummary.prepend(addName);
          var addNamebutt = document.querySelector(".addname");
          addNamebutt.style = "background-color:lightgreen";
          addNamebutt.innerText = "Update Name";
          document.getElementById("name").value = "";
          nameadded = true;
        } else {
          var updatedName = document.getElementById("name").value;
          var changeName = document.querySelector(".nameadded");
          changeName.innerHTML = `<span>${updatedName}</span>`;
          document.getElementById("name").value = "";
        }
      });
      document.querySelector(".addnum").addEventListener("click", () => {
        var addToSummary = document.querySelector(".summary");
        var number = document.getElementById("phonenumber").value;
        var addNum = document.createElement("div");
        addNum.classList.add("orderdetails");
        if (numadded === false) {
          addNum.innerHTML = `<p>Contact Info</p> <p class="numadded">${number}</p>`;
          addToSummary.prepend(addNum);
          var addNumbutt = document.querySelector(".addnum");
          addNumbutt.style = "background-color:lightgreen";
          addNumbutt.innerText = "Update Number";
          document.getElementById("phonenumber").value = "";
          numadded = true;
        } else {
          var updatedName = document.getElementById("phonenumber").value;
          var changeName = document.querySelector(".numadded");
          changeName.innerHTML = `<span>${updatedName}</span>`;
          document.getElementById("phonenumber").value = "";
        }
      });
    });
  });
});

document.addEventListener("click", someListener);

function someListener(event) {
  var element = event.target;
  if (element.classList.contains("additems")) {
    var addedButt = event.target;
    var parentEl = addedButt.parentElement.parentElement;
    var quantityEl = parentEl.querySelector(".amountofitem");
    var quantity = quantityEl.innerText;
    quantity = Number(quantity);
    var updateQuant = quantity + 1;
    quantityEl.innerHTML = `${updateQuant}`;

    var grandParentElement = parentEl.parentElement;
    var price = grandParentElement.querySelector(".price").innerHTML;
    //  var number = price.replace(".", "");
    price = Number(price);
    //
    // add price to the subtotal of order
    subtotal += price;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    //
    var taxes = subtotal * stateTax;
    //
    if (delivery === true) {
      total += deliveryFee;
    }
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);
  } else if (element.classList.contains("removeitems")) {
    var removedButt = event.target;
    var parentEl = removedButt.parentElement.parentElement;
    var quantityEl = parentEl.querySelector(".amountofitem");
    var quantity = quantityEl.innerText;
    quantity = Number(quantity);
    var updateQuant = quantity - 1;
    quantityEl.innerHTML = `${updateQuant}`;

    var grandParentElement = parentEl.parentElement;
    var price = grandParentElement.querySelector(".price").innerHTML;
    //  var number = price.replace("$", "");
    price = Number(price);
    console.log(price);
    // add price to the subtotal of order
    subtotal -= price;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    //
    var taxes = subtotal * stateTax;
    //
    if (delivery === true) {
      total += deliveryFee;
    }

    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);

    if (updateQuant < 1) {
      var see = removedButt.parentElement.parentElement.parentElement;
      see.remove();
    }
  }
}
document.querySelector('.finalize-order').addEventListener('click',()=>{
    var fOrder = document.querySelector('.placeorder-items');
     var   finalOrders = fOrder.querySelectorAll('.order-list');
    for(var i = 0; i<= finalOrders.length; i++){
        var allorderitem = finalOrders[i].innerText;
        var splititem = allorderitem.split(/\n\n/);
        finalOrder.push(splititem);
        finalOrder[i].pop();
        console.log(finalOrder);
    }
})
*/

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
var i = 0;
var itemsadded = [];
var deliveryFee = 8.0;
var delivery = false;
var delivAdd;
var customerInfo = {};
var addBttns = document.getElementsByClassName("additem");
for (let i = 0; i < addBttns.length; i++) {
  addBttns[i].addEventListener("click", () => {
    // eventlistener for order started
    var orderBegin = document.querySelector(".placeorder-bttn");
    orderBegin.innerHTML = '<button class="orderstarted">MANAGE ORDER</button>';
    document.querySelector(".orderstarted").addEventListener("click", () => {
      document.querySelector(".manage-order").style = "visibility: visible";
    });
    document
      .querySelector(".bi-x-circle-fill")
      .addEventListener("click", () => {
        document.querySelector(".manage-order").style = "display: none";
      });
    document.querySelector(".delivery").addEventListener("click", () => {
      document.querySelector(".selected").classList.remove("selected");
      document.querySelector(".delivery").classList.add("selected");
      if (document.querySelector(".delivery-fee") === null) {
        document.querySelector(".address").style = "visibility: visible";
        var addDeliveryFee = document.createElement("div");
        addDeliveryFee.classList.add("orderdetails");
        addDeliveryFee.classList.add("delivery-fee");
        addDeliveryFee.innerHTML = `<p>Delivery Fee</p><p>${deliveryFee}</p>`;
        total += deliveryFee;
        document.querySelector(".total").innerHTML = total.toFixed(2);
        document.querySelector(".summary").append(addDeliveryFee);
        delivery = true;
        document.querySelector(".pickup").addEventListener("click", () => {
          document.querySelector(".selected").classList.remove("selected");
          document.querySelector(".pickup").classList.add("selected");
          document.querySelector(".address").style = "display: none";
          var deliveryAddEl = document.querySelector(".delivery-address");
          var deliveryFeeEl = document.querySelector(".delivery-fee");
          if (typeof deliveryAddEl != "undefined" && deliveryAddEl != null) {
            document.querySelector(".delivery-address").remove();
            document.getElementById("delivery-address").value = "";
            var addAddbutt = document.querySelector(".addaddress");
            addAddbutt.style = "background-color:lightgray";
            addAddbutt.innerText = "Add Address";
          }
          if (typeof deliveryFeeEl != "undefined" && deliveryFeeEl != null) {
            document.querySelector(".delivery-fee").remove();
            total -= deliveryFee;
            document.querySelector(".total").innerHTML = total.toFixed(2);
            delivery = false;
          }
        });
      }
      //end of delivery added
    });

    var parentEl = addBttns[i].parentElement;
    var menuItem = parentEl.querySelector(".price");
    let price = menuItem.innerHTML;
    price = price.replace("$", "");
    price = Number(price);
    subtotal += price;
    taxes = subtotal * stateTax;
    total = subtotal + taxes;
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);
    var itemTitle = parentEl.querySelector(".title");
    let title = itemTitle.innerHTML;
    var orderItems = {};
    orderItems.title = title;
    orderItems.price = price;
    order.push(orderItems);
    //
    if (itemsadded.includes(i)) {
      let itemEl = document.getElementById(order[orderNum].title);
      itemEl = itemEl.parentElement.querySelector(".amountofitem");
      let quantity = itemEl.innerText;
      quantity = Number(quantity);
      let updateQuant = quantity + 1;
      itemEl.innerHTML = `${updateQuant}`;
    } else {
      let orderLists = document.querySelector(".placeorder-items");
      let placeOrderItem = document.createElement("div");
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

    //end of click eventlistener for each button.
  });
  //end of for loop for each button
}
document.querySelector(".addaddress").addEventListener("click", () => {
  var addToSummary = document.querySelector(".summary");
  var address = document.getElementById("delivery-address").value;
  var addAddress = document.createElement("div");
  addAddress.classList.add("orderdetails");
  addAddress.classList.add("delivery-address");
  var element = document.querySelector(".delivery-address");

  if (typeof element != "undefined" && element != null) {
    // Exists.
    var updatedAdress = document.getElementById("delivery-address").value;
    document.querySelector(".addressadded").innerText = updatedAdress;
    document.getElementById("delivery-address").value = "";
  } else {
    addAddress.innerHTML = `<p>Delivery Address</p> <p class="addressadded">${address}</p>`;
    addToSummary.prepend(addAddress);
    document.getElementById("delivery-address").value = "";
    var addAddbutt = document.querySelector(".addaddress");
    addAddbutt.style = "background-color:lightgreen color:black";
    addAddbutt.innerText = "Update Address";
  }
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
    addNamebutt.style = "background-color:lightgreen color:black";
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
    addNumbutt.style = "background-color:lightgreen color:black";
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
document.querySelector(".finalize-order").addEventListener("click", () => {
//  document.querySelector(".manage-order").style = "display: none";
  customerInfo = {};
  var orderPlaced = [];
  var finalOr = {};
  var numOfOrders = 0;
  var finalOrder = {0: {descr:'food', price:2.99, quantity:2}, 1: {descr:'food', price:2.99, quantity:2}};
  let name = document.querySelector(".nameadded");
  let number = document.querySelector(".numadded");
  let address = document.querySelector(".addressadded");
  var fOrder = document.querySelector(".placeorder-items");
  var finalOrders = fOrder.querySelectorAll(".order-list");
  for (var i = 0; i < finalOrders.length; i++) {
    var allorderitem = finalOrders[i].innerText;
    var splititem = allorderitem.split(/\n\n/);
    let descr = splititem[0];
    let p = splititem[1];
    let quant = splititem[2];
    finalOr[i] = {description: 'somefood', price: 'p', quantity: 'quant'};
    numOfOrders += 1;
   // orderPlaced.push(arr);
  //  orderPlaced[i].pop();
 //   var finalOrder = Object.assign({}, orderPlaced);
  }
  console.log(splititem)
  console.log(finalOrder.descr)
//  console.log(finalOr.i.descr)
  //finalOrder.orders.push(orderPlaced)
  //console.log(Object.assign({}, orderPlaced))
  //console.log(finalOrder[0][0])
  if (name === null) {
    alert("Please add a name to your order to continue");
  } else {
    name = name.innerText;
    customerInfo.name = name;
    document.querySelector('.customer-name').innerHTML = customerInfo.name;
  }
  if (number === null) {
    alert("Please add a number to your order to continue");
  } else {
    number = number.innerText;
    customerInfo.number = number;
    document.querySelector('.customer-number').innerHTML = customerInfo.number;
  }
  if (document.querySelector(".delivery-fee") !== null) {
    if (address === null) {
      alert("Please add an address to your order");
    } else {
      let orderTotal = document.querySelector(".total").innerHTML;
      orderTotal += deliveryFee;
      orderTotal = Number(orderTotal);
      orderTotal = orderTotal.toFixed(2);
      address = address.innerText;
      customerInfo.address = address;
      document.querySelector('.customer-address').innerHTML = customerInfo.address;
      document.querySelector('.deliveryfeeinfo').style = 'display:block';
      document.querySelector('.deliveryinfo').style = 'display:block; margin-left:3%; font-weight: bold';  
      document.querySelector('.order-total').innerHTML = `$${orderTotal}`;
      document.querySelector('.order-placed').style = 'display:block';
      for(let i = 0; i < numOfOrders; i++){
        let item = document.createElement('div');
        item.classList.add('orders');
        let parentEl = document.querySelector('.finalorder-items');
        item.innerHTML = `<p>${finalOr[i].description}</p><p>${finalOr[i].quantity}</p><p>$${finalOr[i].price}</p>`;
        parentEl.append(item);
      }
      let currentDate = new Date().toJSON().slice(0, 10);
      let currentTime = new Date().toJSON().slice(11, 19);
      document.querySelector('.today').innerHTML = currentDate;
      document.querySelector('.time').innerHTML = currentTime;  
      let orderSubTotal = document.querySelector(".subtotal").innerHTML;
      let orderTaxes = document.querySelector(".taxes").innerHTML; 
      document.querySelector('.order-subtotal').innerHTML = `$${orderSubTotal}`;
      document.querySelector('.order-taxes').innerHTML = `$${orderTaxes}`;
      document.querySelector('.order-deliveryfee').innerHTML = `$${deliveryFee}.00`;
    }
  }
  // if for pickup
  if(document.querySelector(".delivery-fee") === null && name !== null && number !== null){
    document.querySelector('.order-placed').style = 'display:block';
    document.querySelector('.deliveryfeeinfo').style = 'display:none';
    document.querySelector('.deliveryinfo').style = 'display:none;';  
  for(let i = 0; i < numOfOrders; i++){
    let item = document.createElement('div');
    item.classList.add('orders');
    let parentEl = document.querySelector('.finalorder-items');
    item.innerHTML = `<p>${finalOr[0].description}</p><p>${finalOr[i].quantity}</p><p>$${finalOr[i].price}</p>`;
    parentEl.append(item);
  }
  let currentDate = new Date().toJSON().slice(0, 10);
  let currentTime = new Date().toJSON().slice(11, 19);
  document.querySelector('.today').innerHTML = currentDate;
  document.querySelector('.time').innerHTML = currentTime;  
  let orderSubTotal = document.querySelector(".subtotal").innerHTML;
  let orderTaxes = document.querySelector(".taxes").innerHTML; 
  let orderTotal = document.querySelector(".total").innerHTML;
  document.querySelector('.order-subtotal').innerHTML = `$${orderSubTotal}`;
  document.querySelector('.order-taxes').innerHTML = `$${orderTaxes}`;
  document.querySelector('.order-deliveryfee').innerHTML = `$${deliveryFee}.00`;
  document.querySelector('.order-total').innerHTML = `$${orderTotal}`;
  }
  //assign each item in finalOrder to api order processor backend
  //assign customerInfo to api order processor backend
});
// when edit order button is clicked
document.querySelector('.edit-order').addEventListener('click',()=>{
  document.querySelector(".manage-order").style = "visibility: visible";
  document.querySelector('.order-placed').style = 'display:none';
  let parentEl = document.querySelector('.finalorder-items');
  parentEl.innerHTML = '';
  document.querySelector('.thankyou').style = "display:none";
})
// when pay button is clicked send order details to API payment processor
document.querySelector('.pay').addEventListener('click',()=>{
  document.querySelector('.thankyou').style = "display:block";
})

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
let order = [];
let orderIndex = 0;
let stateTax = 0.1;
let subtotal = 0;
let total = 0;
let nameadded = false;
let numadded = false;
let addressadded = false;
let amountOfItem = 0;
let orderNum = 0;
let orderItems = {};
let i = 0;
let itemsadded = [];
let deliveryFee = 8.0;
let delivery = false;
let finalOrder = [];
const arrClass = document.querySelectorAll(".additem");
arrClass.forEach((item, i) => {
  //there are 28 items and i(index) in the arrClass
  item.addEventListener("click", (event) => {
    let parentEl = event.target.parentElement;
    let menuItem = parentEl.innerText;
    let orderDetails = menuItem.split(/\n\n/);
    let number = orderDetails[1].replace("$", "");
    orderItems = {};
    let price = Number(number);
    //add data from element to the global order array
    orderItems.title = orderDetails[0];
    orderItems.price = price;
    //orderitems is changing everytime we additem
    order.push(orderItems);
    // add price to the subtotal of order
    subtotal += price;
    //
    let taxes = subtotal * stateTax;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);
    //incrament order number
    if (itemsadded.includes(i)) {
      let itemEl = document.getElementById(order[orderNum].title);
      itemEl = itemEl.parentElement.querySelector(".amountofitem");
      let quantity = itemEl.innerText;
      quantity = Number(quantity);
      let updateQuant = quantity + 1;
      itemEl.innerHTML = `${updateQuant}`;
        console.log(order);
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
    // eventlistener for order started
    let orderBegin = document.querySelector(".placeorder-bttn");
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
        let customerInfo = document.querySelector(".customer-info");
        let addToSummary = document.querySelector(".summary");
        let DelivAdd = document.createElement("div");
        customerInfo.append(DelivAdd);
        DelivAdd.innerHTML =
          '<div>\
            <p>Delivery Address</p>\
            <input id="delivery-address" required placeholder="123 street unit/apt #"type="text"/>\
            <button class="addaddress">Add to order</button>\
            </div>';
        //
        let addDeliveryFee = document.createElement("div");
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
          let deliveryAddEl = document.querySelector(".delivery-address");
          let deliveryFeeEl = document.querySelector(".delivery-fee");
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
          let addToSummary = document.querySelector(".summary");
          let address = document.getElementById("delivery-address").value;
          let addAddress = document.createElement("div");
          addAddress.classList.add("orderdetails");
          addAddress.classList.add("delivery-address");
          let element = document.querySelector(".delivery-address");
          //

          if (typeof element != "undefined" && element != null) {
            // Exists.
            console.log("address exists already");
            let updatedAdress =
              document.getElementById("delivery-address").value;
            document.querySelector(".addressadded").innerText = updatedAdress;
            document.getElementById("delivery-address").value = "";
          } else {
            console.log("address not added");
            addAddress.innerHTML = `<p>Delivery Address</p> <p class="addressadded">${address}</p>`;
            addToSummary.prepend(addAddress);
            document.getElementById("delivery-address").value = "";
            let addAddbutt = document.querySelector(".addaddress");
            addAddbutt.style = "background-color:lightgreen";
            addAddbutt.innerText = "Update Address";
          }
        });
      });
      document.querySelector(".addname").addEventListener("click", () => {
        let addToSummary = document.querySelector(".summary");
        let name = document.getElementById("name").value;
        let addName = document.createElement("div");
        addName.classList.add("orderdetails");
        if (nameadded === false) {
          addName.innerHTML = `<p>Name on Order</p> <p class="nameadded">${name}</p>`;
          addToSummary.prepend(addName);
          let addNamebutt = document.querySelector(".addname");
          addNamebutt.style = "background-color:lightgreen";
          addNamebutt.innerText = "Update Name";
          document.getElementById("name").value = "";
          nameadded = true;
        } else {
          let updatedName = document.getElementById("name").value;
          let changeName = document.querySelector(".nameadded");
          changeName.innerHTML = `<span>${updatedName}</span>`;
          document.getElementById("name").value = "";
        }
      });
      document.querySelector(".addnum").addEventListener("click", () => {
        let addToSummary = document.querySelector(".summary");
        let number = document.getElementById("phonenumber").value;
        let addNum = document.createElement("div");
        addNum.classList.add("orderdetails");
        if (numadded === false) {
          addNum.innerHTML = `<p>Contact Info</p> <p class="numadded">${number}</p>`;
          addToSummary.prepend(addNum);
          let addNumbutt = document.querySelector(".addnum");
          addNumbutt.style = "background-color:lightgreen";
          addNumbutt.innerText = "Update Number";
          document.getElementById("phonenumber").value = "";
          numadded = true;
        } else {
          let updatedName = document.getElementById("phonenumber").value;
          let changeName = document.querySelector(".numadded");
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
    let addedButt = event.target;
    let parentEl = addedButt.parentElement.parentElement;
    let quantityEl = parentEl.querySelector(".amountofitem");
    let quantity = quantityEl.innerText;
    quantity = Number(quantity);
    let updateQuant = quantity + 1;
    quantityEl.innerHTML = `${updateQuant}`;

    let grandParentElement = parentEl.parentElement;
    let price = grandParentElement.querySelector(".price").innerHTML;
    //  let number = price.replace(".", "");
    price = Number(price);
    //
    // add price to the subtotal of order
    subtotal += price;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    //
    let taxes = subtotal * stateTax;
    //
    if (delivery === true) {
      total += deliveryFee;
    }
    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);
  } else if (element.classList.contains("removeitems")) {
    let removedButt = event.target;
    let parentEl = removedButt.parentElement.parentElement;
    let quantityEl = parentEl.querySelector(".amountofitem");
    let quantity = quantityEl.innerText;
    quantity = Number(quantity);
    let updateQuant = quantity - 1;
    quantityEl.innerHTML = `${updateQuant}`;

    let grandParentElement = parentEl.parentElement;
    let price = grandParentElement.querySelector(".price").innerHTML;
    //  let number = price.replace("$", "");
    price = Number(price);
    console.log(price);
    // add price to the subtotal of order
    subtotal -= price;
    //add the statetax to the sub total
    total = subtotal * stateTax;
    //add subtotal of item to total
    total += subtotal;
    //
    let taxes = subtotal * stateTax;
    //
    if (delivery === true) {
      total += deliveryFee;
    }

    document.querySelector(".subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector(".taxes").innerHTML = taxes.toFixed(2);
    document.querySelector(".total").innerHTML = total.toFixed(2);

    if (updateQuant < 1) {
      let see = removedButt.parentElement.parentElement.parentElement;
      see.remove();
    }
  }
}
document.querySelector('.finalize-order').addEventListener('click',()=>{
    let fOrder = document.querySelector('.placeorder-items');
     let   finalOrders = fOrder.querySelectorAll('.order-list');
    for(let i = 0; i<= finalOrders.length; i++){
        let allorderitem = finalOrders[i].innerText;
        let splititem = allorderitem.split(/\n\n/);
        finalOrder.push(splititem);
        finalOrder[i].pop();
        console.log(finalOrder);
    }
})


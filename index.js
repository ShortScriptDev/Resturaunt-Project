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
let orderItems = {};
let orderIndex = 0;
let stateTax = 0.10;
let subtotal = 0;
let total = 0;
let nameadded = false;
let numadded = false;
let addressadded = false;
const arrClass = document.querySelectorAll(".additem");
arrClass.forEach((item, i)=>{
    item.addEventListener("click", (e) => {
        if (e.target.classList.contains("additem")) {
            let parentElement = arrClass[i].parentElement;
            let menuItem = parentElement.innerText;
            let orderItem = menuItem.split(/\n\n/);
            let number = orderItem[1].replace("$", '');
            let price = Number(number);
            orderItems.title = orderItem[0];
            orderItems.price = price;
            order.push(orderItems);
            orderIndex++;
            subtotal += price;
            total = subtotal * stateTax;
            total += subtotal;
            console.log(order);
            console.log(orderItems.title);
        }
        let orderBegin = document.querySelector('.placeorder-bttn');
        orderBegin.innerHTML = '<button class="orderstarted">MANAGE ORDER</button>';
        document.querySelector('.orderstarted').addEventListener('click',()=>{
            let menu = document.querySelector('.menu');
            let manageOrderArea = document.createElement('div');
            manageOrderArea.innerHTML = `<div class="manage-order">\
            <div class="order-header">\
              <i class="bi-x-circle-fill"></i>\
              <h2>Amazon Rainforest Resturaunt</h2>\
            </div>\
              <div class="placeorder-items">\
              <div class="order-list">
                <p>${order[0].title}</p>\
                <p>${order[0].price}</p>
                <div class="order-manage">\
                   <i>I</i>\
                  <div style="display: grid;grid-template-columns: 1fr 1fr;">\
                   <button>-</button>\
                   <button>+</button>\
                  </div>\
                </div>\
                </div>
              </div>\
            <div class="togetorder">\
              <p class="selected pickup">Pickup</p>\
              <p class="delivery">Delivery</p>\
            </div>\
            <div class="customer-info">\
              <div>\
                <p>Name on order</p>\
                <input id="name" placeholder="John Doe" type="text"/>\
                <button class="addname">Add Name</button>\
              </div>\
              <div>\
                <p>Phone Number To Contact You</p>\
                <input id="phonenumber"required placeholder="(###)###-####" type="number"/>\
                <button class="addnum">Add Your Number</button>\
              </div>\
            </div>\
            <p>Total Summary</p>\
            <div class="summary">\
            <div class="orderdetails">
            <p>Sub total</p>\
            <p>${subtotal}</p>\
            </div>\
            <div class="orderdetails">\
             <p>Taxes</p>\
            <p>${subtotal * stateTax}</p>\
            </div>\
            <div class="orderdetails">\
            <p>Total</p>\
            <p>${total}</p>\
            </div>\
            </div>\
            <button>Place Order</button>\
           </div>`
            menu.append(manageOrderArea);
            document.querySelector('.bi-x-circle-fill').addEventListener('click',()=>{
                manageOrderArea.remove();
            })

            arrClass.forEach((item, i)=>{
                item.addEventListener("click", (e) => {
                    let orderLists = document.querySelector('.placeorder-items');
            let placeOrderItem = document.createElement('div');
            placeOrderItem.innerHTML = `
            <div class="order-list">
              <p>${order[0].title}</p>\
              <p>${order[0].price}</p>
              <div class="order-manage">\
                 <i>I</i>\
                <div style="display: grid;grid-template-columns: 1fr 1fr;">\
                 <button>-</button>\
                 <button>+</button>\
                </div>\
              </div>`
              orderLists.append(placeOrderItem)
                console.log(placeOrderItem);
                })
            }) 
            document.querySelector('.delivery').addEventListener('click',()=>{
                document.querySelector('.selected').classList.remove('selected');
                document.querySelector('.delivery').classList.add('selected')
                let customerInfo = document.querySelector('.customer-info');
                let DelivAdd = document.createElement('div');
                customerInfo.append(DelivAdd);
                DelivAdd.innerHTML = '<div>\
                <p>Delivery Address</p>\
                <input id="delivery-address" required placeholder="123 street unit/apt #"type="text"/>\
                <button class="addaddress">Add to order</button>\
                </div>'
                document.querySelector('.pickup').addEventListener('click',()=>{
                    document.querySelector('.selected').classList.remove('selected');
                    document.querySelector('.pickup').classList.add('selected');
                    DelivAdd.remove();
            })
            document.querySelector('.addaddress').addEventListener('click',()=>{
                let addToSummary = document.querySelector('.summary');
                let address = document.getElementById('delivery-address').value;
                let addAddress = document.createElement('div');
                addAddress.classList.add('orderdetails')
                if(addressadded === false){
                    addAddress.innerHTML = `<p>Delivery Address</p> <p class="addressadded">${address}</p>`
                    addToSummary.prepend(addAddress);
                    document.getElementById('delivery-address').value = "";
                    let addAddbutt = document.querySelector('.addaddress');
                    addAddbutt.style = 'background-color:lightgreen';
                    addAddbutt.innerText = "Update Address";
                    addressadded = true;
                }else{
                    let updatedAdress = document.getElementById('delivery-address').value;
                    document.querySelector('.addressadded').innerText = updatedAdress;
                    document.getElementById('delivery-address').value = "";
                }
            })
            })
            document.querySelector('.addname').addEventListener('click',()=>{
                let addToSummary = document.querySelector('.summary');
                let name = document.getElementById('name').value;
                let addName = document.createElement('div');
                addName.classList.add('orderdetails');
                if(nameadded === false){
                    addName.innerHTML = `<p>Name on Order</p> <p class="nameadded">${name}</p>`
                    addToSummary.prepend(addName);
                    let addNamebutt = document.querySelector('.addname');
                    addNamebutt.style = 'background-color:lightgreen';
                    addNamebutt.innerText = "Update Name";
                    document.getElementById('name').value = "";
                    nameadded = true;
                }else{
                    let updatedName = document.getElementById('name').value;
                    let changeName =  document.querySelector('.nameadded');
                    changeName.innerHTML = `<span>${updatedName}</span>`;
                    document.getElementById('name').value = '';
                }

            })
            document.querySelector('.addnum').addEventListener('click',()=>{
                let addToSummary = document.querySelector('.summary');
                let number = document.getElementById('phonenumber').value;
                let addNum = document.createElement('div');
                addNum.classList.add('orderdetails')
                if(numadded ===false){
                    addNum.innerHTML = `<p>Contact Info</p> <p class="numadded">${number}</p>`
                    addToSummary.prepend(addNum);
                    let addNumbutt = document.querySelector('.addnum');
                    addNumbutt.style = 'background-color:lightgreen';
                    addNumbutt.innerText = "Update Number";
                    document.getElementById('phonenumber').value = "";
                    numadded = true;
                }else{
                    let updatedName = document.getElementById('phonenumber').value;
                    let changeName =  document.querySelector('.numadded');
                    changeName.innerHTML = `<span>${updatedName}</span>`;
                    document.getElementById('phonenumber').value = "";
                }
            })
            
        })
      })
})

function totalAmount(){
    order.forEach((orderItem, i)=>{
        let price = orderItems.price;
        console.log(price);
    })
}


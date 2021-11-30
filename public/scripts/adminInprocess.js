$(document).ready(function(){

  console.log("inProcess.js is loaded");

  const adminInProgressOrders = $('#adminInProgressOrders');
  orders = []
  let newElements
  axios.get('/admin/orders/inProgress', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res => {
    orders = res.data
    $("#adminInProgressOrders").empty()
    let newElements = generateOrders(orders)
   adminInProgressOrders.innerHTML = newElements
  }).catch(err => {
    console.log("Error fetching and creating the orders",err)
  })
 
  const generateSingleOrder = (order) => {
    let orderId = order.id;
    let orderUser =order.username; 
    let orderTime = order.order_time;
    let orderUserPhone =order.userphone;

    let SingleOrderElement = $(`
    <div class="card" style="width: 18rem;">
    <h3>Order Number: ${orderId} </h3>
    <p>${orderTime}</p>
    <div class="card-body">
      <div>
        <h5>Order Detail:</h5>
        <div id='#listItems'>${listItems(Object.values(order.items))}</div>
      </div>
      <div>
        <h5>Customer</h5>
        <p>Name: ${orderUser} </p>
        <p>Number: ${orderUserPhone} </p>
      </div>
    </div>
    <form action="/admin/orders/complete" method="POST" id="${orderId}orderComplete">
      <input type="hidden" name="OrderId" value="${orderId}">
      <a onClick="document.getElementById('${orderId}orderComplete').submit()" class="btn btn-dark">Order is ready!</a>
    </form>
  </div>
    `)

    return SingleOrderElement

  }
  const generateOrders = (orders) => {
       //$("#adminOrders").empty()
      for(let order of orders) {
        let singleorder = generateSingleOrder(order)
        $("#adminInProgressOrders").append(singleorder)
      }
  }

  const generateSingleitem = (item) => {
    let itemName = item.item.name
    let itemQty = item.qty
    return `<li class="card-title">${itemName} Qty: ${itemQty}</li>`
  }

  const listItems = (itemsArray) => {
    let itemsDiv = '';
    for(let item of itemsArray) {
        let singleItem = generateSingleitem(item)
        itemsDiv += singleItem;
      }
      return itemsDiv;
  }

})
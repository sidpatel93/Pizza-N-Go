$(document).ready(function(){

  console.log("complete orders.js is loaded");

  const adminInProgressOrders = $('#adminCompletedOrders');
  orders = []
  let newElements
  axios.get('/admin/orders/complete', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res => {
    orders = res.data
    $("#adminCompletedOrders").empty()
    let newElements = generateOrders(orders)
    console.log(orders)
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
    <div class="order-container item completed">
      <div class="order-header">
        <h3>#${orderId} </h3>
        <p>${orderTime}</p>
      </div>

      <div class="order-details">
        <h3>Order</h3>
        <ul>${listItems(Object.values(order.items))}</ul>
      </div>

      <div class="customer-details-completed">
        <h3>Customer</h3>
        <ul>
          <li>
            <p class="customer-label">Name:</p>
            <p>${orderUser}</p>
          </li>
          <li>
            <p class="customer-label">Number:</p>
            <p>${orderUserPhone}</p>
          </li>
        </ul>
      </div>
    </div>
    `)

    return SingleOrderElement

  }
  const generateOrders = (orders) => {
       //$("#adminOrders").empty()
      for(let order of orders) {
        let singleorder = generateSingleOrder(order)
        $("#adminCompletedOrders").append(singleorder)
      }
  }

  const generateSingleitem = (item) => {
    let itemName = item.item.name
    let itemQty = item.qty
    return `
    <li class="item-admin">
      <p>${itemQty} x</p>
      <p>${itemName}</p>
    </li>`
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
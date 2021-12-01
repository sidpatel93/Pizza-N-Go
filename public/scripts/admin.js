
$(document).ready(function(){

  // submit the time time form. this will send sms to customer and update the order status in db  
  // const sendEstimatebutton = $('#sendTimeSMS')
  // sendEstimatebutton.click(()=>{
  //   const estimatedTimeForm = $('.sendTime')
  //   estimatedTimeForm.submit()
  // })


  console.log("admin.js is loaded");

  const adminOrders = $('#adminOrders');
  orders = []
  axios.get('/admin/orders/new', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res => {
    orders = [...res.data]
    $("#adminOrders").empty()
   let newElements = generateOrders(orders)
    //adminOrders.innerHTML = newElements
    adminOrders.append = newElements
  }).catch(err => {
    console.log("Error fetching and creating the orders",err)
  })

  const generateSingleOrder = (order) => {
    let orderId = order.id;
    let orderUser =order.username; 
    let orderTime = moment(order.order_time).format('LLL');
    let orderUserPhone =order.userphone;

    let SingleOrderElement = $(`
    <div class="card" style="width: 18rem;">
    <h3>Order Number: ${orderId} </h3>
    <p>${orderTime}</p>
    <div class="card-body">
      <div>
        <h5>Order Detail:</h5>
        <div clss='listItems'>${listItems(Object.values(order.items))}</div>
      </div>
      <div>
        <h5>Customer</h5>
        <p>Name: ${orderUser} </p>
        <p>Number: ${orderUserPhone} </p>
      </div>
    </div>
    <form action="/admin/orders/estimatedTime" method="POST" id="${orderId}timeEstimate">
      <input type="hidden" name="OrderId" value="${orderId}">
      <input type="text" name="estimatedTime" placeholder="Enter time">
      <a onClick="document.getElementById('${orderId}timeEstimate').submit()" id="sendEstimatedTime" class="btn btn-dark">Send SMS</a>
    </form>
  </div>
    `)

    return SingleOrderElement

  }
  const generateOrders = (orders) => {
       //$("#adminOrders").empty()
      for(let order of orders) {
        let singleorder = generateSingleOrder(order)
        $("#adminOrders").append(singleorder)
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

  let socket = io();
  let adminPath = window.location.pathname

  if(adminPath.includes('admin')) {
    socket.emit('join', 'adminRoom')
  }

  socket.on('userPlacedOrder', (order)=> {
    // console.log("socket is activating in admin", order)
    // console.log("all orders", orders)
    orders.unshift(order);
    adminOrders.empty();
    const createElements = generateOrders(orders)
    adminOrders.append = createElements
  })


})


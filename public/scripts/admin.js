
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
    <div class="order">
      <div class="order-header">
        <h3>#${orderId} </h3>
        <p>${orderTime}</p>
      </div>
      <div class="order-details">
        <h5>Order Detail:</h5>
        <div >${listItems(Object.values(order.items))}</div>
      </div>
      <div class="customer-details">
        <h5>Customer</h5>
        <p>Name: ${orderUser} </p>
        <p>Number: ${orderUserPhone} </p>
      </div>

      
    <div>
      <div>
        
      </div>
      <div>
        
      </div>
    </div>
    <form action="/admin/orders/estimatedTime" method="POST" id="${orderId}timeEstimate">
      <input type="hidden" name="OrderId" value="${orderId}">
      <input type="text" name="estimatedTime" placeholder="Enter time">
      <a onClick="document.getElementById('${orderId}timeEstimate').submit()" id="sendEstimatedTime" class="btn btn-dark">Send SMS</a>
    </form>
  </div>
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



// $(document).ready(function(){
// console.log("admin.js is loaded")
// const adminOrdersPage = $('#adminOrdersDiv')

//   axios.get('/admin/orders', {
//     Headers: {
//       "X-Requested-With": "XMLHttpRequest"
//     }
//   })
//   .then(res => {
//     data = res.data
//     generateAdminOrders = generateAdminOrders(data)
//     // Insert data in the admin/orders page
//     adminOrdersPage.innerHTML = generateElements
//   })

// })


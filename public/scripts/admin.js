
$(document).ready(function(){

  // submit the time time form. this will send sms to customer and update the order status in db  
  // const sendEstimatebutton = $('#sendTimeSMS')
  // sendEstimatebutton.click(()=>{
  //   const estimatedTimeForm = $('.sendTime')
  //   estimatedTimeForm.submit()
  // })


  console.log("admin.js is loaded");

  const adminOrders = $('#adminOrders');
  orders = [];
  axios.get('/admin/orders/new', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res => {
    orders = [...res.data];
    $("#adminOrders").empty();
   let newElements = generateOrders(orders);
    //adminOrders.innerHTML = newElements
    adminOrders.append = newElements;
  }).catch(err => {
    console.log("Error fetching and creating the orders",err);
  });

  const generateSingleOrder = (order) => {
    let orderId = order.id;
    let orderUser =order.username; 
    let orderTime = moment(order.order_time).format('LLL');
    let orderUserPhone =order.userphone;

    let SingleOrderElement = $(`
      <div class="order-container item">
        <aside class="left-order">
          <div class="order-header">
            <h3>#${orderId} </h3>
            <p>${orderTime}</p>
          </div>

          <div class="order-details">
            <h3>Order</h3>
            <ul>${listItems(Object.values(order.items))}</ul>
          </div>

          <div class="customer-details">
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
        
        </aside>

        <div class="sms-container">
          <form action="/admin/orders/estimatedTime" method="POST" id="${orderId}timeEstimate">
            <label for="estimatedTime">Estimated time (minutes)</label>
            <input type="hidden" name="OrderId" value="${orderId}">
            <input type="text" name="estimatedTime" placeholder="Enter time">
            <a onClick="document.getElementById('${orderId}timeEstimate').submit()" id="sendEstimatedTime" class="btn">Send SMS</a>
          </form>
        </div>

      </div>
    `);

    return SingleOrderElement;

  }
  const generateOrders = (orders) => {
       //$("#adminOrders").empty()
      for(let order of orders) {
        let singleorder = generateSingleOrder(order);
        $("#adminOrders").append(singleorder);
      };
  };

  const generateSingleitem = (item) => {
    let itemName = item.item.name;
    let itemQty = item.qty;
    return `
    <li class="item-admin">
      <p>${itemQty} x</p>
      <p>${itemName}</p>
    </li>
    `;
  };

  const listItems = (itemsArray) => {
    let itemsDiv = '';
    for(let item of itemsArray) {
        let singleItem = generateSingleitem(item);
        itemsDiv += singleItem;
      }
      return itemsDiv;
  }

  let socket = io();
  let adminPath = window.location.pathname;

  if(adminPath.includes('admin')) {
    socket.emit('join', 'adminRoom');
  };

  socket.on('userPlacedOrder', (order)=> {
    // console.log("socket is activating in admin", order)
    // console.log("all orders", orders)
    orders.unshift(order);
    adminOrders.empty();
    const createElements = generateOrders(orders);
    adminOrders.append = createElements;
  });


});



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


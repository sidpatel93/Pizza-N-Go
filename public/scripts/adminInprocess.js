$(document).ready(function(){


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
    console.log("This is json data from ajax request")
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
      </div>
      <div>
        <h5>Customer</h5>
        <p>Name: ${orderUser} </p>
        <p>Number: ${orderUserPhone} </p>
      </div>
    </div>
  </div>
    `)

    return SingleOrderElement

  }
  const generateOrders = (orders) => {
      for(let order of orders) {
        let singleorder = generateSingleOrder(order)
        $("#adminInProgressOrders").append(singleorder)
      }
  }










})
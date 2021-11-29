$(document).ready(function(){

  const adminOrders = $('#adminOrders');
  orders = []

  let newElements

  axios.get('/admin/orders/new', {
    header: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then( res => {
    orders = res.data
    console.log(orders)
    newElements = generateOrders(orders)
    adminOrders.innerHTML = newElements
  }). catch(err => {
    console.log("Error fetching and creating the orders",err)
  })
 

  const generateOrders = (orders) => {
      for(order of orders) {
        let 
      }
  }

  



})


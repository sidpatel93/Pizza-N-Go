
// Client facing scripts here
$(document).ready(function(){

  //let cartNumber = 0
  //$('.navbarCart').text(` Cart (${cartNumber})`);
  // Console.log to check if this file if loaded in browser properly
  console.log("app.js is loaded");

  const addInCart = (foodItem) => {
    axios.post('/cart-update', foodItem)
    .then((res) => {
      $('.navbarCart').text(` Cart (${res.data.totalQty})`);
    }).catch((err) => {
      console.log(err);
    });
  }

  //Select all the add to cart buttons -> this will give an array of all the btns
  const addToCartBtn = document.querySelectorAll('.add-to-cart');



  // attach event listener on individual button to add it to cart
  addToCartBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {

      let foodItem = JSON.parse(btn.dataset.fooditem);
      addInCart(foodItem)
    })
  })

  // Once user presses Place Order button
  $('#placeOrder').on("click", function(event) {
    const formButton = $('#submitOrder');
    formButton.submit();
  })

  // Louout user once they press the logout button
  $('#logOut').click((event)=>{
    event.preventDefault();
    const logOutform = $('#logoutForm')
    logOutform.submit();
  })

  // $('#sendEstimatedTime').click((event)=>{
  //   event.preventDefault();
  //   const sendTimeForm = $('#timeEstimate')
  //   sendTimeForm.submit();
  // })

  $('#sendSMS').click(function(event) {
    event.preventDefault();
    console.log("hit")

  })

  // Category expand
  const $categoryHeading = $('.heading-container');
  const $itemsContainer = $('.items-container');


  //  Expand and hide menu items based on category
  $categoryHeading.each(function() {
    $(this).on('click', e => {
      e.preventDefault();
      const $itemContainerPath = $(this).siblings($itemsContainer);

      // Check if the menu items are hidden or not and either shows them or hides them | ** needs refactoring **
      if ($itemContainerPath.hasClass('hide')) {
        $itemContainerPath.removeClass('hide');
        $itemContainerPath.slideDown('fast');
      } else {
        $itemContainerPath.addClass('hide');
        $itemContainerPath.slideUp('fast');
      };
    });
  });


  // Order Update Element
  const createOrderUpdateElement = (data) => {
    let orderUpdateElement = $(`
    <h3>Order Update</h3>
    <div class="card-body">
    <h5>It will take approximately <strong>${data.estimatedTime} mins.</strong> to complete your order.</h5>
    </div>
    `)
    return orderUpdateElement
  }

  // Order Complete Element
  const createOrderCompleteElement = (data) => {
    let orderCompleteElement = $(`
    <h3>Order is ready for pick up</h3>
    <div class="card-body">
    <h5>Your Order# <strong>${data.OrderId}</strong> is ready for pick up!!</h5>
    </div>
    `)
    return orderCompleteElement
  }




  // Users side cocket connection, Once a user goes to /user/orders page make a room for that user
  let socket = io()
  let userOrdersPath = window.location.pathname
  // get the order detail from the userOrders page from hidden input
  let hiddenInputOrder = document.querySelector('#hiddenInputOrder')
  // check if the input contain the value or not, if it does then asssign it or null.
  let hiddenOrder = hiddenInputOrder ? hiddenInputOrder.value : null;
  // Parse the json string in the js Object
  hiddenOrder = JSON.parse(hiddenOrder)
  //console.log(hiddenOrder)
  if(hiddenOrder){
    socket.emit('join', `order_${hiddenOrder.id}`)
  }

  socket.on('orderInProgress', (data)=> {
    // here we will create an element which shows the updated status
    let divToAdd = $('#orderUpdate')
    console.log("order update status", data)
    divToAdd.empty()
    let orderInProgressUpdate = createOrderUpdateElement(data)
    divToAdd.append(orderInProgressUpdate)
    divToAdd.css("visibility","visible")
  })

  socket.on('orderComplete', (data)=> {
    let divToAdd = $('#orderUpdate')
    console.log("order complete status", data)
    divToAdd.empty()
    let orderCompleteUpdate = createOrderCompleteElement(data)
    divToAdd.append(orderCompleteUpdate)
    divToAdd.css("visibility","visible")
  })


});



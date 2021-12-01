
// Client facing scripts here
$(document).ready(function(){


  // Console.log to check if this file if loaded in browser properly
  console.log("app.js is loaded");

  const addInCart = (foodItem) => {
    axios.post('/cart-update', foodItem)
    .then((res) => {
        console.log(res);
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
    <h3>Order Number: ${data.OrderId}</h5>
    <div class="card-body">
    <h5>It will take approximately <strong>${data.estimatedTime} mins.</strong> to complete your order.</h5>
    </div>
    `)
    return orderUpdateElement
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
    console.log('This is client side socket. Data received is: ', data)
    // here we will create an element which shows the updated status
    let divToAdd = $('#orderUpdate')
    divToAdd.empty()
    let orderInProgressUpdate = createOrderUpdateElement(data)
    divToAdd.append(orderInProgressUpdate)
    divToAdd.css("visibility","visible")
  })

});



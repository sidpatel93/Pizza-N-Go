
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


  // let socket = io()
  // let adminPath = window.location.pathname
  // if(adminPath.includes('admin')) {
  //   socket.emit('join', 'adminRoom')
  // }


});



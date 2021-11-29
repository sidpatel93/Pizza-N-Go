

// Client facing scripts here
$(document).ready(function(){

  // Console.log to check if this file if loaded in browser properly
  console.log("app.js is loaded");

  const addInCart = (foodItem) => {
    axios.post('/cart-update', foodItem)
    .then((res) => {
        console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

  //Select all the add to cart buttons -> this will give an array of all the btns
  const addToCartBtn = document.querySelectorAll('.add-to-cart');
  // attach event listener on individual button to add it to cart
  addToCartBtn.forEach((btn)=>{
    btn.addEventListener('click', (event)=>{
      let foodItem = JSON.parse(btn.dataset.fooditem);
      addInCart(foodItem)


    });
  });

  const $category = $('.category');
  const $itemsContainer = $('.items-container');
  
  //  Expand and hide menu items based on category
  $category.each(function() {
    
    // $(this) refers to which category is being clicked
    $(this).on('click', e => {
      e.preventDefault();
      
      // Check if the menu items are hidden or not and either shows them or hides them | ** needs refactoring **
      if ($(this).find($itemsContainer).hasClass('hide')) {
        $(this).find($itemsContainer).removeClass('hide');
        $(this).find($itemsContainer).slideDown('fast');
      } else {
        $(this).find($itemsContainer).addClass('hide');
        $(this).find($itemsContainer).slideUp('fast');
      }

    });
  });

});

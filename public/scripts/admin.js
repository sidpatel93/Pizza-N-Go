
$(document).ready(function(){
console.log("admin.js is loaded")
const adminOrdersPage = $('#adminOrdersDiv')

  axios.get('/admin/orders', {
    Headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
  .then(res => {
    data = res.data
    generateAdminOrders = generateAdminOrders(data)
    // Insert data in the admin/orders page
    adminOrdersPage.innerHTML = generateElements
  })

})
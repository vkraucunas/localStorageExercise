// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  seedLocalStorage();
  addDataFromLocalStorageToDom();
  $('table').on('click', '#increment', function() {
    var button = this;
    var itemName = $(button).attr('data-name');
    var newArray = [];
    // get data from local storage
    var currentStateOfLS = JSON.parse(localStorage.getItem('items'));
    // increment quantity associated w/ specific item
    for (var i = 0; i < currentStateOfLS.length; i++) {
      if (currentStateOfLS[i].name === itemName) {
        currentStateOfLS[i].quantity++;
      }
      newArray.push(currentStateOfLS[i]);
    }
    // set data back to local storage
    localStorage.setItem('items', JSON.stringify(newArray));
    // update the dom
    addDataFromLocalStorageToDom();
  });
});

function seedLocalStorage() {
  var data = [
    {
      name: 'tshirt',
      amount: 20,
      quantity:0
    },
    {
      name: 'pants',
      amount: 200.99,
      quantity:0
    },
    {
      name: 'hat',
      amount: 10.50,
      quantity:0
    }
  ];

  if (!JSON.parse(localStorage.getItem('items'))) {
    localStorage.setItem('items', JSON.stringify(data));
  }
}


function addDataFromLocalStorageToDom() {
  $('#all-items').empty();
  var $allItems = JSON.parse(localStorage.getItem('items'));
  $allItems.forEach(function(obj) {
  $('#all-items').append('<tr><td>'+obj.name+'</td><td>'+obj.amount+'</td><td>'+obj.quantity+'</td><td><button class="btn btn-sm btn-warning" data-name="'+obj.name+'" id="increment">+</button></td></tr>');
  });
}
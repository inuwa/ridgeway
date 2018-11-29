$(document).ready(function () {

  var menu = $('.menu');
  var origOffsetY = menu.offset().top;

  function scroll() {
    if ($(window).scrollTop() >= origOffsetY) {
      $('.menu').addClass('sticky');
      $('.content').addClass('menu-padding');
    } else {
      $('.menu').removeClass('sticky');
      $('.content').removeClass('menu-padding');
    }
  }

  document.onscroll = scroll;

});
// HTML values
var values = {
  'A': ['A', 'A', 'A', 'A', 'A', 'A'],
  'B': ['B', 'B', 'B', 'B', 'B', 'B'],
  'C': ['C', 'C', 'C', 'C', 'C', 'C'],
  'D': ['D', 'D', 'D', 'D', 'D', 'D'],
  'E': ['E', 'E', 'E', 'E', 'E', 'E']
};

// Appends the filtered text homepage using jQuery
function styleAppend(value, filteredValues) {
  var counter = 0;
  var padAccumulator = 1;
  filteredValues.forEach(function (key, i) {
    if (i && i % 3 === 0) {
      counter++;
    }
    if (counter % 3 === 0) {
      if (i % 3 === 0) {
        $('<div class="col-12 col-md-8 no-right-padding">' +
          '<div class="double-height">' + key + '</div>' +
          '</div>' +
          '<div class="col-12 col-md-4 no-left-padding">' +
          '<div id="row-' + counter + '" class ="row">' +
          '</div>' +
          '</div>').appendTo($('#items'));
      } else if (i % 3 === 1) {
        $('<div id="col' + i + '" class="col-12"> <div class="single-height">' + key + '</div></div>').appendTo($('#row-' + counter));
      } else if (i % 3 === 2) {
        $('<div id="col' + i + '" class="col-12"> <div class="single-height">' + key + '</div></div>').appendTo($('#row-' + counter));
      }
    } else if ((counter % 3 === 1)) {
      if (padAccumulator === 3 ) {
        padAccumulator = 1;
      }
      $('<div class="col-12 col-md-4 '+(padAccumulator > 1)? 'no-left-padding': ''+'">' +
        '<div id="row-' + counter + '" class="row">' +
        '<div id="col' + i + '" class="col-12"> <div class="single-height">' + key + '</div></div>' +
        '</div>' +
        '</div>').appendTo($('#items'));
        padAccumulator++;
    } else if ((counter % 3 === 2)) {
      if (i % 3 === 0) {
        $('<div class="col-12 col-md-4 no-right-padding">' +
          '<div id="row-' + counter + '" class="row">' +
          '<div id="col' + i + '" class="col-12"> <div class="single-height">' + key + '</div></div>' +
          '</div>' +
          '</div>').appendTo($('#items'));
      } else if (i % 3 === 1) {
        $('<div id="col' + i + '" class="col-12"> <div class="single-height">' + key + '</div></div>').appendTo($('#row-' + counter));
      } else if (i % 3 === 2) {
        $('<div class="col-12 col-md-8 no-left-padding">' +
          '<div class="double-height">' + key + '</div>' +
          '</div>').appendTo($('#items'));
      }
    }
  });
}

//filter object array on filter value
function filterOn(vals, key) {
  var allowed = [];
  allowed.push(key)
  return Object.keys(vals)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = vals[key];
      return obj;
    }, {});
}

//flatten the object to array values
function flattenObject(values) {
  var valArr = [];
  var flattened = {}
  Object.keys(values).forEach(function(key) {
      if(values[key] && values[key] !== undefined) {
        valArr.push(values[key]);
      }
  });
  // transpose values;
  var transposed = valArr[0].map((col, c) => valArr.map((row, r) => valArr[r][c]));
  flattened.ALL = transposed.flat();
  return flattened;
}

//Filter the text when clicked
function filter(filterType) {
  var filteredValues = [];
  filteredValues = (filterType === 'ALL') ? flattenObject(values) :filterOn(values, filterType);

  // use jQuery to position the items on the screen
  Object.keys(filteredValues).forEach(function (key) {
    filteredValues[key].forEach(function (value, i) {
      $('#items').html('');
      styleAppend(filterType, filteredValues[key]);
    })
  });
}
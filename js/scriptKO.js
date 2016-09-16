// Create a map variable.
var map;
// Array to hold all markers.
var markers = [];
// Window Content variable. (Rewritten for each marker)
var infoWindowContent;

// Locations hardcoded.
var locations = [{
  title: 'Peterson Donuts', 
  address: '903 S Escondido Blvd, Escondido, CA 92025', 
  location: {
    lat: 33.1129093, 
    lng: -117.0791868
  }, 
  tag: ['food']
},
{
  title: "San Diego Zoo Safari Park", 
  address: '15500 San Pasqual Valley Rd, Escondido, CA 92027', 
  location: {
    lat: 33.097446, 
    lng: -116.995712
  }, 
  tag: ['park']
},
{
  title: 'Stone Brewing World Bistro Garden', 
  address: '1999 Citracado Parkway, Escondido, CA 92029', 
  location: {
    lat: 33.1160146, 
    lng: -117.11988759999997
  }, 
  tag: ['food', 'bar']},
{
  title: 'Westfield North County', 
  address: '272 E Via Rancho Pkwy, Escondido, CA 92025', 
  location: {
    lat: 33.071106, 
    lng: -117.065772
  }, 
  tag: ['shopping', 'food']
},
{
  title: 'Kit Carson Park', 
  address: '3333 Bear Valley Pkwy, Escondido, CA 92025', 
  location: {
    lat: 33.077937, 
    lng: -117.062940
  }, 
  tag: ['park', 'hiking']
},
{
  title: 'Felicita County Park', 
  address: '742 Clarence Ln, Escondido, CA 92029', 
  location: {
    lat: 33.082437, 
    lng: -117.083823
  }, 
  tag: ['park']
},
{
  title: 'San Dieguito River Park', 
  address: '18372 Sycamore Creek Rd, Escondido, CA 92025', 
  location: {
    lat: 33.066264, 
    lng: -117.064269
  }, 
  tag: ['park', 'hiking']
},
{
  title: 'Daley Ranch', 
  address: '3024 La Honda Dr, Escondido, CA 92027', 
  location: {
    lat: 33.171287, 
    lng: -117.052990
  }, 
  tag: ['hiking', 'park']
},
{
  title: 'Elfin Forest Recreational Reserve', 
  address: '8833 Harmony Grove Rd, Escondido, CA 92029', 
  location: {
    lat: 33.086375, 
    lng: -117.144590
  }, 
  tag: ['park', 'hiking']
},
{
  title: 'Double Peak Park', 
  address :'900 Double Peak Dr, San Marcos, CA 92078', 
  location: {
    lat: 33.107900, 
    lng: -117.178204
  }, 
  tag: ['park', 'hiking']
},
{
  title: 'Plan 9 Ale House',
  address: '155 E Grand Ave, Escondido, CA 92025',
  location: {
    lat: 33.121862, 
    lng: -117.080124
  }, 
  tag: ['bar', 'food']
},
{
  title: 'Port Brewing Co and The Lost Abbey', 
  address: '155 Mata Way #104, San Marcos, CA 92069',
  location: {
    lat: 33.141490, 
    lng: -117.148924
  }, 
  tag: ['bar']
},
{
  title: 'Off Beat Brewing Company',
  address: '1223 Pacific Oaks Pl, Escondido, CA 92029', 
  location: {
    lat: 33.108560, 
    lng: -117.116764
  }, 
  tag: ['bar']
},
{
  title: 'TJ Tacos Escondido', 
  address: '802 E Valley Pkwy, Escondido, CA 92025',
  location: {
    lat: 33.128518, 
    lng: -117.072438
  }, 
  tag: ['food']
},
{
  title: 'Wingstop', 
  address: '1815 E Valley Pkwy #7, Escondido, CA 92027',
  location: {
    lat: 33.136102, 
    lng: -117.055027
  }, 
  tag: ['food']
},
{
  title: 'Karl Strauss Brewing Company', 
  address: '9675 Scranton Rd, San Diego, CA 92121',
  location: {
    lat: 33.020945, 
    lng: -117.113942
  }, 
  tag: ['bar', 'food']
},
{
  title: 'Smokin Beaver Home Brew Supplies Escondido', 
  address: '146 N Kalmia St, Escondido, CA 92025',
  location: {
    lat: 33.123237, 
    lng: -117.080482
  }, 
  tag: ['bar']
},
{
  title: 'Escondido Village Mall Shopping Center', 
  address: '1253 E Valley Pkwy Escondido, CA 92027',
  location: {
    lat: 33.131085, 
    lng: -117.064083
  }, 
  tag: ['shopping', 'food']
}];

// KNOCKOUT ===================================
var ViewModel = function() {
  var self = this;
  var markerLength = markers.length;
  // Arrays for button layouts
  self.filterLayout = [
    {
      name: 'BARS',
      classB: 'btn btn-primary',
      idB: 'bar'
    },
    {
      name: 'FOOD',
      classB: 'btn btn-danger',
      idB: 'food'
    },
    {
      name: 'PARKS',
      classB: 'btn btn-success',
      idB: 'park'
    },
    {
      name: 'HIKING TRAILS',
      classB: 'btn btn-info',
      idB: 'hiking'
    },
    {
      name: 'SHOPPING',
      classB: 'btn btn-warning',
      idB: 'shopping'
    }
  ];
  self.functionButtons = ["SEARCH", "SHOW ALL", "HIDE ALL"];

  // Aray of visible markers to be displayed.
  self.markersVisible = ko.observableArray();

  /** 
   * Clicking name of location will trigger animation and info window
   * Search markers array for matching name and pass that marker to
   * click function to animate marker and populate info window.
   */
  self.triggerMarker = function(markerName) {
      var index;
      for (var i=0; i<markerLength;i++){
        if (markers[i].title == markerName){
          index = i;
          break;
        }
      }
      initMap.click(markers[index]);
  }

  // Filter markers displayed by filterButton pressed in display
  self.filter = function (event){
      hideAll();
      toggleShow();
      var bounds = new google.maps.LatLngBounds();     
      var filterID = String(this.idB);
    
      // Determine marker picture based on filterID.
      if (filterID == "bar") {
        var image ="img/bar.png";
      }
      if (filterID == "food") {
        var image ="img/food.png";
      }
      if (filterID == "park") {
        var image ="img/park.png";
      }
      if (filterID == "hiking") {
        var image ="img/hiking.png";
      }
      if (filterID == "shopping") {
        var image ="img/shopping.png";
      }
      // Show markers that match filterID.
      for (var i = 0; i < markerLength; i++){
        // filter markers for filterID and show
        if (markers[i].tag.includes(filterID)){
          initMap.markerDrop(markers[i]);
          markers[i].setIcon(image);
          markers[i].setVisible(true);
          self.markersVisible.push(markers[i].title); 
          bounds.extend(markers[i].position);
        } 
      }
      map.fitBounds(bounds);
    }

  // Toggle observables
  self.markersShowing = ko.observable(false);
  self.emptySearch = ko.observable(false);
  self.input = ko.observable("");
  self.input.subscribe(function(search){
    self.search(search);
  })

  // Take value from input and search location names for match to display
  self.search = function(input) {
      var searchInput = input;
      // var searchInput = this.input();
      searchInput = searchInput.toLowerCase();
      var bounds = new google.maps.LatLngBounds();
      // Track number of locations matching for zoom/fit later.
      var count = 0;
      var result = document.getElementById('result');
      // Clear previous search results.
      emptySearch(false);
      // hide all markers
      hideAll();
      
      for (var i = 0; i < markerLength; i++){
        var title = markers[i].title.toLowerCase();
        // filter markers for filterID and show
        if (title.includes(searchInput)) {
          initMap.markerDrop(markers[i]);
          markers[i].setIcon(null);
          markers[i].setVisible(true);
          bounds.extend(markers[i].position); 
          this.markersVisible.push(markers[i].title); 
          count++;
        }     
      }
      // Set zoom and fit to bounds if only 1 location found.
      if (count == 1){ 
        map.fitBounds(bounds);
        map.setZoom(15);
      } else if (count > 1) {
        map.fitBounds(bounds);
      } else {
        emptySearch(true);
      }   
    }

  // Show all markers on map.
  self.showAll = function(){
      markersVisible.removeAll();
      markersShowing(true);
      var bounds = new google.maps.LatLngBounds();
    
      for (var i = 0; i < markerLength; i++) {
        markers[i].setIcon(null);
        markers[i].setVisible(true);
        bounds.extend(markers[i].position);
        this.markersVisible.push(markers[i].title);      
      };
      map.fitBounds(bounds);
    }

  // Hide all markers on map.
  self.hideAll = function(){
    markersShowing(false); 
    markersVisible.removeAll();
    for (var i = 0; i < markerLength; i++) {
      markers[i].setVisible(false);
    };
  }

  // Toggle header for list of locations
  self.toggleShow = function(){
    if(this.markersShowing()){
      markersShowing(false)
    } else { markersShowing(true) }
  }

}
// KNOCKOUT ===================================

// Catch Google Maps API errors.
function err_handler(err) {
  alert(err + ": Google Maps is not responding at this time. Please try again.");
}

// Function to initialize the map within the map div.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 33.1192068, lng: -117.08642099999997},
  zoom: 14,
  });

  // Infowindow for markers.
  var largeInfoWindow = new google.maps.InfoWindow({
    maxWidth: 200
  });
   
  /** 
   * For triggerMarker in KO to animate and populate infoWindow of location
   * clicked
   */
  initMap.click = function(marker){
    toggleBounce(marker);
    yelp_api(marker.title, marker.address, marker, largeInfoWindow);
      
    };

  // Loop through locations and push in markers array with 'click' event listeners.
  for (var i=0; i<locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var tag = locations[i].tag;
    var address = locations[i].address;
    
    var marker = new google.maps.Marker({
    position: position,
    title: title,
    address: address,
    animation: google.maps.Animation.DROP,
    id: i,
    tag: tag,
    icon: null,
    map: map
    });
    markers.push(marker);

    marker.addListener('click', function(marker){
      toggleBounce(this);
      yelp_api(this.title, this.address, this, largeInfoWindow);
      });
  }

  // Toggle bounce on markers.
  function toggleBounce(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 2000);
  }

  // Clear marker animation.
  function clearAnimation(marker){
    marker.setAnimation(null);
  }

  // Set marker animation to DROP.
  initMap.markerDrop = function(marker){
    marker.setAnimation(null);
    marker.setAnimation(google.maps.Animation.DROP);
  }

  // Populate info window with data from Yelp API.
  initMap.populateInfoWindow = function(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent(infoWindowContent);
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        clearAnimation(marker);
      });
    }
  }

  // Activate Knockout
  ko.applyBindings(ViewModel);
  // Show all markers by default on load.
  $("#showALL").trigger('click');
}

// YELP API ============================================

// Generate random string
function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
}

// Call to YELP API
var yelp_api = function(locationTitle, address, marker, infoWindow) {
  var YELP_BASE_URL = "https://api.yelp.com/v2/search?location=escondido&term=" 
  
  var parameters = {
      oauth_consumer_key: 'CONSUMER KEY',
      oauth_token: 'TOKEN',
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb',
      oauthSignate: '',
      location: 'escondido',
      term: locationTitle
  };
  var yelp_url = YELP_BASE_URL + locationTitle;
  var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, 'CONSUMER SECRET', 'TOKEN SECRET');
  parameters.oauth_signature = encodedSignature;
  var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,
      dataType: 'jsonp'
  };

  $.ajax(settings)
  .done(function(results) {
        infoWindowContent = "<div class='contianer text-center'><h4>"+ locationTitle +"</h4>"+ address +"<br><img src="+ results.businesses[0].rating_img_url +"><br>"+
          "<img src='"+ results.businesses[0].image_url +"' alt='Location Image'><br>"+
          "<p>"+ results.businesses[0].snippet_text +"<p>Location review made using <a href='"+
          results.businesses[0].url+"'>YELP</a> API.</p></p></div>";
        initMap.populateInfoWindow(marker, infoWindow);
       })
  .fail(function(error) {
         alert(error + "Yelp is not responding, please try again.");
       })
  }

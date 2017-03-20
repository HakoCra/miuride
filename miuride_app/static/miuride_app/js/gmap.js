var latlng;
var options;
var map;
var markers = [];
var circles = [];
var me;

/* スタイル配列 */
var stylesArray = [
    /* 幾何学要素 */
    {
        featureType:"all",
        elementType:"geometry",
        stylers: [
            {hue: '#ccc'},
            {visibility:"on"},
            {saturation:0},
            {lightness:50}
        ]
    },
    /* ラベル */
    {
        featureType:"all",
        elementType:"labels",
        stylers: [
            {hue: '#ccc'},
            {visibility:"on"},
            {saturation:0},
            {lightness:30}
        ]
    },
    /* 観光スポット */
    {
        featureType:"poi.attraction",
        elementType:"all",
        stylers: [
            {hue: '#ff6699'},
            {saturation:100},
            {lightness:20}
        ]
    }
];

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(setLate, errorLate);
}


function setLate(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var myMaptypeId="skytree";

  //lat = Math.round(lat * 1000) / 1000;
  //lon = Math.round(lon * 1000) / 1000;

  latlng = new google.maps.LatLng(lat, lon);

  options = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
         mapTypeIds: [google.maps.MapTypeId.ROADMAP, myMaptypeId]
      },
      mapTypeId:myMaptypeId,
      disableDefaultUI: true


  };
  map = new google.maps.Map(document.getElementById('map-canvas'), options);

  var styledMapOptions = {
      /* ボタンにマウスオーバーした時のツールチップ */
      alt: "ハイライト表示",
      /* 最大ズームレベル */
      maxZoom: 20,
      /* ボタンに表示する名前 */
      name: "スカイツリー",
  };
  var myMapType = new google.maps.StyledMapType(stylesArray, styledMapOptions);
  map.mapTypes.set(myMaptypeId, myMapType);
}

function setPositionHere()
{
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    me = makeMarker('', {lat: lat, lng: lng}, '');
  });
}

function errorLate(position) {
  latlng = new google.maps.LatLng(35.66, 139.69);
  options = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), options);
}

function makeMarker(title, position, message) {
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position,
    message: message,
  });
}

function makeMyMarker(title, position, message) {
  var image = {
    url :'/static/miuride_app/images/car_marker.png',
    scaledSize : new google.maps.Size(30, 30)
  };
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position,
    message: message,
    icon:image
  });
}

function makeCircle(position) {
  circle = new google.maps.Circle({
    strokeColor: '#1e90ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#1e90ff',
    fillOpacity: 0.35,
    map: map,
    center: {lat: position.lat, lng: position.lng},
    radius: 200
  });
  return circle;
}


function getAndLocatePoints(category) {
  url = '';
  if (category) {
    url = "/api/v1/tourism_point/?category=" + category;
  } else {
    url = "/api/v1/tourism_point/"
  }
  $.ajax({
    url: url
  }).done(function(data) {
    removeMarkers();
    removeCircles();
    for (point in data) {
      if (data.hasOwnProperty(point)) {
        marker = makeMarker('test', {lat: parseFloat(data[point].lat), lng: parseFloat(data[point].lng)}, '');
        marker.description = data[point].description;
        marker.addListener('click', function() {
          addTweet(marker.description);
        });
        markers.push(marker);
        circle = makeCircle({lat: parseFloat(data[point].lat), lng: parseFloat(data[point].lng)});
        circles.push(circle);
      }
    }
  }).fail(function(data) {
    console.log('error');
    console.log(data);
  });
}

document.addEventListener('keydown', function (event) {
  console.log(me);
  if (me && me.setMap !== undefined) {
      var lat = me.position.lat;
      var lng = me.position.lng;
      if (event.key == 'a') {
        me.setMap(null);
        me = makeMyMarker('myMarker', {lat: lat(), lng: lng() - 0.0001}, '');
      } else if (event.key == 'd') {
        me.setMap(null);
        me = makeMyMarker('myMarker', {lat: lat(), lng: lng() + 0.0001}, '');
      }
      if (event.key == 'w') {
        me.setMap(null);
        me = makeMyMarker('myMarker', {lat: lat() + 0.0001, lng: lng()}, '');
      } else if (event.key == 's') {
        me.setMap(null);
        me = makeMyMarker('myMarker', {lat: lat() - 0.0001, lng: lng()}, '');
      }
  } else {
    setPositionHere()
  }
});

function removeMarkers() {
  for(var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function removeCircles() {
  for(var i = 0; i < circles.length; i++) {
    circles[i].setMap(null);
  }
  circles.length = 0;
}

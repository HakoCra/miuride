var latlng;
var options;
var map;

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
      mapTypeId:myMaptypeId

  };
  map = new google.maps.Map(document.getElementById('map-canvas'), options);

  var styledMapOptions = {
      /* ボタンにマウスオーバーした時のツールチップ */
      alt: "ハイライト表示",
      /* 最大ズームレベル */
      maxZoom: 20,
      /* ボタンに表示する名前 */
      name: "スカイツリー"
  };
  var myMapType = new google.maps.StyledMapType(stylesArray, styledMapOptions);
  map.mapTypes.set(myMaptypeId, myMapType);
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

// create the map object:
let myMap =L.map("earthquake",{
    center:[40.833,-2.88],

  
    zoom:2,
    //layers:[streetview,color] // center:[38.833,-2.88],

});
// url of the eartg
let url=   "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// the openstreet map from the leaflet
let streetview= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

}).addTo(myMap);

//Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude
d3.json(url).then(function(data){
    // pass the variable to access the nest object for the geometry.
    feature=data.features
    console.log(data.features)
   // loop inside the feature to get the depth,latitude and longitude of the geometry
// create  the empty variable to hold the depth,longtude and latitude of the coordinates

for (let i=0 ;i<feature.length;i++){
    let coordinate=[];
    let depth=[];
    let magnitude=[];

    geometr=feature[i];
    coordinate.push(geometr.geometry.coordinates[1],geometr.geometry.coordinates[0]);
    depth.push(parseFloat(geometr.geometry.coordinates[2]));
    magnitude.push(parseFloat(geometr.properties.mag));
    //console.log(depth)
    

   // loop through depth to determine the color based on the depth.
 
    for (let c=0;c<depth.length;c++){
    let color;
      
      if (depth[c]<=10 && depth[c] >=-10){
        color="rgb(129, 246, 39)"
      }
      else if(depth[c]<=30&&depth[c]>=10){
        color="rgb(184, 210, 13)"
      }
      else if(depth[c]>=30&&depth[c]<=50){
        color =" rgba(210, 169, 34, 0.87)"
      }
      if (depth[c]>=50&&depth[c]<=70){
        color="rgb(232, 167, 14)"
      }
      if (depth[c]>=70&&depth[c]<=90){
        color="rgb(232, 130, 14)"
      }
     
   
      if (depth[c]>90){
        color="#e71010"
      }
      // create Marker and popups when click the marker
L.circle(coordinate,{
    color:color,
    fillOpacity:.75,
    // Determine the radius based on magnitude.
     radius:magnitude*100000,
   
   

}).bindPopup(`<h1>Magnitude: ${magnitude}</h1><hr><h1>${geometr.properties.title}</h1><hr><h1>${new Date(geometr.properties.time)}</h1><hr><h1>Depth: ${depth}</h1>`).addTo(myMap);

    
  


  }

}
// Add a legend to the map

let legend = L.control({position:"bottomright",
});
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  let labels= [-10, 10, 30, 50, 70, 90];
 let colors =["#81f627","#daf625","#d2a922",
   "#e8a70e","#e8820e","#e71010"
];
  
  for (let i = 0; i < labels.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
    + labels[i] + (labels[i + 1] ? "&ndash;" + labels[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(myMap);




});


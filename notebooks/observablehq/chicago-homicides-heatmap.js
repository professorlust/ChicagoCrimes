// URL: https://beta.observablehq.com/@randomfractals/chicago-homicides-heatmap
// Title: Chicago Homicides Leaflet Map
// Author: Taras Novak (@randomfractals)
// Version: 388
// Runtime version: 1

const m0 = {
  id: "93331662b9af945d@388",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Chicago Homicides Leaflet Map

Just a simple Chicago homicides Leaflet JS map with clustered markers.
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Chicago Homicides Data, 2001-2018

Data Source: [Chicago Data Portal/Public Safety/Crimes 2001 to present](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2)`
)})
    },
    {
      name: "dataUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/2018/chicago-homicides-2001-2018.csv'
)})
    },
    {
      name: "homicides",
      inputs: ["d3","dataUrl"],
      value: (function(d3,dataUrl){return(
d3.csv(dataUrl)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Mapping Chicago Homicides with [LeafletJS](https://leafletjs.com/)`
)})
    },
    {
      name: "map",
      inputs: ["DOM","width","createMap","homicides","markerCluster","L","createGeoData"],
      value: (function*(DOM,width,createMap,homicides,markerCluster,L,createGeoData)
{
  // create map container and leaflet map
  const mapContainer = DOM.element('div', {style: `width:${width}px;height:${width/1.6}px`});
  yield mapContainer;
  const map = createMap(mapContainer);
  
  // create data points for the heatmap layer
  let dataPoints = homicides.map(h => [h.Latitude, h.Longitude, 0.1]); // intensity
  
  // add heatmap layer 
  /*
  let dataHeatLayer = heatLayer(dataPoints, {
    minOpacity: 0.5,
    maxZoom: 18,
    max: 1.0,
    radius: 8,
    blur: 5,
    gradient: null
  }).addTo(map);
  */
  
  // add clustered markers
  let markers = markerCluster({});
  let markersLayer = L.geoJson(createGeoData(homicides), {
    onEachFeature: function (feature, layer) {
      const data = feature.properties;
      const html = `<div class="popup"><h3>${data.block}</h3>` +
            `<p>(${data.location.toLowerCase()})<br />${data.info}<br />${data.date}</p></div>`;
      layer.bindPopup(html);
      layer.bindTooltip(html, {sticky: true});
    }
  });  
  markers.addLayer(markersLayer);
  map.addLayer(markers);  
  // map.fitBounds(markers.getBounds());
}
)
    },
    {
      name: "createMap",
      inputs: ["L"],
      value: (function(L){return(
function createMap(mapContainer) {
  // create Stamen leaflet toner map with attributions
  const map = L.map(mapContainer).setView([41.85, -87.68], 10); // Chicago origins
  const mapTiles = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
  const osmCPLink = '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const mapCPLink = '<a href="http://maps.stamen.com/toner">Stamen Design</a>';
  const tileLayer = L.tileLayer(mapTiles, {
    attribution: `${osmCPLink} | ${mapCPLink}`,
    detectRetina: false,
    maxZoom: 18,
    minZoom: 10,
    noWrap: false,
    subdomains: 'abc'
  }).addTo(map);
  return map;
}
)})
    },
    {
      name: "popUpCss",
      inputs: ["html"],
      value: (function(html){return(
html`<style type="text/css">
  div.popup p { margin: 4px 0; }
</style>`
)})
    },
    {
      inputs: ["createGeoData","homicides"],
      value: (function(createGeoData,homicides){return(
createGeoData(homicides)
)})
    },
    {
      name: "createGeoData",
      value: (function(){return(
function createGeoData(homicides) {
  const geoData = {
    type: 'FeatureCollection',
    crs: {type: 'name', properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}},
    features: []
  };
  homicides.map(h => {
    geoData.features.push({
      type: 'Feature',
      properties: {
        block: h.Block,
        location: h['Location Description'],
        info: h.Description,
        date: h.Date
      },
      geometry: {
        type: 'Point',
        coordinates: [h.Longitude, h.Latitude]
      }
    });
  });
  return geoData;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Leaflet JS, CSS and Plugins Imports`
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      name: "L",
      inputs: ["require"],
      value: (function(require){return(
require('leaflet@1.3.2')
)})
    },
    {
      name: "leafletCSS",
      inputs: ["html","resolve"],
      value: (function(html,resolve){return(
html`<link href='${resolve('leaflet@1.2.0/dist/leaflet.css')}' rel='stylesheet' />`
)})
    },
    {
      name: "heatLayer",
      inputs: ["L","require"],
      value: (function(L,require){return(
L, require('leaflet.heat').catch(() =>  L.heatLayer)
)})
    },
    {
      name: "markerCluster",
      inputs: ["L","require"],
      value: (function(L,require){return(
L, require('leaflet.markercluster@1.1.0').catch(() => L.markerClusterGroup)
)})
    },
    {
      name: "markerClusterCSS",
      inputs: ["html","resolve"],
      value: (function(html,resolve){return(
html`<link href='${resolve('leaflet.markercluster@1.1.0/dist/MarkerCluster.Default.css')}' rel='stylesheet' />`
)})
    }
  ]
};

const notebook = {
  id: "93331662b9af945d@388",
  modules: [m0]
};

export default notebook;

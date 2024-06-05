import React, { useEffect, useRef, useState } from "react";

function MapComponent(props) {
  const [view, setView] = useState();
  var script;
  //   var map;
  let map = useRef(null);
  var waypoints = []; // Array to store waypoints
  var directionManager;
  useEffect(() => {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&branch=experimental&key=AjOAOBd3_zkfcfVOz6VdCY3TxQP3LHhRN54A5zMOwkJEfsN8MAiegtZsNWjc762M";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  window.GetMap = function () {
    map.current = new window.Microsoft.Maps.Map("#myMap", {
      credentials:
        "AjOAOBd3_zkfcfVOz6VdCY3TxQP3LHhRN54A5zMOwkJEfsN8MAiegtZsNWjc762M",
      center: new window.Microsoft.Maps.Location(
        props.latitude,
        props.longitude
      ),
      mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
      zoom: 17,
      showDashboard: false,
    });
    // directionManager = new window.Microsoft.Maps.Directions.DirectionsManager(
    //   map
    // );
    console.log(map);
    window.Microsoft.Maps.Events.addHandler(map.current, "click", highlight);
    function highlight(e) {
      const point = new window.Microsoft.Maps.Point(e.getX(), e.getY());
      const location = e.target.tryPixelToLocation(point);

      const pushpin = new window.Microsoft.Maps.Pushpin(location);
      props.sendDataToParent(location);
      map.current.entities.push(pushpin);
      waypoints.push(location);
      console.log("Waypoints:", waypoints);
      //#region to get country name based on location
      //#region to get country name and code based on location
      //#region to get country name and code based on location
      var geocodeRequest =
        "https://dev.virtualearth.net/REST/v1/Locations/" +
        location.latitude +
        "," +
        location.longitude +
        "?o=json&key=AjOAOBd3_zkfcfVOz6VdCY3TxQP3LHhRN54A5zMOwkJEfsN8MAiegtZsNWjc762M";

      fetch(geocodeRequest)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.resourceSets[0].resources.length > 0) {
            var resource = data.resourceSets[0].resources[0];
            var countryName = resource.address.countryRegion;
            // var countryCode = resource.address.countryRegionIso2 || "Unknown";
            console.log("Country name:", countryName);
            props.sendCountry(countryName);
            // console.log("Country code:", countryCode);
          } else {
            console.log("Country name and code not found.");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      //#endregion

      //#endregion

      //#endregion
    }
  };
  function changeView() {
    map.current.setView({
      mapTypeId: window.Microsoft.Maps.MapTypeId.road,
    });
  }

  return (
    <div>
      MapComponent
      <div id="myMap" style={{ width: 400, height: 400 }}></div>
      <div>
        <button onClick={changeView}> changeView</button>
      </div>
    </div>
  );
}

export default MapComponent;

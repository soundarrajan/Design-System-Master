import { Component, ViewChild, ElementRef } from '@angular/core';
// import typings
/// <reference types="@types/googlemaps" />
export class OverlayHelper {
    // @ViewChild('map') mapElement: ElementRef;
    // map: any;
    // weird syntax, I know, but it works
    constructor() {
    }
    USGSOverlay = class extends google.maps.OverlayView {
        item_:any;
        items_: any;
        image_: any;
        map_: any;
        div_: any;
        locationId_:any;
        itemDivs:any[];


        constructor(item, map) {
            super();
            // Initialize all properties.
            this.item_ = item;
            // this.image_ = image;
            this.map_ = map;

            // Define a property to hold the image's div. We'll
            // actually create this div upon receipt of the onAdd()
            // method so we'll leave it null for now.
            this.div_ = null;
            // Explicitly call setMap on this overlay.
            this.setMap(map);
        }

        createDiv(item){
            const div = document.createElement('div');
            //div.style.background = '#C4C4C4';
            div.style.color='#D4D4D4';
            div.style.borderWidth='1px';
            //div.style.borderStyle='solid';
            //div.style.borderColor='#484848';
            
            // div.style.width = '100px';
            // div.style.height = '30px';
            div.style.position = 'absolute';
            div.style.cursor = 'contextmenu';
            div.style.zIndex='-1px';
            div.style.padding='5px 7px';
            div.style.fontSize='13px';
            div.style.fontWeight='700';
            // var content = 
            // `<div _ngcontent-c3="" class="majorPortDiv" name="item_` + item.Value.LabelName + `id=`+ item.Id + `">
            // <div _ngcontent-c3="" class="truncate-80"> #VesselName# </div>
            // </div>
            // <div _ngcontent-c3="" class="float-left text-center">
            // </div>
            // </div>`;
            // content = content.replace('#VesselName#', this.ports[markerId].LocationName).replace('#HSFOPrice#', '1243');
      
            div.innerHTML = '<div>'+item.Value.LabelName+'</div>';


            div.setAttribute('data',item.Id);

            this.div_ = div;
            
            // Add the element to the "overlayLayer" pane.
            const panes = this.getPanes();
            //panes.overlayImage.appendChild(div);


            return div;
        };

        /**
         * onAdd is called when the map's panes are ready and the overlay has been
         * added to the map.
         */
        onAdd() {

            this.createDiv(this.item_);
        };

        draw() {

            this.drawDiv(this.div_, this.item_.Value.Position);

            
        };
        // The onRemove() method will be called automatically from the API if
        // we ever set the overlay's map property to 'null'.
        onRemove() {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        };



        drawDiv(itemDiv, position:OverlayPosition){
            // We use the south-west and north-east
            // coordinates of the overlay to peg it to the correct position and size.
            // To do this, we need to retrieve the projection from the overlay.
            const overlayProjection = this.getProjection();
            // Retrieve the south-west and north-east coordinates of this overlay
            // in LatLngs and convert them to pixel coordinates.
            // We'll use these coordinates to resize the div.
            // const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
            // const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
            // Resize the image's div to fit the indicated dimensions.
            const mapPoint=overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(position.Latitude,position.Longitude));
            const div = itemDiv;
                
            div.style.left = (mapPoint.x+6) + 'px';
            div.style.top = (mapPoint.y-3) + 'px';
        

    }
    };



    ionViewDidLoad(map:any, ports:any) {

        // let portOverlays:any[]=[];
        var srcImage;
        var overlay;

        // ports.forEach(port => {
        //     bounds = new google.maps.LatLngBounds(
        //         // new google.maps.LatLng(62.281819, -150.287132),
        //         // new google.maps.LatLng(62.400471, -150.005608));

        //         new google.maps.LatLng(port.Latitude, port.Longitude),
        //         new google.maps.LatLng(62.400471, -150.005608));

        //     // The photograph is courtesy of the U.S. Geological Survey.
            srcImage = 'https://developers.google.com/maps/documentation/' +
                'javascript/examples/full/images/talkeetna.png';
                
        //     overlay = new this.USGSOverlay(bounds, srcImage, map);

        //     portOverlays.push(overlay);

        // });
        if(ports!=undefined && ports.length>0)
        overlay = new this.USGSOverlay(ports, map);

        return overlay;
    }

    drawOverlay(map, item:OverlayData){
        var overlay;
        
        if(item!=undefined)
        overlay = new this.USGSOverlay(item, map);

        return overlay;
    }

}

export interface OverlayData{
    Id:any,
    Value:{
        LabelName:any,
        Position:OverlayPosition
    }
}

export interface OverlayPosition{
    Latitude:any,
    Longitude:any
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BackendServices {
    /**
     * Method to get Seca regions from MongoDb
     */
    headersProp = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, );

    getSecaRegions(): any {

        return this.httpC.get("http://localhost:4500/mongodb/secaregions", { headers: this.headersProp });

    }
    /**
         * Method to get Seca regions from searoutes
         */
    getPorts(): any {
        //https://www.searoutes.com/api/v1/proxy/ports-service/ports-in-area?lrlat=90&lrlon=180&ullat=-90&ullon=-180&zoomlevel=2
        // https://www.searoutes.com/api/v1/proxy/ports-service/ports-in-area?lrlat=66.72254132270653&lrlon=214.1015625&ullat=-27.059125784374054&ullon=-120.41015625&zoomlevel=10
        return this.httpC.get("https://www.searoutes.com/api/v1/proxy/ports-service/ports-in-area?lrlat=90&lrlon=180&ullat=-90&ullon=-180&zoomlevel=2"
            , { headers: this.headersProp }
        );

    }
    /**
         * Method to get Seca regions from searoutes
         */
    getSecaRegionsFromSearoutes(): any {
        return this.httpC.get(" https://www.searoutes.com/src/static/seca.json?lrlat=32.10118973232094&lrlon=167.34375&ullat=6.839169626342808&ullon=-167.16796875&zoomlevel=3");
    }
    constructor(private httpC: HttpClient) {

    }
}
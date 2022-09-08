import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';

export interface HttpRequestOptions{
    requestHeaders?:any,
    requestParams?:any
}

export interface HttpClientRequestOptions{
    requestHeaders?:HttpHeaders,
    requestParams?:Params
}

@Injectable()
export class HttpHelperService{

    objToSearchParams(obj): URLSearchParams{
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                params.set(key, obj[key]);
        }
        
        return params;
    }

    formRequestOptions(requestOptions:HttpRequestOptions){
        let options = requestOptions.requestHeaders==undefined?new RequestOptions({params:requestOptions.requestParams}):
        requestOptions.requestParams==undefined?new RequestOptions({headers:requestOptions.requestHeaders}):
        new RequestOptions({ headers: requestOptions.requestHeaders, params: requestOptions.requestParams });
        
        return options;
    }

    formHttpClientParams(requestOptions:HttpRequestOptions){

        let headers:any;
        let params:any;
        
        if(requestOptions.requestHeaders!=undefined){
            headers = new HttpHeaders();

            for (var key in requestOptions.requestHeaders) {
                if (requestOptions.requestHeaders.hasOwnProperty(key))
                    headers.append(key, requestOptions.requestHeaders[key]);
            }
            // headers  = headers.append('header-1', requestOptions.requestHeaders);
            // headers  = headers.append('header-2', 'value-2');
        }
        
        if(requestOptions.requestParams!=undefined){
            params = new HttpParams();

            for (var key in requestOptions.requestParams) {
                if (requestOptions.requestParams.hasOwnProperty(key))
                    params = params.append(key, requestOptions.requestParams[key]);
            }

            // params = params.append('param-1', 'value-1');
            // params = params.append('param-2', 'value-2');
        }

        // if(headers!=undefined)
        // requestOptions.requestHeaders=headers;

        // if(params!=undefined)
        // requestOptions.requestParams=params;


       return <HttpClientRequestOptions>{requestHeaders:headers, requestParams:params};

    }

}

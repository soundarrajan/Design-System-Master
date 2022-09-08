import { voyagedetails } from './voyage'
import { FuelDetails, VesselDataModel, RequestDetail } from '../../shared/models/vessel.data.model';

export const PLDData: Array<VesselDataModel> = [
    {
        ShiptechVesselId: 41,
        VesselIMONO:0,
        VesselName: 'Grue Lily',
        VesselType: "LR1",
        CurrentLocation: {
            LocationId: 3,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 950, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 950, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
       
        StartLocation: {
            LocationId: 1,
            LocationName: "Rotterdam",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 51.9496,
            Longitude: 4.1453,
            Schedule: false,
            Status: "Stemmed"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Stemmed"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Stemmed"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 76, VesselIMONO:0, VesselName: 'Potter Ohio', VesselType: "LR2",
        CurrentLocation: {
            LocationId: 3,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 677, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 950, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 3,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 11.6006,
            Longitude: 43.1165,
            Schedule: false,
            Status: "Created"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Created"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Created"},
        VesselStatus: "LAD",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}], 
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },

    {
        ShiptechVesselId: 23, VesselIMONO:0, VesselName: 'McGreen Emilie', VesselType: "MR",
        CurrentLocation: {
            LocationId: 4,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        }, 
        ROB: {
            HSFO: <FuelDetails>{ Value: 343, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 4,
            LocationName: "Dakar",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 14.6837,
            Longitude: 17.428,
            Schedule: false,
            Status: "Validated"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Validated"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Validated"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 25,VesselIMONO:0,  VesselName: 'Torm Emilie2', VesselType: "MR",
        CurrentLocation: {
            LocationId: 4,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 950, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 2234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1330, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 4,
            LocationName: "Dakar",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 14.6837,
            Longitude: 17.428,
            Schedule: false,
            Status: "Validated"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Validated"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Validated"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },

    {
        ShiptechVesselId: 37,VesselIMONO:0,  VesselName: 'Torm Runner', VesselType: "LR1",
        CurrentLocation: {
            LocationId: 5,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 879, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 456, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 5,
            LocationName: "San Juan",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 18.4435,
            Longitude: -66.0934,
            Schedule: false,
            Status: "Quoted"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Quoted"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Quoted"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 10,VesselIMONO:0,  VesselName: 'Torm GudRun', VesselType: "Handy",
        CurrentLocation: {
            LocationId: 5,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 343, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1111, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        
        
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 280, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 800, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 450, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },StartLocation: {
            LocationId: 5,
            LocationName: "San Juan",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 18.4435,
            Longitude: -66.0934,
            Schedule: false,
            Status: "Enquired"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Enquired"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Enquired"},
        VesselStatus: "LAD",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },

    {
        ShiptechVesselId: 42,VesselIMONO:0,  VesselName: 'Torm Uno', VesselType: "MR",
        CurrentLocation: {
            LocationId: 4,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 1343, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 4,
            LocationName: "Dakar",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 14.6837,
            Longitude: 17.428,
            Schedule: false,
            Status: "Validated"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Validated"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Validated"},
        VesselStatus: "LAD",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 7,VesselIMONO:0,  VesselName: 'Torm Empla', VesselType: "MR",
        CurrentLocation: {
            LocationId: 6,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 1988, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 4,
            LocationName: "Dakar",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 14.6837,
            Longitude: 17.428,
            Schedule: false,
            Status: "Validated"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Validated"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Validated"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },

    {
        ShiptechVesselId: 8, VesselIMONO:0,  VesselName: 'Torm MazeRunner', VesselType: "LR1",
        CurrentLocation: {
            LocationId: 5,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 456, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 5,
            LocationName: "San Juan",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 18.4435,
            Longitude: -66.0934,
            Schedule: false,
            Status: "Quoted"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Quoted"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Quoted"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 21, VesselIMONO:0, VesselName: 'Torm GudRunner', VesselType: "Handy",
        CurrentLocation: {
            LocationId: 4,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 3143, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1111, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        }, StartLocation: {
            LocationId: 5,
            LocationName: "San Juan",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 18.4435,
            Longitude: -66.0934,
            Schedule: false,
            Status: "Enquired"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Enquired"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Enquired"},
        VesselStatus: "LAD",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 61, VesselIMONO:0,  VesselName: 'Torm Little', VesselType: "LR1",
        CurrentLocation: {
            LocationId: 4,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 950, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 750, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 243, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 1,
            LocationName: "Rotterdam",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 51.9496,
            Longitude: 4.1453,
            Schedule: false,
            Status: "Stemmed"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Stemmed"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Stemmed"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    },
    {
        ShiptechVesselId: 6, VesselIMONO:0,  VesselName: 'Torm Oho', VesselType: "LR2",
        CurrentLocation: {
            LocationId: 5,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'),
            Latitude: 6.947411227233091,
            Longitude: 88.29271570312494,
            Schedule: false,
            Status: "Created"
        },
        ROB: {
            HSFO: <FuelDetails>{ Value: 456, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1233, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StandardROB: {
            HSFO: <FuelDetails>{ Value: 1550, ColorCode: "" },
            ULSFO: <FuelDetails>{ Value: 1234, ColorCode: "" },
            DOGO: <FuelDetails>{ Value: 1833, ColorCode: "" },
            Color: "",
            ColorCode: ""
        },
        StartLocation: {
            LocationId: 3,
            LocationName: "Djibouti",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 11.6006,
            Longitude: 43.1165,
            Schedule: false,
            Status: "Created"
        },
        EndLocation: {
            LocationId: 2,
            LocationName: "Singapore Port",
            ETA: new Date('08/20/2018'),
            ETB: new Date('08/22/2018'),
            ETD: new Date('08/22/2018'),
            LatestETA: new Date('08/21/2018'),
            LatestETB: new Date('08/23/2018'),
            LatestETD: new Date('08/24/2018'), Latitude: 1.290270,
            Longitude: 103.851959,
            Schedule: false,
            Status: "Created"
        },
        Request: <RequestDetail>{RequestId:0, RequestName:"", RequestStatus:"Created"},
        VesselStatus: "BAL",
        LastAction: new Date(),
        Comments: [{Comment: "Vessel Left ",UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract.pdf"},{Comment: "Vessel Was At " ,UserName: "darsan.k@inatech.com",CommentDate: new Date().toDateString(),FileName: "Contract2.pdf"},{Comment: "Vessel Arrived",UserName: "praveenkumar.g@inatech.com",CommentDate: new Date().toDateString(),FileName: ""}],
        CommentsCount:0,
        VoyageDetails: voyagedetails
    }


];

export const BunkerStatus = [
    "No Request",
    "Created",
    "Validated",
    "Delivered",
    "Enquired",
    "Quoted",
    "Stemmed"
];

export const VesselTypes
    = ["LR1", "LR2", "MR", "Handy"];

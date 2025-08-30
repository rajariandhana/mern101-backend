import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];
const doc = {
    info:{
        version:"v0.0.1",
        title:"Dokumentasi API ACARA",
        description:"Dokumentasi API ACARA",
    },
    servers:[
        {
            url:"http://localhost:3000/api",
            description:"Local Server",
        },
        {
            url:"https://back-end-acara-eight-pearl.vercel.app/api",
            description:"Deploy Server",
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type:"http",
                scheme:"bearer",
            },
        },
        schemas:{
            LoginRequest:{
                identifier:"rajariandhana",
                password:"12345678",
            },
            RegisterRequest: {
                fullName: "joni joni",
                username:"joni2025",
                email:"joni2025@yopmail.com",
                password:"12345678",
                confirmPassword:"12345678",
            },
            ActivationRequest:{
                code:"abcdef"
            }
        },
        CreateCategoryRequest: {
            name: "",
            banner: "",
            icon: "",
        },
        CreateEventRequest: {
            name: "",
            banner: "fileUrl",
            category: "category ObjectID",
            description: "",
            startDate: "yyyy-mm-dd hh:mm:ss",
            endDate: "yyyy-mm-dd hh:mm:ss",
            location: {
                region: "region id",
                coordinates: [0, 0]
            },
            isOnline: false,
            isFeatured: false
        },
        RemoveMediaRequest: {
            fileUrl: ""
        }
    },
};
swaggerAutogen({openapi:"3.0.0"})(outputFile, endpointsFiles, doc);
import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 8080;

const server = app.listen(port, ()=>{
    console.log(`Server Is Listening On Port : ${port}`);
});

const wss = new WebSocketServer( { server } );
    wss.on("connection",(ws)=>{
    ws.on("message", (data)=>{
        console.log("%s", data);
        ws.send("Thank you for your message. We're unavailable right now, but will respond as soon as possible.");
    });
});


var express = require("express");
var app = express();
const fetch = require('isomorphic-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


// fetch data from network
async function getData (){
    respons = await fetch("https://www.chessgames.com/chessecohelp.html");
    text = await respons.text(); 
    const dom = await new JSDOM(text);
    parseData = dom.window.document.querySelector("tbody").textContent.split("\n");
    data = [];

    for (let index = 0; index < parseData.length; index++) {
        const element = parseData[index];
        
        chessMoveData = [
            element.substring(0,3),
         element.substring(3,element.length),
         parseData[index+1]
        ]
        
        index++;
        data.push(chessMoveData);
        console.log(data);
        
    }
   

    return data;
}

app.get("/",async(req,res)=>{
  data = await getData();

  res.json(data);
})

app.get("/:code",async(req,res) =>{

    data = await getData();

    data.forEach(element => {
        if(element[0] == req.params.code){
            res.json(element);
        }
    });




});

const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
 console.log("Server running on port 5000");
});

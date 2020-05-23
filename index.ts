const express = require('express');
const bodyParser = require('body-parser')

var repl = require("repl");

const commands = [];


let app = express();

app.use(bodyParser.text());

app.post("/addPlugIn/:name", addPlugIn);


async function addPlugIn(req, res) {
    
    try {
        
        const plugin = {
            name: req.params.name,
            code: req.body,
            module: eval(req.body)
        }
        
        commands[req.params.name] = plugin;
        commands[req.params.name].instance = new plugin.module();
        
        res.sendStatus(202);
        
    } catch (error) {
        
        console.log(error);
        res.sendStatus(401);
        
    }
    
}

const PORT = 3434;
app.listen(PORT, function () {
    console.log('Listening to port ...' + PORT + '\n');
});

var local = repl.start("node::local> ");
local.context.commands = commands;

let f = () => commands['SAMLOG'].instance.do(4);

local.context.f = f;
// console.log(setInterval(f, 1000));
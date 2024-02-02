const express= require('express');
const app=express();
const port = 8000;

//Use Express Router

app.use('/', require('./routes'));

//Use View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log(`OOPs!! Error while firing the server: ${err}`);
        return;
    }
    console.log(`Server is fired and running at: ${port}`);
});
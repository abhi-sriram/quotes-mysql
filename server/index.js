const express = require('express');
const cors = require('cors');
const quoteRoute = require('./routes/quotes');
const userRoute = require('./routes/user');
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.get('/',(req,res)=>{
    res.json({msg:'Welcome to quotes db'});
})

app.use('/api/quotes',quoteRoute);
app.use('/user',userRoute);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const menu = [
  { id:1, name:'Classic Burger', price:9.99, description:'Juicy beef patty with lettuce, tomato and cheese.', image:'assets/images/burger.jpg' },
  { id:2, name:'Fries', price:3.49, description:'Golden and crispy french fries.', image:'assets/images/fries.jpg' },
  { id:3, name:'Iced Tea', price:2.49, description:'Refreshing house brewed iced tea.', image:'assets/images/icedtea.jpg' }
];

app.get('/api/menu',(req,res)=>res.json(menu));
app.get('/api/menu/:id',(req,res)=>{
  const item=menu.find(menuItem=>menuItem.id===Number(req.params.id));
  if(!item) return res.status(404).json({message:'Menu item not found'});
  res.json(item);
});

app.post('/api/order',(req,res)=>{
  const filePath=path.join(__dirname,'orders.json');
  let orders=[];
  try {
    if(fs.existsSync(filePath)) {
      const content=fs.readFileSync(filePath,'utf8');
      if(content.trim()) orders=JSON.parse(content);
    }
  } catch(err) {
    console.error('Error reading orders.json:',err);
    return res.status(500).json({message:'Unable to read order storage'});
  }
  const order={ id:Date.now(), ...req.body, createdAt:new Date().toISOString() };
  orders.push(order);
  try { fs.writeFileSync(filePath,JSON.stringify(orders,null,2)); }
  catch(err) { console.error('Error saving order:',err); return res.status(500).json({message:'Unable to save order'}); }
  console.log('Order saved:',order.id);
  res.status(201).json({message:'Order saved successfully!',order});
});

app.listen(PORT,()=>console.log(`QuickBite API running at http://localhost:${PORT}`));

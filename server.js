const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const menu = [
  { id:1, name:'Classic Burger', price:9.99, description:'Juicy beef patty with lettuce, tomato and cheese.', image:'assets/images/burger.svg' },
  { id:2, name:'Fries', price:3.49, description:'Golden and crispy french fries.', image:'assets/images/fries.svg' },
  { id:3, name:'Iced Tea', price:2.49, description:'Refreshing house brewed iced tea.', image:'assets/images/icedtea.svg' }
];

app.get('/api/health',(req,res)=>res.json({status:'ok'}));
app.get('/api/menu',(req,res)=>res.json(menu));
app.get('/api/menu/:id',(req,res)=>{
  const item=menu.find(menuItem=>menuItem.id===Number(req.params.id));
  if(!item) return res.status(404).json({message:'Menu item not found'});
  res.json(item);
});

app.post('/api/order',(req,res)=>{
  const { customer, email, items, total } = req.body || {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validItems = Array.isArray(items) && items.length > 0 && items.every(item =>
    Number.isInteger(item.id) &&
    typeof item.name === 'string' && item.name.trim() &&
    Number.isFinite(item.price) && item.price >= 0 &&
    Number.isInteger(item.quantity) && item.quantity > 0
  );

  if(typeof customer !== 'string' || !customer.trim()) {
    return res.status(400).json({message:'Customer name is required'});
  }
  if(typeof email !== 'string' || !emailPattern.test(email.trim())) {
    return res.status(400).json({message:'A valid email address is required'});
  }
  if(!validItems) {
    return res.status(400).json({message:'At least one valid order item is required'});
  }

  const calculatedTotal = items.reduce((sum,item)=>sum + item.price * item.quantity,0);
  if(!Number.isFinite(total) || Math.abs(total - calculatedTotal) > 0.01) {
    return res.status(400).json({message:'Order total does not match the selected items'});
  }

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
  const order={ id:Date.now(), customer:customer.trim(), email:email.trim().toLowerCase(), items, total:calculatedTotal, createdAt:new Date().toISOString() };
  orders.push(order);
  try { fs.writeFileSync(filePath,JSON.stringify(orders,null,2)); }
  catch(err) { console.error('Error saving order:',err); return res.status(500).json({message:'Unable to save order'}); }
  console.log('Order saved:',order.id);
  res.status(201).json({message:'Order saved successfully!',order});
});

const clientPath = path.join(__dirname,'dist','quickbite-angular18');
if(fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get('*',(req,res)=>res.sendFile(path.join(clientPath,'index.html')));
}

app.listen(PORT,()=>console.log(`QuickBite API running at http://localhost:${PORT}`));

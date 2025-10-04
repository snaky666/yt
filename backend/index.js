// NovaAcademy - simple Express backend (mock)
// Run: npm install && node index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Mock data
const courses = [
  {id:1, title:"مقدمة في التفكير الرياضي", level:"متوسط"},
  {id:2, title:"خوارزميات و برمجة", level:"مبتدئ"},
];

app.get('/api/health', (req,res) => {
  res.json({status:'ok', service:'NovaAcademy backend'});
});

app.get('/api/courses', (req,res) => {
  res.json(courses);
});

app.post('/api/login', (req,res) => {
  const {username, password} = req.body;
  // mock auth - DO NOT USE IN PRODUCTION
  if(username === 'demo' && password === 'demo'){
    return res.json({ok:true, token:'demo-token-123'});
  }
  res.status(401).json({ok:false, message:'Invalid credentials'});
});

app.listen(port, ()=> console.log(`NovaAcademy backend listening on ${port}`));

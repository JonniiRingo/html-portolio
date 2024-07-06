import express from 'express';
import axios from 'axios';
import { spawn } from 'child_process';



const app = express(); 

app.use(express.urlencoded ({extended: true}));

// requests go here
app.post('/api/transformer', (req, res) => {
  const process = spawn('python', ['./transformer/transformer_model.py', req.body.inputText]);

  process.stdout.on('data', (data) =>{
    res.send(data.toString());
  });

  process.stderr.on('data',(data) => {
    console.error('stderr: ${data}'); 
  });

  process.on('closr', (code) => {
    console.log('child process exited with code ${code}');
  });

});



app.listen(3000, () => console.log('Server running on port 3000'));

const getTransformedText = async (inputText) => {
  try {
    const response = await axios.post('http://localhost:3000/api/transformer', { inputText });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Use the function for testing
getTransformedText('your input text').then(transformedText => {
  console.log(transformedText);
});
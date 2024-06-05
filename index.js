const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePDFs } = require('./pdfMerger');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.use('/static', express.static('public'))

app.post('/merge', upload.array('PDFs', 100), async (req, res) => {
  const outputFilePath = path.join(__dirname, 'public', 'merged.pdf');
  await mergePDFs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), outputFilePath);
  res.redirect('http://localhost:3000/static/merged.pdf')
});

app.listen(port, () => {
  console.log(`Visit to see http://localhost:${port}`);
});

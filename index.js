const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePDFs } = require('./pdfMerger');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 2600;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.use('/static', express.static('public'))

app.post('/merge', upload.array('PDFs', 100), async (req, res) => {
  await mergePDFs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect('http://localhost:2600/static/merged.pdf')
});

app.listen(port, () => {
  console.log(`Visit to see http://localhost:${port}`);
});

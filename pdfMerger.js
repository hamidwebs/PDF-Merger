const mergePDFs = async (pdf1, pdf2) => {
  const PDFMerger = (await import('pdf-merger-js')).default;
  const merger = new PDFMerger();

  await merger.add(pdf1);
  await merger.add(pdf2);

  await merger.save('public/merged.pdf'); // save under given name and reset the internal document
};

module.exports = { mergePDFs };
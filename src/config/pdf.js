const PDFDocument = require('pdfkit');

function buildPDFDownload(dataCallback, endCallback) {
    const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.';

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc.fontSize(20).text(`A heading`);

    doc
        .fontSize(12)
        .text(
            `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
        );
    doc.moveDown();
    doc.text(`This text is centered. ${lorem}`, {
        width: 410,
        align: 'center'
    }
    );
    doc.end();
}

module.exports = { buildPDFDownload };
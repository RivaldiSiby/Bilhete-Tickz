const express = require("express");

const Router = express.Router();

const paymentsControllers = require("../controllers/payments");
const { checkToken } = require("../middlewares/auth");
const pdfService = require('../config/pdf');
// const { confirmPayment } = require("../models/payments");

Router.post("/", checkToken, paymentsControllers.postNewTransactions);
Router.patch("/:id", checkToken, paymentsControllers.paymentConfirm);
Router.get("/check", checkToken, paymentsControllers.unpaid);
Router.get("/cancel", checkToken, paymentsControllers.cancelPay);
Router.get("/tickets/:id", checkToken, paymentsControllers.getTransactionTikects);
Router.get("/history", checkToken, paymentsControllers.getHistoryTransaction);
Router.get("/dashboard", checkToken, paymentsControllers.getDashboardOrder);
Router.get('/tickets/download', (req, res, next) => {
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=invoice.pdf`,
    });
    pdfService.buildPDFDownload(
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
});
// Router.get('/tickets/pdf', (req, res, next) => {
//     const stream = res.writeHead(200, {
//         'Content-Type': 'application/pdf',
//         // 'Content-Disposition': `attachment;filename=invoice.pdf`,
//     });
//     pdfService.buildPDF(
//         (chunk) => stream.write(chunk),
//         () => stream.end()
//     );
// });

module.exports = Router;

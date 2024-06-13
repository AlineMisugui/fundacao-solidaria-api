import BaseController from "src/senior/BaseController";
import paymentImplService from "./paymentImpl.service";

class PaymentController extends BaseController {
  createPayment = this.executeAction(async (req, res) => {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).send(payment);
  });

  getPaymentById = this.executeAction(async (req, res) => {
    const payment = await paymentService.getPayment(Number(req.params.id));
    res.status(200).send(payment);
  });

  getAllPaymentsByDonor = this.executeAction(async (req, res) => {
    const payments = await paymentService.getPaymentsByDonor(
      Number(req.params.id)
    );
    res.status(200).send(payments);
  });
}

const paymentService = paymentImplService;
export default new PaymentController();

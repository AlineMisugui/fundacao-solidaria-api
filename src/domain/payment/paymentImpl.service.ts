import { NotFoundException } from "src/exceptions/notFoundException";
import dataSource from "../../../dataSource";
import Donor from "../donor/donor.model";
import { PaymentRequestDTO, PaymentsByUserDTO } from "./payment.dto";
import PaymentMapper from "./payment.mapper";
import Payment from "./payment.model";
import { PaymentService } from "./payment.service";

class PaymentServiceImpl implements PaymentService {
  async createPayment(newPayment: PaymentRequestDTO): Promise<Payment> {
    const payment = PaymentMapper.toEntity(newPayment);
    const paymentCreated = await paymentRepository.save(payment);
    return paymentCreated;
  }

  async getPayment(id: number): Promise<Payment | null> {
    const payment = await paymentRepository.findOneBy({ id });
    if (payment == null) {
      throw new NotFoundException("Payment not found");
    }
    return payment;
  }

  async getPaymentsByDonor(user_id: number): Promise<PaymentsByUserDTO> {
    const donor = await donorRepository.findOneBy({ user_id });
    if (donor == null) {
      throw new NotFoundException("Donor not found");
    }

    const payments = await paymentRepository.findBy({ id_donor: donor.id });
    const total = payments.length;
    const totalValue = payments.reduce(
      (acc, payment) => acc + payment.value,
      0
    );
    return {
      payments,
      total,
      totalValue,
    };
  }
}

const donorRepository = dataSource.getRepository(Donor);
const paymentRepository = dataSource.getRepository(Payment);
export default new PaymentServiceImpl();

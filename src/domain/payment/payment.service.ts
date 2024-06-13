import { PaymentRequestDTO, PaymentsByUserDTO } from "./payment.dto";
import Payment from "./payment.model";

export interface PaymentService {
  createPayment(newPayment: PaymentRequestDTO): Promise<Payment>;
  getPayment(id: number): Promise<Payment | null>;
  getPaymentsByDonor(user_id: number): Promise<PaymentsByUserDTO>;
}

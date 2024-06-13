import { PaymentRequestDTO } from "./payment.dto";
import Payment from "./payment.model";

export default class PaymentMapper {
  public static toEntity(requestDTO: PaymentRequestDTO): Payment {
    const payment = new Payment();
    payment.value = requestDTO.value;
    payment.id_donor = requestDTO.id_donor;
    payment.id_ong = requestDTO.id_ong;
    payment.status = "PAGO";
    return payment;
  }
}

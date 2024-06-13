import Payment from "./payment.model";

export interface PaymentRequestDTO {
  value: number;
  id_donor: number;
  id_ong: number;
}

export interface PaymentsByUserDTO {
  payments: Payment[];
  total: number;
  totalValue: number;
}

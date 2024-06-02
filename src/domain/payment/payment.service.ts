export interface PaymentService {
  generatePixQrCode(pixKey: string): Promise<string>;
  createPayment(): void;
  getPayment(): void;
  updatePayment(): void;
  deletePayment(): void;
  listPaymentsByUser(): void;
}

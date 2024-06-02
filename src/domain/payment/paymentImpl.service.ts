import dataSource from "../../../dataSource";
import { PaymentService } from "./payment.service";
import Ong from "../ong/ong.model";

class PaymentServiceImpl implements PaymentService {
  async generatePixQrCode(pixKey: string): Promise<string> {
    let qrCodeBase64: string = await new Promise((resolve, reject) => {
      QRCode.toDataURL(pixKey, (err: any, code: any) => {
        if (err) {
          reject(err);
        }
        resolve(code);
      });
    });
    return qrCodeBase64;
  }

  createPayment(): void {
    console.log("Creating payment...");
  }

  getPayment(): void {
    console.log("Getting payment...");
  }

  updatePayment(): void {
    console.log("Updating payment...");
  }

  deletePayment(): void {
    console.log("Deleting payment...");
  }

  listPaymentsByUser(): void {
    console.log("Listing payments by user...");
  }
}

const QRCode = require("qrcode");
const ongRepository = dataSource.getRepository(Ong);
export default new PaymentServiceImpl();

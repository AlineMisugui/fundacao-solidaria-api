import jwt from "jsonwebtoken";

interface PayloadUser {
  name: string;
  email: string;
  id: number;
}

class Jwt {
  public static generateToken(payloadUser: PayloadUser): string {
    let payload = {
      name: payloadUser.name,
      email: payloadUser.email,
      id: payloadUser.id,
    };

    let key = "minhaChaveSecreta";
    var token = jwt.sign(
      {
        data: payload,
      },
      key,
      { expiresIn: 60 * 60, algorithm: "HS256" }
    );

    return token;
  }
}

export default Jwt;

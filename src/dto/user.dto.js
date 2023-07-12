import { GetAge } from "../utils/dateDiff.js";
export class userDTO {
  nwUser = (user) => {
    return {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      eMail: user.eMail,
      birthDate: user.birthDate.toLocaleDateString(),
      age: GetAge(user.birthDate, "y"),
      password: user.password || "",
      phone: user.phone || "",

      adress: {
        streetName: user.adress.streetName || "",
        number: user.adress.number || 0,
        floor: user.adress.floor || 0,
        door: user.adress.door || "",
        zipCode: user.adress.zipCode || "",
        country: user.adress.country || "",
        state: user.adress.state || "",
      },

      cartId: user.cartId || "",
      role: user.role || "user",
      documents: user.documents || [],
      last_connection: new Date().toLocaleDateString(),
    };
  };

  tokenUser = (user) => {
    return {
      uId: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      eMail: user.eMail,
      birthDate: user.birthDate,
      cId: user.cartId,
      age: user.age,
      phone: user.phone,
      adress: user.adress,
      role: user.role,
    };
  };
}
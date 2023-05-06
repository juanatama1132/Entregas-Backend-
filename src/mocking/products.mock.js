import { faker } from "@faker-js/faker";

const generateThumbs = () => {
  const items = faker.random.numeric[(1, { bannedDigits: ["0"] })];
  let thumbs = [];
  for (let i = 0; i < items; i++) {
    thumbs.push(faker.image.image(320, 240));
  }
  return thumbs;
};

export function generateMockProducts() {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(6, { casing: "upper" }),
    price: faker.commerce.price(),
    status: faker.datatype.boolean(),
    stock: faker.random.numeric[(2, { bannedDigits: ["0"] })],
    category: faker.commerce.department(),
    thumbnails: generateThumbs(),
  };
}
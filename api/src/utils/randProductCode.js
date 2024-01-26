function randProductCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 7;

  let productCode = "Y1";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    productCode += characters.charAt(randomIndex);
  }

  return productCode;
}

export default randProductCode;

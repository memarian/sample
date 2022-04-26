const bcrypt = require('bcrypt');

exports.getRandomDigit = (base, target) => {
  return (Math.random() * (target - base) + base) << 0;
};

exports.getHash = async (data, round = 10) => {
  let salt = await bcrypt.genSalt(round);
  return await bcrypt.hash(data, salt);
};

exports.generateECode = async function (series, eCode, column, row) {
  const code = '';
  for (let numECode = 1; numECode <= carton; numECode++) {
    code += String(series);
    code += numECode;
    for (let numColumns = 1; numColumns <= pack; numColumns++) {
      code += String(numColumns);
      for (let numRows = 1; numRows <= plastic; numRows++) {
        code += String(numRows);
        code;
      }
    }
  }
};

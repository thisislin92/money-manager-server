const fs = require("fs");
const path = require("path");

const convertTransactionData = (transaction, type) => {
  // if the transaction.date is undefined, then skip it
  if (!transaction.date) {
    return;
  }

  return {
    name: transaction.description,
    amount: transaction.amount,
    type: type,
    transactionDateTime: `${transaction.date} 00:00:00.000 +07:00`,
    CategoryId: 1,
    WalletId: 1,
    UserId: 1,
  };
};

const processJsonFiles = async () => {
  try {
    const outputDirectory = "output";
    const years = fs.readdirSync(outputDirectory);
    let allConvertedTransactions = [];

    for (const year of years) {
      const months = fs.readdirSync(path.join(outputDirectory, year));

      for (const month of months) {
        const files = fs.readdirSync(path.join(outputDirectory, year, month));

        for (const file of files) {
          if (path.extname(file) === ".json") {
            const filePath = path.join(outputDirectory, year, month, file);
            const fileData = fs.readFileSync(filePath);
            const transactions = JSON.parse(fileData);

            const transactionType = file.endsWith("_income.json") ? "income" : "expense";
            const convertedTransactions = transactions.map(transaction => convertTransactionData(transaction, transactionType));
            allConvertedTransactions.push(...convertedTransactions);

            console.log(`Converted transactions for ${file} have been added to the combined array`);
          }
        }
      }
    }

    const outputFilePath = path.join(outputDirectory, "all_converted_transactions.json");
    // remove all "null" values from the array
    allConvertedTransactions = allConvertedTransactions.filter(transaction => transaction);
    
    fs.writeFileSync(outputFilePath, JSON.stringify(allConvertedTransactions));

    console.log(`All converted transactions have been written to ${outputFilePath}`);

  } catch (error) {
    console.error("Error processing JSON files:", error);
  }
};

processJsonFiles();
const _ = require("lodash");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const startProcessFile = async (pdfFile) => {
  const { PdfReader, TableParser } = await import("pdfreader");

  let table = new TableParser();

  return new Promise(async (resolve, reject) => {
    const nbCols = 2;
    const cellPadding = 40;
    const columnQuantitizer = (item) => parseFloat(item.x) >= 20;

    const padColumns = (array, nb) =>
      Array.from({ length: nb }, (val, i) => array[i] || []);
    const mergeCells = (cells) =>
      (cells || [])
        .map((cell) => cell.text)
        .join("")
        .substr(0, cellPadding)
        .padEnd(cellPadding, " ");
    const renderMatrix = (matrix) =>
      (matrix || [])
        .map((row, y) =>
          padColumns(row, nbCols)
            .map(mergeCells)
            .join(" | ")
        )
        .join("\n");

    let finalTable = [];
    let income = [];
    let expense = [];

    let monthCasted = pdfFile.toString();
    // remove the .pdf extension
    monthCasted = monthCasted.substring(0, monthCasted.length - 4);
    let month = monthCasted
      .split("7401407972")
      .join("")
      .split("/");
    let stringMonth = month[month.length - 1];
    let momentMonth = moment(stringMonth, "MMMYYYY").format("[/]MM");
    const year = stringMonth.slice(-4);

    await new Promise((resolve) => {
      new PdfReader().parseFileItems(pdfFile, async function (
        err,
        item
      ) {
        if (err) {
          reject(err);
        }
        if (!item || item.page) {
          const page = renderMatrix(table.getMatrix());
          finalTable.push(page);

          table = new TableParser();
          resolve();
        } else if (item.text) {
          table.processItem(item, columnQuantitizer(item));
        }
      });
    }).catch((e) => {
      reject();
    });

    finalTable = finalTable.join("\n").split("\n");

    finalTable.forEach(async (row, index) => {
      if (row.substring(0, 5).includes(momentMonth) && row.includes("DB")) {
        const mergedTransactionDescription = [row];
        const cleanTransaction = {};

        for (
          let secondIndex = index + 1;
          secondIndex < finalTable.length;
          secondIndex++
        ) {
          if (
            !finalTable[secondIndex].substring(0, 5).includes(momentMonth)
          ) {
            mergedTransactionDescription.push(finalTable[secondIndex]);
          } else {
            break;
          }
        }

        mergedTransactionDescription.forEach((descriptionRow, secondIndex) => {
          // get the year from the pdfFile name (example 7401407972Apr2018.pdf)
          // remove the .pdf extension
          // and get the last 4 characters

          let cleanDate;
          if (secondIndex === 0) {
            cleanDate = moment(
              descriptionRow.substring(0, 5) + "/" + year,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
            cleanTransaction.date = cleanDate || undefined;

            const cleanAmount = Number(
              descriptionRow
                .substring(
                  descriptionRow.length - 1,
                  descriptionRow.indexOf("|")
                )
                .substring(2, descriptionRow.indexOf(".00"))
                .split(".00")[0]
                .split(",")
                .join("")
            );
            cleanTransaction.amount = cleanAmount;
          }
          const cleanText = descriptionRow.substring(
            0,
            descriptionRow.indexOf("|")
          );

          cleanTransaction.description = cleanTransaction.description
            ? cleanTransaction.description + cleanText
            : cleanText;
        });

        cleanTransaction.description = cleanTransaction.description
          .replace(/\s+/g, " ")
          .trim();

        const transactions_in_a_day = expense.filter(
          (e) => e.date === cleanTransaction.date
        ).length;
        cleanTransaction.transaction_id =
          cleanTransaction.date.split("/").join("") +
          (transactions_in_a_day + 1).toString().padStart(2, "0");

        expense.push(cleanTransaction);
      } else if (
        row.substring(0, 5).includes(momentMonth) &&
        // does not include the word "SALDO AWAL"
        !row.includes("SALDO AWAL")
      ) {
        const mergedTransactionDescription = [row];
        const cleanTransaction = {};

        for (
          let secondIndex = index + 1;
          secondIndex < finalTable.length;
          secondIndex++
        ) {
          if (
            !finalTable[secondIndex].substring(0, 5).includes(momentMonth)
          ) {
            mergedTransactionDescription.push(finalTable[secondIndex]);
          } else {
            break;
          }
        }

        mergedTransactionDescription.forEach((descriptionRow, index) => {
          let cleanDate;
          if (index === 0) {
            cleanDate = moment(
              descriptionRow.substring(0, 5) + "/" + year,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
            cleanTransaction.date = cleanDate || undefined;

            const cleanAmount = Number(
              descriptionRow
                .substring(
                  descriptionRow.length - 1,
                  descriptionRow.indexOf("|")
                )
                .substring(2, descriptionRow.indexOf(".00"))
                .split(".00")[0]
                .split(",")
                .join("")
            );
            cleanTransaction.amount = cleanAmount;
          }
          const cleanText = descriptionRow.substring(
            0,
            descriptionRow.indexOf("|")
          );

          cleanTransaction.description = cleanTransaction.description
            ? cleanTransaction.description + cleanText
            : cleanText;
        });

        cleanTransaction.description = cleanTransaction.description
          .replace(/\s+/g, " ")
          .trim();

        const transactions_in_a_day = expense.filter(
          (e) => e.date === cleanTransaction.date
        ).length;
        cleanTransaction.transaction_id =
          cleanTransaction.date.split("/").join("") +
          (transactions_in_a_day + 1).toString().padStart(2, "0");

        income.push(cleanTransaction);
      }
    });

    income = income.filter((i) => !isNaN(i.amount));
    expense = expense.filter((e) => !isNaN(e.amount));

    const income_values = await income.map(
      (i) =>
        `("${i.date}", ${i.amount}, "${i.description}", "${i.transaction_id}", "income", NOW())`
    );
    const expense_values = await expense.map(
      (e) =>
        `("${e.date}", ${e.amount}, "${e.description}", "${e.transaction_id}", "expense", NOW())`
    );
    const complete_values = [...income_values, ...expense_values].join(",");
    // const upsert_query = `INSERT INTO gitlab.money (transaction_date, amount, description, transaction_id, type, created_at) VALUES ${complete_values} ON DUPLICATE KEY UPDATE updated_at = NOW();`;
    // console.log(complete_values);
    
    // write to a json file with the name of the pdf file appended with either income or expense
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month = monthNames.indexOf(stringMonth.slice(0, 3)) + 1;

    fs.mkdirSync(`./output/${year}/${month}`, { recursive: true });

    // remove the "pdf/" from the pdfFile
    pdfFile = pdfFile.split("/")[1];

    // fs.mkdirSync(path.resolve(__dirname, `./${year}/${month}`), { recursive: true });

    fs.writeFileSync(
      path.resolve(__dirname, `./output/${year}/${month}/${pdfFile.split(".")[0]}_income.json`),
      JSON.stringify(income)
    );

    fs.writeFileSync(
      path.resolve(__dirname, `./output/${year}/${month}/${pdfFile.split(".")[0]}_expense.json`),
      JSON.stringify(expense)
    );

    resolve()
    /* fs.unlinkSync(pdfFile); */
  }).catch((error) => {
    return error;
  });
};

// startProcessFile("7401407972Apr2018.pdf")
//   .then(() => {
//     console.log("Processing of 1.pdf is complete.");
//   })
//   .catch((error) => {
//     console.error("Error processing 1.pdf:", error);
//   });

const processPDFFiles = async () => {
  try {
    const pdfDirectory = "pdfs";
    const files = fs.readdirSync(pdfDirectory);

    for (const file of files) {
      if (path.extname(file) === ".pdf") {
        console.log(`Processing ${file}`);
        await startProcessFile(path.join(pdfDirectory, file));
        console.log(`Processing of ${file} is complete.`);
      }
    }
  } catch (error) {
    console.error("Error processing PDF files:", error);
  }
};

processPDFFiles();
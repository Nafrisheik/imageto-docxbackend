const docx = require("docx");
const fs = require("fs");
var path = require("path");
const { Document, ImageRun, Packer, Paragraph } = docx;

const singleFileUpload = async (sampleFile, res) => {
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync(
                  path.join(__dirname, "../" + sampleFile.name)
                ),
                transformation: {
                  width: 500,
                  height: 500,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(date + ".docx", buffer);
    res.sendFile(date + ".docx", {
      root: path.join(__dirname, "../../"),
    });
  });
};

const multiFileUpload = async (sampleFile, res) => {
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");
  const children = sampleFile.map((img) => {
    return new Paragraph({
      children: [
        new Paragraph(""),
        new ImageRun({
          data: fs.readFileSync(path.join(__dirname, "../" + img)),
          transformation: {
            width: 500,
            height: 500,
          },
        }),
      ],
    });
  });
  const doc = new Document({
    sections: [
      {
        children: await children,
      },
    ],
  });
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(date + ".docx", buffer);
    res.sendFile(date + ".docx", {
      root: path.join(__dirname, "../../"),
    });
    console.log("Document created successfully");
  });
};

module.exports = {
  singleFileUpload,
  multiFileUpload,
};

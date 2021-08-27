const docx = require("docx");
const fs = require("fs");
var path = require("path");
// const docx = require("docx");
const { Document, ImageRun, Packer, Paragraph } = docx;

const singleFileUpload = (sampleFile, res) => {
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");
  console.log(path.join(__dirname, "../" + sampleFile.name));
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
        //   new Paragraph(sampleFile.name),
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

const multiFileUpload = (sampleFile, res) => {
  let date = new Date().toString().split(" ").join("").split("+");
  date = date[0].toString().split(":").join("");
  console.log(sampleFile);
  const children = sampleFile.map((img) => {
      console.log(path.join(__dirname, "../" + img))
    return new Paragraph({
      children: [
        new Paragraph(path.join(__dirname, "../" + img)),
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
                          
  //   console.log(children);
  const doc = new Document({
    sections: [
      {
        children: children,
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

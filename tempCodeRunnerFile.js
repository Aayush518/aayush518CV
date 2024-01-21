const data = yaml.parse(fs.readFileSync("./aayush-adhikari-cv.yml", "utf-8"))
  fs.writeFileSync("./aayush-adhikari-cv.json", JSON.stringify(data, null, 2));
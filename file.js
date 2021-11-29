const fs = require("fs");

fs.readFile("./welcome.txt", "utf-8" , (err , data) =>{
  console.log(data);
})
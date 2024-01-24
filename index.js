
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors({
  origin: "*",
}));
app.use(express.json());

const db = mysql.createConnection({
  user: "ujegijtwfyo35zgj",
  host: "bxfszedbpjpjhcz7vlpv-mysql.services.clever-cloud.com",
  password: "HrObmMiVQCChRNWkUwwz",
  database: "bxfszedbpjpjhcz7vlpv",
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/disponible", (req, res) => {
    const day = req.body.selectedDay;
    const month = req.body.selectedMonth;
    const year = req.body.selectedYear;
    const selectedDate = `${year}-${month}-${day}`;
  
    db.query(
      "SELECT d.heure FROM disponibilites d JOIN dates dt ON d.id_date = dt.id_date WHERE dt.date = ? AND d.disponibilite = 1",
      [selectedDate],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  
  
  app.post("/actualiserdispo", (req, res) => {
    const day = req.body.selectedDay;
    const month = req.body.selectedMonth;
    const year = req.body.selectedYear;
    const selectedDate = `${year}-${month}-${day}`;
    const hours = req.body.heuredispo;
    
   
    db.query(
        "UPDATE disponibilites SET disponibilite='0' WHERE id_date IN (SELECT id_date FROM dates WHERE date = ?) AND heure IN (?)",
        [selectedDate, hours],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    });


app.get("/dates", (req, res) => {
    db.query("SELECT * FROM disponibilites", (err, result) => {
     if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  }); 


app.listen(3002||process.env.PORT, () => {
  console.log("Yes  ,   your server is running on port 3002");
});

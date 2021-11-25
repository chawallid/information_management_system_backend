const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

var pool = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "information_db"
});


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 3005;

let clients = [];
let facts = [];

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})

function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(facts)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }
  

  function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }

  function getAllCourse(request, respsonse) {
      pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * from info_course', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                respsonse.send({status:"true",data: rows})
            } else {
                console.log(err)
            }
            console.log('The data from into_course table are: \n', rows)
        })
    })
  }

  function getAllTeacher(request, respsonse) {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * from info_teachers', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                respsonse.send({status:"true",data: rows})
            } else {
                console.log(err)
            }
            console.log('The data from info_teachers table are: \n', rows)
        })
    })
}

    function getAllInfomation(request, respsonse) {
        pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('SELECT * from teaching_infomation', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    respsonse.send({status:"true", data: rows})
                } else {
                    console.log(err)
                }
                console.log('The data from teaching_infomation table are: \n', rows)
            })
        })
    }

  
  async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
  }
  

  //api 
  app.post('/fact', addFact);
  app.get('/', eventsHandler);

  app.get('/AllCourse', getAllCourse);
  app.get('/AllTeacher', getAllTeacher);
  app.get('/AllInfomation',getAllInfomation)



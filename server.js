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

  // const hasDuplicate = (arrayObj, colName) => {
  //   var hash = Object.create(null);
  //   return arrayObj.some((arr) => {
  //      return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
  //   });
  // };

  async function updateAllInfomation(request, respsonse, next){  
    pool.getConnection((err, connection) => {
      if(err) throw err
      var target =  String(request.params.id)
      var obj = []
      const newData = request.body;
      console.log("updateAllInfomation",newData)
      connection.query("SELECT instructor FROM teaching_infomation WHERE teaching_infomation.id =  " + String(target[1]), (err, rows, fields) => {
        if (!err) {
          // console.log("check",rows[0]["instructor"])
          obj = rows[0]["instructor"]
          let list_name = obj.map(r => r.name);
          console.log(list_name); // check ids
          if(!list_name.includes(newData.name)){
            obj.push(newData)
            let update = JSON.stringify(obj);
            console.log(update)
            connection.query("UPDATE `teaching_infomation` SET `instructor` = '"+ String(update)+"' WHERE `teaching_infomation`.`id` = "+ String(target[1]), (err, rows, fields) => {
              connection.release() // return the connection to pool
              if (!err) {
                respsonse.send({status:"true", data: "success"})
              }
            })
          }else{
            respsonse.send({status:"false", data: "failer"})
          }

         
        }
      })
    })
  }

  function updateDateInfomation(request, respsonse, next){  
    pool.getConnection((err, connection) => {
      if(err) throw err
      var target =  String(request.params.id)
      const newData = request.body;
      console.log("ggg" ,target )
      let send = "UPDATE `teaching_infomation` SET `date` = '"+newData.date+"' WHERE `teaching_infomation`.`id` = "+ String(target[1])
      console.log(send)

      connection.query(send, (err, rows, fields) => {
        connection.release() // return the connection to pool
        if (!err) {
          respsonse.send({status:true, data: "success"})
        }else{
          respsonse.send({status:false, data: "failer"})
        }
      })
    })
  }

  async function addCourse(request, respsonse, next){  
    const newData = request.body;
    const send = "INSERT INTO `info_course` (`id`,`id_course`, `course_name`, `section`, `credits`, `volume`, `teahcher`, `department`, `course_name_en`) VALUES (NULL,'"+newData.id_course+"', '"+ newData.course_name+ "',  '"+ newData.section+ "',  '"+ newData.credits+ "',  '"+newData.volume + "',  '"+ newData.teahcher+ "', '"+newData.department + "','"+ newData.course_name_en + "')"
    console.log("addCourse",send)
    pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query( send , (err, rows, fields) => {
        connection.release() // return the connection to pool
        if (!err) {
          respsonse.send({status:true, data: "success"})
        }else{
          respsonse.send({status:false, data: "failer"})
        }
      })

    })

  }
  async function delTeacher(request, respsonse, next){
    var target =  String(request.params.id)
    const send = "DELETE FROM `info_teachers` WHERE `info_teachers`.`id_teacher` = "+target[1]
    console.log("delTeacher",send)
    pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query( send , (err, rows, fields) => {
        connection.release() // return the connection to pool
        if (!err) {
          respsonse.send({status:true, data: "success"})
        }else{
          respsonse.send({status:false, data: "failer"})
        }
      })

    })
  }

  async function delCourse(request, respsonse, next){
    var target =  String(request.params.id)
    const send = "DELETE FROM `info_course` WHERE `info_course`.`id` = "+target[1]
    console.log("delCourse",send)
    pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query( send , (err, rows, fields) => {
        connection.release() // return the connection to pool
        if (!err) {
          respsonse.send({status:true, data: "success"})
        }else{
          respsonse.send({status:false, data: "failer"})
        }
      })

    })
  }

  // DELETE FROM `info_teachers` WHERE `info_teachers`.`id_teacher` = 4"

  async function addTeacher(request, respsonse, next){  
    const newData = request.body;
    const send = "INSERT INTO `info_teachers` (`id_teacher`, `designation_name`, `first_name`, `middle_name`, `last_name`, `department_name`, `first_name_en`, `middle_name_en`, `last_name_en`) VALUES (NULL, '"+ newData.designation_name+ "',  '"+ newData.first_name+ "',  '"+ newData.middle_name+ "',  '"+newData.last_name + "',  '"+ newData.department_name+ "', '"+newData.first_name_en + "','"+ newData.middle_name_en + "','"+ newData.last_name_en + "')"
    console.log("addTeacher",send)
    pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query( send , (err, rows, fields) => {
        connection.release() // return the connection to pool
        if (!err) {
          respsonse.send({status:true, data: "success"})
        }else{
          respsonse.send({status:false, data: "failer"})
        }
      })

    })

  }
  
  

  //api 
  app.post('/fact', addFact);
  app.get('/', eventsHandler);

  app.post('/createCourse', addCourse);
  app.post('/createTeacher', addTeacher);



  app.get('/AllCourse', getAllCourse);
  app.get('/AllTeacher', getAllTeacher);

  app.get('/AllInfomation',getAllInfomation)
  // app.post('/CreateInfomation', postAllInfomation)
  // app.put('/updateInfomationtest:id', updateAllInfomation)
  app.put('/updateInfomationDate:id', updateDateInfomation)



  app.del('/delTeacher:id', delTeacher);
  app.del('/delCourse:id', delCourse);






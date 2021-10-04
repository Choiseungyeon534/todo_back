const express = require('express')
const app = express()


const mysql = require('mysql');
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'rtsp_db',
    port: '3306'
});

app.post('/api/filter', function(req,res){
    if (req.body.status == "all") {
        connection.query(`select * from todo_table;`, (err,result) => {
            if(err) throw err;
            res.send(result)
        })
    } else {
        let clear = req.body.status === 'completed' ? false : true; 
        connection.query(`select * from todo_table where clear="${clear}"`,(err,result) => {
            if(err) throw err;
           res.send(result)
        })
    }
    
})
app.post('/api/deleteButtonClick', function(req,res){
    let id = req.body.id

    connection.query(`delete from todo_table where id = ${id} `,(err,result) => {
        if(err) throw err;
        res.send({
            status:"성공"
        })
    })
})

app.post('/api/completeButtonClick', function(req, res){
    let clear = req.body.clear
    let id = req.body.id

    connection.query(`update todo_table set clear = '${clear}' where id = '${id}'; `,(err,result) => {
        if(err) throw err;
        res.send({
            status:"성공"
        })
    })
})
app.get('/api/info', function(req, res){
    connection.query(`select * from todo_table;`,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.post('/api/todoInsert', function (req,res) {
    let today = req.body.today
    let clear = req.body.clear
    connection.query(`insert into todo_table( today, clear ) values ( '${today}', '${clear}');`,(err,result) => {
        if(err) throw err;
        res.send({
            status:"성공"
        })
    })
             
})







// app.get('/api', function (req, res) {
//   connection.query('SELECT * from rtspurl', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//     res.send(rows)
//   });  
// })

// app.post('/api/todo', function (req, res) {
//     console.log(req.body.todolist)
//     res.send({
//         state: "good"
//     })
//     // `insert into todayDo_table (today_doit) values ${req.body.todayDo};`
// })
  
// app.get('/api/practice', function (req, res) {
//     res.send({
//         id:"tmddus",
//         pass:"1234"
//     })
// })

// app.post('/api/practice2', function (req, res) { 
//     res.send({
//         status:200
//     })
// })

// app.post('/api/insertIdWithName', function (req, res) {
//     let id = req.body.id
//     let name = req.body.name
    
//     connection.query(`INSERT INTO rtspurl (id, name ) values (${id}, '${name}');`,(err,result) => {
//         if(err) throw err;
        

//         res.send({
//             status:"성공"
//         })
//     })

// })

 
app.listen(4000)
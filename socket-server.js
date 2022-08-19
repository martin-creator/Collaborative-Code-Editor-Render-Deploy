'use strict';

var socketIO = require('socket.io');
var ot = require('ot');
//var codemirror = require('codemirror');
var roomList = {};
var cors = require('cors');



module.exports = function(server){
    var str = 'This is a Markdown heading\n\n' + 
              'var i = i + 1';
         
    var io = socketIO(server);
    //io.origins('*');
   

    io.on('connection', function(socket){

        socket.on('joinRoom', function(data){
            console.log("This is the value of data:" + data);

            if(!roomList[data.room]){
                console.log("I am here martin")
                console.log(data.room)
                var socketIOServer =  new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb){
                    cb(true);
                });
                roomList[data.room] = socketIOServer; 
            };


            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);

            console.log("This is the value of roomList" + roomList);

            socket.room = data.room;
            socket.join(data.room)
        })

        socket.on('chatMessage', function(data){
            io.to(socket.room).emit('chatMessage', data);
            //io.emit('chatMessage', data);
        } );

        socket.on('disconnect', function(){
            socket.leave(socket.room);
        });
    })
}
#!/usr/bin/env node

const ssh2 = require('ssh2');
const fs = require('fs');
const path = require('path');

const LISTEN_PORT = 22122;
const LISTEN_HOST = "0.0.0.0"; // any available IPv4 interface

const USER_CREDENTIAL_LIST = [
  ["PreTTY", "PreTTY"]
];

const hostKeys = [
  {key: fs.readFileSync(path.join(__dirname, 'id_rsa')), passphrase: 'PuTTY' }
];
const server = new ssh2.Server({hostKeys});

server.on('connection', (client, info) => {
  console.log(info);

  // authentication
  client.on('authentication', (authCtx) => {
    if (authCtx.method === 'password') {
      console.log(authCtx.username, authCtx.password);
      if (USER_CREDENTIAL_LIST.find(i => i[0] === authCtx.username && i[1] === authCtx.password)) {
        authCtx.accept();
        return;
      }
    } else if (authCtx.method === 'publickey') {

    }
    authCtx.reject();
  });

  // ready to provide service 
  client.on('ready', () => {
    console.log("authentication successfully finished")
    client.on('session', (accept, reject) => {
      accept()
        .on('exec', (acc, rej, inf) => {
          console.log(info, inf);
          const stream = acc();
          stream.write(`this server does not support ${inf.command}`);
          stream.exit(1);
          stream.close();
        })
        .on('pty', (acc, rej, inf) => {
          console.log(info, inf);
          acc();
        })
        .on('shell', (acc, rej) => {
          const stream = acc();
          stream.write("Hello from SSH server!\r\n");
          stream.write("This server provides no actual capability other echo character back to you!\r\n");
          
          stream.on('data', (msg) => {            
            stream.write('\u001b[1;' + (30 + Math.floor(8 * Math.random()))+ 'm'); // random foreground
            // stream.write('\u001b[1;' + (100 + Math.floor(8 * Math.random()))+ 'm'); // random background
            stream.write(msg.toString().replace(/[\u0008\u007f]/g, "\u0008 \u0008").replace(/\r/g, "\r\n"));
            stream.write('\u001b[0m');
          });

          stream.on("close", () => {
            console.log("Connection closed");
          })
        })
        // SFTP server for testing
        .on('sftp', (acc, rej) => {
          // Refer to library index page https://github.com/mscdex/ssh2-streams/blob/master/SFTPStream.md
          const stream = acc();
          const STATUS_CODE = ssh2.SFTP_STATUS_CODE;
          const log = (id, event, message) => console.log(`[${id}]${event}: ${message}`);
          const handleList = {};
          stream.on('OPEN', (requestId, filename, flags, attrs) => {
            log(requestId, 'OPEN', filename + flags + attrs);
            debugger;
          }).on('READDIR', (requestId, handle) => {
            debugger;
            log(requestId, 'READDIR', handle.toString());
            if(handleList[handle.toString()]) {
              stream.name(requestId, [{filename: 'hello*', longname: 'hello 1212 12vad', attrs:{}}]);
              delete handleList[handle.toString()];
            } else {
              // the end of last file
              stream.status(requestId, STATUS_CODE.EOF);
            }
          }).on('OPENDIR', (requestId, path) => {
            debugger;
            log(requestId, 'OPENDIR', path);
            const handle = "OPEN-DIR:" + path;
            handleList[handle] = {}
            stream.handle(requestId, Buffer.from(handle));
          }).on('SETSTAT', (requestId, path, attrs) => {
            debugger;
            log(requestId, 'SETSTAT', path + attrs);
            stream.status(requestId, STATUS_CODE.OK, "set path successfully");
          }).on('REALPATH', (requestId, path) => {
            // translate relative path to canonical path
            // sftp client may use '.' to initialize a connection session and translate it to realpath before other action
            debugger;
            log(requestId, 'REALPATH', path);
            stream.name(requestId, [{filename: 'initial-path', longname: 'initial path', attrs: {}}])
          }).on('CLOSE', (requestId, handle) => {
            stream.status(requestId, STATUS_CODE.OK, "close ok");
          })
        })
    });
  });

  client.on('close', (err) => {
    if (err) console.error(err);
    console.log('connection to '+ info.ip +' closed');
  })
});

// log error and quit
server.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

// final listen port to wait connection from client
server.listen({
  host: LISTEN_HOST,
  port: LISTEN_PORT,
}, () => {
  console.log("Listen on port " + LISTEN_PORT);
})

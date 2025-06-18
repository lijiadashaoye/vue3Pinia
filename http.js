import { createServer } from 'node:http';

// 构建本地node服务
function createServerFn() {
  createServer((req, res) => {
    if (req.url != '/favicon.ico') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Max-Age', '100000');
      res.setHeader('Cache-Control', 'max-age=2000');
      res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      res.setHeader('Referer-Policy', 'strict-origin-when-cross-origin');

      let url = req.url.slice(1).split('/');
      let time,
        num = 5,
        data;
      if (url[0] === 'sse') {
        res.setHeader('Content-Type', 'text/event-stream');
        /*
         res.write()与res.end()总是且必须成对出现
         如果要使用res.write()最后必须要有res.end，两者是成对出现的，缺一不可，
         也就是说使用res.write方法向前端返回数据，必须调用res.end方法结束请求。否则浏览器会一直处于处于请求状态
         res.write()方法在结束浏览器响应请求之前，允许多次调用
         如果想要输出多条语句，使用的是res.write()，也就是说在res.end() 之前，res.write() 可以被执行多次），
         且返回的数据会被拼接到一起。
     */
        time = setInterval(() => {
          num--;
          if (num > 0) {
            data = {
              name: 'eventsource' + Math.trunc(Math.random() * 100),
            };
            res.write(`data:${JSON.stringify(data)}\n\n`);
          } else {
            data = {
              name: 'close',
            };
            res.end(`data:${JSON.stringify(data)}\n\n`);
            clearInterval(time);
            time = null;
          }
        }, 1000);
      } else {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end('');
      }
    }
  }).listen(2342);
}
// createServerFn()
/*
  node主要应用领域：
  1：实时通信，如消息推送
  2：高并发
  3：I/O阻塞
  4：RESTFul API，如web领域http请求，长连接
  
  不适合的领域
  1：cpu 密集的操作，如：视频处理，数学计算
  2：需要稳定、准确的数据操作
*/
// 将node用作客户端，去请求另外的接口数据，可以解决浏览器的跨域限制
function getMethod(req, res, datas) {
  createServer((req, res) => {
    if (req.url != '/favicon.ico') {
      let url = `http://fund.10jqka.com.cn/web/fund/stockAndBond${req.url}`;
      http.get(url, (req, r) => {
        let datas = '';
        req.on('data', data => {
          datas += data;
        });
        req.on('end', function () {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(datas);
        });
      });
    } else {
      res.end('');
    }
  }).listen(6666);
}
// 接收 post 数据
function postMethod() {
  let querystring = require('querystring');
  createServer((req, res) => {
    let body = ''; // 暂存请求体的信息
    req.on('data', function (chunk) {
      body += chunk; // 每当接受到请求体的数据（二进制数据），就累加到 body 变量中
    });
    req.on('end', () => {
      body = querystring.parse(body);
      console.log(body);
      // res.end(body);
    });
  }).listen(6546);
}
// getMethod();
// postMethod();

import { WebSocketServer } from 'ws';
function makeWebSocket() {
  const wss = new WebSocketServer({ port: 5555 });
  wss.on('connection', ws => {
    ws.on('error', console.error);
    ws.on('close', () => {
      console.log('关闭了');
    });
    ws.on('message', data => {
      let num = data.toString();
      console.log(num);
      ws.send(`node：${data}`);
    });
  });
}
// makeWebSocket();

import { Server } from 'socket.io';
// 使用 http服务 + socket
// function webServer_SocketIO() {
//   let nodeServer = createServer();
//   const io = new Server(nodeServer, {
//     cors: {
//       origin: '*',
//     },
//   });
//   io.on('connection', socket => {
//     console.log('a user connected');
//     socket.on('chat message', msg => {
//       console.log('message: ' + msg);
//       setTimeout(() => {
//         socket.emit;
//         // socket.emit 信息传输对象为当前 socket 对应的 client，各个client相互不影响
//         // socket.broadcast.emit 信息传输对象为所有 client，排除当前socket 对应的 client
//         // io.sockets.emit 信息传输对象为所有 client
//         socket.emit('chat message', '服务端消息');
//       }, 2000);
//       setTimeout(() => {
//         io.emit('hello', 'world');
//       }, 2000);
//     });

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
//   nodeServer.listen(3333);
// }
// webServer_SocketIO()

// 只用socket
function makeSocketIO() {
  const io = new Server(3333, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', socket => {
    console.log('已连接');
    io.emit('serverMessage', '广播');

    socket.on('clientMessage', msg => {
      console.log('接收到客户端消息：' + msg);
      // socket.emit 信息传输对象为当前 socket 对应的 client，各个client相互不影响
      // socket.broadcast.emit 信息传输对象为所有 client，排除当前socket 对应的 client
      // io.sockets.emit 信息传输对象为所有 client
      socket.emit('serverMessage', `服务端消息：${msg}`);
    });
    socket.on('disconnect', () => {
      console.log('断开连接');
      socket.removeAllListeners();
    });
  });
}
makeSocketIO();

// 查看cup几核
// import { availableParallelism } from 'node:os';
// const numCPUs = availableParallelism();
// console.log(numCPUs);

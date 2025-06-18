onmessage = msg => {
  console.log(msg);
  setTimeout(() => {
    postMessage('worker 返回的数据');
  }, 2000);
};

const io = require('./bin/www').io;

let lineChartData = {
  x: [],
  y: [],
  mode: 'lines',
  line: {
    shape: 'linear',
    smoothing: 1.3,
  },
  name: 'Ruble exchange rate',
};

let timer;

const generateData = (count, min, max) => {
  [...Array(count)].forEach((el, i) => {
    lineChartData.x.push(Date.now() - (count - i) * 1000);
    lineChartData.y.push(Math.floor(Math.random() * (max - min + 1) + min));
  });
};

const lastLineChartElement = () => ({
  x: [[lineChartData.x[lineChartData.x.length - 1]]],
  y: [[lineChartData.y[lineChartData.y.length - 1]]],
});

const updateChart = () => {
  lineChartData.x.shift();
  lineChartData.y.shift();
  lineChartData.x.push(Date.now());
  lineChartData.y.push(Math.floor(Math.random() * (80 - 60 + 1) + 60));
};

generateData(100, 60, 80);

// This enables CORs and ensures that our frontend,
// running on a different server can connect to our backend
io.set('origins', process.env.FRONTEND_WEBSOCKET);
io.on('connection', (socket) => {
  console.log('New user connected');
  const isUser = socket.request.session.passport && socket.request.session.passport.user;

  if (!isUser) {
    socket.disconnect();
    return;
  }

  socket.on('chart', (params, callback) => {
    if (!params.chart) {
      return callback('Chart name is required.');
    }

    socket.join(params.chart);

    if (params.chart === 'line') {
      // for first render
      socket.emit('lineChartDataInit', lineChartData);

      if (timer) {
        clearInterval(timer);
      }
      // submit data for all users
      timer = setInterval(() => {
        updateChart();

        io.emit('lineChartDataOnline', lastLineChartElement());
      }, 1000);
    }
  });
});

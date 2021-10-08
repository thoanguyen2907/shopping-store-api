
var express       = require('express');

const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

const { rootRouter } = require('./app/routes');

const pathConfig        = require('./path');



global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';

global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_models    = __path_app + pathConfig.folder_models + '/';
global.__path_routers   = __path_app + pathConfig.folder_routers + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';


const systemConfig    = require(__path_configs + 'system');
const databaseConfig  = require(__path_configs + 'database');



var app = express();
app.use(express.json());
app.use(cookieParser());

// Setup router
app.use('/api/v1/', rootRouter);



// Local variable
app.locals.systemConfig = systemConfig;
app.listen(3000, async () => {
mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@nodejstraining.4cyhs.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('Error App');
});

module.exports = app;


const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    userDb: 'mongodb://localhost/authorization',
    mongooseOptions: {
        useCreateIndex: true,
        useNewUrlParser: true
    }
};
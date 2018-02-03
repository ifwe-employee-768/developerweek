import app from './src/flint'

// connect the alexa-app to AWS Lambda
let handler = app.lambda();

export {handler as handle};

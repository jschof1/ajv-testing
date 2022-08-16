const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv({ useDefaults: true });
AjvFormats(ajv);

const obj = {
  username: 'martyn',
  techs: {
    javascript: true,
    php: true,
    rust: false,
  },
  exp: 1,
  date: '2020-12-12',
  email: 'martyn@gmail.com',
};

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 1 },
    techs: {
      type: 'object',
      properties: {
        javascript: { type: 'boolean' },
        php: { type: 'boolean' },
        rust: { type: 'boolean' },
      },
      required: ['javascript', 'php', 'rust'],
    },
    exp: { type: 'number' },
    date: { type: 'string', format: 'date-time', default: '' },
    email: { type: 'string', format: 'email-format' },
    year: { type: 'number', default: 1 },
  },
  required: ['username', 'techs', 'exp', 'date', 'email', 'year'],
};

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
ajv.addFormat('date-time', dateRegex);
ajv.addFormat('email-format', emailRegex);

const check = async (data, structure) => {
  const validate = ajv.compile(structure);
  const resp = validate(data);
  return resp;
};

check(obj, schema).then(console.log); // true

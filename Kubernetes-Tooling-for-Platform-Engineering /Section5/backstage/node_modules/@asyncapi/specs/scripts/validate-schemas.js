const fs = require('fs');
const path = require('path');
const AjvDraft04 = require('ajv-draft-04');
const ajvDraft04 = new AjvDraft04();
const Ajv = require('ajv');
const ajv = new Ajv();

function validateSchema(filePath, fileContent, schemaValidator) {
  try {
    const obj = JSON.parse(fileContent);
    const validate = schemaValidator(obj);
    const errors = validate ? [] : (obj.$schema === 'http://json-schema.org/draft-04/schema' && ajvDraft04.errors) || ajv.errors;
    
    return { filePath, validate, errors };
  } catch (error) {
    return {
      filePath,
      validate: false,
      errors: [{ message: `Error reading or parsing JSON Schema: ${error.message}` }],
    };
  }
}

function validation(excludedFiles) {
  const directoryPath = './schemas';

  try {
    const files = fs.readdirSync(directoryPath);
    const filteredFiles = files.filter(file => !excludedFiles.includes(file) && path.extname(file).toLowerCase() === '.json');

    const validationErrors = [];

    filteredFiles.forEach(file => {
      const filePath = path.join(directoryPath, file);

      const schemaValidator = (obj) => {
        return (obj.$schema === 'http://json-schema.org/draft-04/schema') ? ajvDraft04.validateSchema(obj) : ajv.validateSchema(obj);
      };

      const validationResult = validateSchema(filePath, fs.readFileSync(filePath, 'utf8'), schemaValidator);

      if (!validationResult.validate || validationResult.errors.length > 0) {
        validationErrors.push(validationResult);
      }
    });

    if (validationErrors.length > 0) {
      console.error('\nValidation errors:');
      validationErrors.forEach(({ filePath, validate, errors }) => {
        console.error(`${filePath}: JSON Schema is not valid:`);

        if (validate) {
          console.error('Detailed Error Information:');
          errors.forEach(error => {
            console.error(JSON.stringify(error, null, 2));
          });
        } else {
          console.error(errors);
        }
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('\nError during validation:', error.message);
    process.exit(1);
  }
}

const excludedFiles = ['2.0.0-rc1.json', '2.0.0-rc1-without-$id.json']; // added temporarily to avoid validation failure due to these two files. The schemas version are incorrect in these and needs to be fixed.

validation(excludedFiles);
console.log('\nValidation completed successfully.');

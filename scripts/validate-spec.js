import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync('./src/spec/schema.json', 'utf8'));
const validate = ajv.compile(schema);

const devDir = './src/developments';
const files = fs.readdirSync(devDir).filter(f => f.endsWith('.json'));

let hasError = false;

files.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(devDir, file), 'utf8'));
    const valid = validate(data);
    if (!valid) {
        console.error(`❌ Validation failed for ${file}:`);
        console.error(validate.errors);
        hasError = true;
    } else {
        console.log(`✅ ${file} is valid`);
    }
});

if (hasError) {
    process.exit(1);
}


import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv();
const schemaPath = path.resolve(__dirname, '../src/spec/schema.json');
const developmentsDir = path.resolve(__dirname, '../src/developments');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const validate = ajv.compile(schema);

const files = fs.readdirSync(developmentsDir).filter(file => file.endsWith('.json'));
let hasError = false;

console.log('🔍 Running Spec Kit validation...');

files.forEach(file => {
  const filePath = path.join(developmentsDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const valid = validate(data);
    if (!valid) {
      console.error(`❌ Validation failed for ${file}:`);
      console.error(validate.errors);
      hasError = true;
    } else {
      console.log(`✅ ${file} is valid.`);
    }
  } catch (err) {
    console.error(`❌ Error reading ${file}:`, err.message);
    hasError = true;
  }
});

if (hasError) {
  process.exit(1);
} else {
  console.log('✨ All development specs match the schema.');
}

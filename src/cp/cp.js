import cp from 'child_process'
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILES_PATH = 'files';
const SCRIPT = 'script.js';
const scriptPath = path.join(__dirname, FILES_PATH, SCRIPT)

const spawnChildProcess = async (args) => {
    cp.spawn('node', [scriptPath, ...args], {
        stdio: 'inherit',
    })
};

// Put your arguments in function call to test this functionality
await spawnChildProcess(['-asdasdasdv', 'test', 123]);

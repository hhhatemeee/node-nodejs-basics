import { Worker } from 'node:worker_threads'
import os from 'node:os'
import { fileURLToPath } from 'url';
import path from 'path';

const RESULT_STATUS = {
    ERROR: 'error',
    RESOLVED: 'resolved'
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    const cpuCount = os.cpus().length
    const result = []

    for (let i = 0; i < cpuCount; i++) {
        const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: i + 10 })

        worker.on('message', msg => {
            result[i] = ({ status: RESULT_STATUS.RESOLVED, data: msg })

            if (result.length === cpuCount) {
                console.log(result);
            }
        })


        worker.on('error', () => {
            result[i] = ({ status: RESULT_STATUS.ERROR, data: null })
        })
    }
};

await performCalculations();
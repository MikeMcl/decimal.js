// listen for test cases, and provide the results.
// give JSON of the test case, receive the result
// Example: 
// > {"func":"tan", "args":["12.5"], "config":{"precision":8}}
// -0.066468242


import {Decimal} from '../../decimal.mjs';
import {createInterface} from 'readline';

const readline = createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.on("close", () => {console.log('\n'); process.exit(0);});

readline.on("line", (line) => {
    if (line) {
        const {func, args, config} = JSON.parse(line);
        config.defaults = true;
        Decimal.set(config);
        const result = Decimal[func](...args);
        console.log(result);
    }
});
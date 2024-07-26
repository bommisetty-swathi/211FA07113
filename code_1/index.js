const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876;

const WINDOW_SIZE = 10; // Size of the sliding window
let storedNumbers = []; // Array to store fetched numbers

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;

    // Fetch numbers from the test server based on numberid
    let response;
    try {
        response = await fetchNumbers(numberid);
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        res.status(500).send('Error fetching numbers');
        return;
    }

    // Update stored numbers and maintain unique entries
    updateStoredNumbers(response.numbers);

    // Prepare response with previous and current window states, and average
    const windowPrevState = [...storedNumbers];
    const windowCurrState = storedNumbers.slice(-WINDOW_SIZE);
    const avg = calculateAverage(windowCurrState);

    const responseObject = {
        windowPrevState,
        windowCurrState,
        numbers: response.numbers,
        avg: avg.toFixed(2) // Format average to two decimal places
    };

    res.json(responseObject);
});

async function fetchNumbers(numberid) {
    const url = `http://20.244.56.144/test/${numberid}`;
    const response = await axios.get(url);
    return response.data;
}

function updateStoredNumbers(newNumbers) {
    newNumbers.forEach(num => {
        if (!storedNumbers.includes(num)) {
            storedNumbers.push(num);
        }
    });

    // Maintain window size
    if (storedNumbers.length > WINDOW_SIZE) {
        storedNumbers = storedNumbers.slice(-WINDOW_SIZE);
    }
}

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.listen(port, () => {
    console.log(`Average Calculator microservice listening at http://localhost:${port}`);
});

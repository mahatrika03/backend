const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON requests

// POST method to handle /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input data" });
    }

    const user_id = "Mahatrika_kanchadapu_07062003"; // Replace with your actual name and birthdate
    const email = "mahatrikakanchadapu@gmail.com"; // Your email
    const roll_number = "AP21110011286"; // Your roll number

    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = "";

    // Loop through the data and segregate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);  // Add to numbers array
        } else if (isNaN(item)) {
            alphabets.push(item);  // Add to alphabets array
            if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
                highest_lowercase_alphabet = item;
            }
        }
    });

    // File validation (for now, assume all files are valid)
    const file_valid = file_b64 ? true : false;  // If there's a file
    const file_mime_type = file_valid ? "image/png" : null;  // Temporary logic, you will implement proper file handling later
    const file_size_kb = file_valid ? 400 : 0;  // Placeholder file size

    // Prepare response
    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    });
});

// GET method to handle /bfhl
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

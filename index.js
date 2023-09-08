import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const PORT = 8000;
app.get("/bhfl",(req,res)=>{
    try{
        return res.status(200).send({operation_code : 1})
    }catch(err){
        return res.status(500).json({ error: error.message });
    }
})
app.post("/bhfl", (req, res) => {
    try {
        const { data } = req.body;
        const { numbers, alphabets } = separateNumbersAndAlphabets(data);
        const highest_alphabet = findMaxAlphabet(alphabets);
        const response = {
            is_success: true,
            user_id: "Sivaramakrishnan_M_01082002",
            email: "sm2482@srmist.edu.in",
            roll_number: "RA2011029010002",
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        };

        res.json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

function separateNumbersAndAlphabets(inputArray) {
    if (!Array.isArray(inputArray)) {
        throw new Error("Input should be an array.");
    }

    const numbers = inputArray.filter(item => !isNaN(parseFloat(item)));
    const alphabets = inputArray.filter(item => typeof item === 'string' && /^[A-Za-z]$/.test(item));

    return { numbers, alphabets };
}

function findMaxAlphabet(alphabets) {
    if (!Array.isArray(alphabets)) {
        throw new Error("Input should be an array.");
    }

    let maxCharCode = 0;
    let maxChar = '';

    for (let i = 0; i < alphabets.length; i++) {
        const charCode = alphabets[i].charCodeAt(0);
        if (charCode > maxCharCode) {
            maxCharCode = charCode;
            maxChar = alphabets[i];
        }
    }

    return maxChar;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

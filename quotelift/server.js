// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 5000;

// // Middleware to parse JSON requests
// app.use(express.json());

// // Define the /get-quote POST route
// app.post('/get-quote', async (req, res) => {
//   const { mood, energyLevel, goal } = req.body;

//   // Input validation (optional)
//   if (!mood || !energyLevel || !goal) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   try {
//     // Call your external API (Ollama or similar) to get a quote
//     const quote = await getQuoteFromLLaMA(mood, energyLevel, goal);
    
//     // Send the quote in the response
//     res.json({ quote });
//   } catch (error) {
//     console.error('Error fetching quote:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Example function to simulate fetching a quote (replace with actual API logic)
// const getQuoteFromLLaMA = async (mood, energyLevel, goal) => {
//   // This is a placeholder for your API logic.
//   // Replace it with the actual API call logic to get quotes based on mood, energyLevel, and goal.
  
//   return `Here is a motivational quote for a person who is feeling ${mood}, with energy level ${energyLevel}, and goal to ${goal}.`;
// };

// // Start the server and listen on the specified port
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });




















// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();  // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // Helper function to get a quote from LLaMA
// const getQuoteFromLLaMA = async (mood, energyLevel, goal) => {
//   try {
//     const response = await axios.post('http://localhost:5000', {
//       prompt: `Give me a motivational quote for a person who is feeling ${mood}, with energy level ${energyLevel}, and goal to ${goal}.`
//     });
//     return response.data.quote;
//   } catch (error) {
//     console.error('Error fetching quote:', error);
//     throw new Error('Failed to generate quote.');
//   }
// };

// // POST endpoint to get quotes based on user inputs
// app.post('/get-quote', async (req, res) => {
//   const { mood, energyLevel, goal } = req.body;
//   try {
//     const quote = await getQuoteFromLLaMA(mood, energyLevel, goal);
//     res.json({ quote });
//   } catch (error) {
//     res.status(500).send('Failed to generate quote. Try again.');
//   }
// });

// // Start the server
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });








































const express = require("express");
const { exec } = require("child_process"); // Import the child_process module

const app = express();
const port = 5000; // Port to run your server

// Middleware to parse JSON
app.use(express.json());

// Route to get a quote based on user input
app.post("/get-quote", (req, res) => {
    const { mood, energyLevel, goal } = req.body;

    // Construct the user prompt
    const userPrompt = `Give me a quote about ${goal} for someone who feels ${mood} and has an energy level of ${energyLevel}.`;

    // Execute the Ollama command using child_process
    exec(`ollama run llama3.2:latest "${userPrompt}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: "Failed to fetch quote. Try again." });
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: "An error occurred while processing the quote." });
        }

        // The output from Ollama (stdout) will contain the generated quote
        const quote = stdout.trim(); // Clean the quote text to remove any extra whitespace
        return res.json({ quote });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server listening on port 5000');
});
  
  




// const express = require("express");
// const fetch = require("node-fetch");

// const app = express();
// const port = 5000; // Port to run your server

// // Middleware to parse JSON
// app.use(express.json());

// // Route to get a quote based on user input
// app.post("/get-quote", async (req, res) => {
//     const { mood, energyLevel, goal } = req.body;

//     // Here, you'd make the request to the Ollama model
//     const userPrompt = `Give me a quote about ${goal} for someone who feels ${mood} and has an energy level of ${energyLevel}.`;

//     try {
//         const response = await fetch("http://localhost:YOUR_OLLAMA_PORT", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 // Add any required headers for authentication, etc.
//             },
//             body: JSON.stringify({
//                 prompt: userPrompt,
//             }),
//         });

//         const data = await response.json();
//         const quote = data?.choices?.[0]?.text || "Failed to generate quote. Try again.";

//         res.json({ quote });
//     } catch (error) {
//         console.error("Error fetching quote:", error);
//         res.status(500).json({ error: "Failed to fetch quote." });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

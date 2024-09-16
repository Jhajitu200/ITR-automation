const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');

const app = express();
app.use(cors());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    },
});

const upload = multer({ storage: storage });
const CONVERTAPI_SECRET = 'secret_WTxp0E1zwYGYd5Yp'; 

app.post('/convert', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const originalFileName = req.file.originalname;
    const pdfPath = req.file.path;

    try {
        // Check if the file is a valid PDF
        if (!isValidPDF(pdfPath)) {
            throw new Error('Uploaded file is not a valid PDF.');
        }

        const docxFile = await convertFile(pdfPath, 'pdf', 'docx');
        const finalPdf = await convertFile(docxFile, 'docx', 'pdf');

        // const finalPdf = '/home/prabhakar/Desktop/Learning/Generic-Node-Service/uploads/output.pdf';

        console.log('finalPdf ---- ', finalPdf);
        // res.send({ msg: "hello" })
        res.setHeader('Content-Type', 'application/pdf');

        res.download(finalPdf, originalFileName, err => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending file');
            } else {
                // cleanupFiles([pdfPath, docxFile, finalPdf]);
            }
        });
    } catch (error) {
        console.error('Error converting file:', error.message);
        res.status(500).send('Error converting file');
        cleanupFiles([pdfPath]);
    }
});

// app.post('/test', (req, res) => {
//     res.send({ msg: "hello world" });
//     // res.download(finalPdf, originalFileName, err => {
//     //     if (err) {
//     //         console.error('Error sending file:', err);
//     //         res.status(500).send('Error sending file');
//     //     } else {
//     //         
//     //         // cleanupFiles([pdfPath, docxFile, finalPdf]);
//     //     }
//     // });
// })

function isValidPDF(filePath) {
    const fileContent = fs.readFileSync(filePath);
    return fileContent.includes('%PDF-');
}

async function convertFile(filePath, fromFormat, toFormat) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    try {
        const response = await axios.post(
            `https://v2.convertapi.com/convert/${fromFormat}/to/${toFormat}?secret=${CONVERTAPI_SECRET}&storeFile=true`,
            form,
            {
                headers: form.getHeaders(),
            }
        );

        if (response.status !== 200 || !response.data || !response.data.Files || response.data.Files.length === 0) {
            throw new Error(`Failed to convert file: ${response.statusText}`);
        }

        const outputFile = path.join(__dirname, 'uploads', `output.${toFormat}`);
        const file = await axios.get(response.data.Files[0].Url, { responseType: 'stream' });

        console.log('file ----- in convertFile ---- ', file.data);
        
        return new Promise((resolve, reject) => {
            console.log("outputFile --------------- in convertFile --- ", outputFile);
            const writer = fs.createWriteStream(outputFile);
            file.data.pipe(writer);
            writer.on('finish', () => resolve(outputFile));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error converting file:', error.response ? error.response.data : error.message);
        throw error;
    }
}

function cleanupFiles(filePaths) {
    filePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, err => {
                if (err) console.error('Error cleaning up file:', err);
            });
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});










document.getElementById("fileInput").addEventListener("input", fileReader, false);

async function fileReader(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function (event) {
            const typedArray = new Uint8Array(event.target.result);
            try {
                const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
                let textContent = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContentPage = await page.getTextContent();
                    const textItems = textContentPage.items.map((item) => item.str);
                    textContent += textItems.join(" ") + " ";
                }

                console.log("Extracted text content:", textContent);

                typeCheck(textContent);
                console.log("hello i am jitu kumar jha");
                // showSuccessMessage();
            } catch (error) {
                console.error("Error loading PDF document:", error);
            }
        };

        reader.readAsArrayBuffer(file);
    }
}
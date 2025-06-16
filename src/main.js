import { ContentAuth } from '@contentauth/sdk';
import wasmURL from '@contentauth/sdk/dist/assets/wasm/toolkit_bg.wasm?url';
import workerURL from '@contentauth/sdk/dist/cai-sdk.worker.min.js?url'
const sdk = new ContentAuth({
  wasmSrc: wasmURL,
  workerSrc: workerURL,
});

function findMapEntry(map, entry) {
  for (const [key, value] of map.entries(map)) {
      if (key.length >= entry.length) {
          if (key.substring(key.length - entry.length) == entry) {
              return key;
          }
      }
  }
  return;
}
       // DOM elements
       const uploadView = document.getElementById('upload-view');
       const detailsView = document.getElementById('details-view');
       const dropzone = document.getElementById('dropzone');
       const fileInput = document.getElementById('file-input');
       const backToUpload = document.getElementById('back-to-upload');
       const fileName = document.getElementById('file-name');
       const timelineImg1 = document.getElementById('timeline-img-1');
       const timelineImg2 = document.getElementById('timeline-img-2');
       const timelineImg3 = document.getElementById('timeline-img-3');
       const ingredientThumbnail = document.getElementById('ingredient-thumbnail');
       
       // Event listeners
       dropzone.addEventListener('click', () => {
           fileInput.click();
       });
       
       dropzone.addEventListener('dragover', (e) => {
           e.preventDefault();
           dropzone.style.borderColor = '#0066cc';
       });
       
       dropzone.addEventListener('dragleave', () => {
           dropzone.style.borderColor = '#ccc';
       });
       
       dropzone.addEventListener('drop', (e) => {
           e.preventDefault();
           dropzone.style.borderColor = '#ccc';
           
           if (e.dataTransfer.files.length) {
               handleFile(e.dataTransfer.files[0]);
           }
       });
       
       fileInput.addEventListener('change', () => {
           if (fileInput.files.length) {
               handleFile(fileInput.files[0]);
           }
       });
       
       backToUpload.addEventListener('click', (e) => {
           e.preventDefault();
           detailsView.style.display = 'none';
           uploadView.style.display = 'block';
       });
       
       // Handle file upload
       async function handleFile(file) {
           // Update file name
           fileName.textContent = file.name;
           

           const sdk = new ContentAuth({
            wasmSrc: wasmURL,
            workerSrc: workerURL,
          });

           // Create object URL for the file
           const objectUrl = URL.createObjectURL(file);
           const provenance = await sdk.processImage(
            objectUrl);
          console.log(provenance.activeClaim);
          
          provenance.activeClaim.asSerializableData().then((result) => {
            console.log(result);
            document.getElementById("txtProducedBy").innerHTML = result["data"]["producer"];
            document.getElementById("txtIssuedBy").innerHTML = result["data"]["signer"];
            document.getElementById("txtIssuedBy2").innerHTML = result["data"]["signer"];
            document.getElementById("txtIssuedOn").innerHTML = result["data"]["signatureDate"];
            document.getElementById("txtIssuedOn2").innerHTML = result["data"]["signatureDate"];
            document.getElementById("txtRecorder").innerHTML = result["data"]["recorder"];

            
            


            
            document.getElementById("rawJson").innerHTML = JSON.stringify(result.data, null, 2); 
          })


           // Set the same image for all timeline views for demo
           timelineImg1.src = objectUrl;
           timelineImg2.src = objectUrl;
           timelineImg3.src = objectUrl;
           ingredientThumbnail.src = objectUrl;
           
           // Switch to details view
           uploadView.style.display = 'none';
           detailsView.style.display = 'block';
           
           // Read file data (if needed for actual processing)
           const reader = new FileReader();
           reader.onload = function(e) {
               // Here you would process the file data
               const fileData = e.target.result;
               console.log("File data loaded into variable, length:", fileData.length);
               // For a real app, you would analyze the file and update the UI accordingly
           };
           reader.readAsArrayBuffer(file);
       }
<template>
  <div>
    <input type="file" ref="selectedFile">
    <v-btn @click="generate" color="primary">Download Word Document</v-btn>
  </div>
</template>

<script>
import docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import JSzipUtils from 'jszip-utils';
import saveAs from 'file-saver';
import PizZip from "pizzip";
let PizZipUtils = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

export default {
  name: "Report",
  data: () => ({

  }),
  methods: {
    loadFile(url, callback) {
      PizZipUtils.getBinaryContent(url, callback);
    },
    generate() {
      this.loadFile("https://docxtemplater.com/tag-example.docx", function (error, content) {
        if (error) {
          throw error;
        }
        let zip = new PizZip(content);
        let doc = new docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        doc.render({
          first_name: "John",
          last_name: "Doe",
          phone: "0652455478",
          description: "New Website",
        });

        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            //"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf;charset=utf-8",
          // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
          compression: "DEFLATE",
        });
        console.log(typeof out)
        console.dir(out)
        // Output the document using Data-URI
        saveAs(out, "output.pdf");
      });
    },
    // 이 아래 코드는 pizzip이 아닌 jszip@2 를 이용하는 코드임.
    /*
    getDoc() {
      this.createAndSaveDocument();
    },
    loadFile(url, callback) {
      JSzipUtils.getBinaryContent(url, callback)
    },
     */
    createAndSaveDocument(){
      /*
      *   This required JSON dataset must be fetched from the backend API.
      *   The tags in the template will be replaced by these data.
      *   For demonstrations, I have hardcoded the tesdt dataset
      */
      let dataset = {
        "first_name": "Udith",
        "last_name": "Indrakantha",
        "phone": "+94760000000",
        "description": "Udith Gayan Indrakantha",
      };
      /* *
      * The template's path must be passed as an arguement .
      * This path can be either a URL(as  in the commented line) or a path relative to the Public folder
      * For testing, I have created a folder named  "ReportTemplates" inside the public folder and it contains my sample
      * template named "template1.docx" .
      * */
      // this.loadFile("https://docxtemplater.com/tag-example.docx",function(error: any,content : any){
      this.loadFile('https://docxtemplater.com/tag-example.docx',function(error, content){
        if (error) {
          throw error
        }
        let zip = new JSZip(content);
        let doc = new docxtemplater().loadZip(zip)
        doc.setData(dataset)
        try {
          doc.render()
        }
        catch (error) {
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({error: e}));
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
          throw error;
        }
        // docx generating
        let out = doc.getZip().generate({
          type:"blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
        saveAs(out,`MyDocument.docx`);    // You can pass this blob to a custom file saver component in the project.
      });
    },
  },
}
</script>

<style scoped>

</style>

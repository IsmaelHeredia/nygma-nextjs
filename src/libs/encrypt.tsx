export default function encryptMessage(name: string, content: string, iv: any) {

    var htmlDocument = `<html>

<head>
    <title>[DOCUMENT_NAME]</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/cyborg/bootstrap.min.css"
        integrity="sha384-nEnU7Ae+3lD52AK+RGNzgieBWMnEfgTbRHIwEvp1XXPdqdO6uLTd/NwXbzboqjc2" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
</head>

<style>
    body {
        background-color: #1b1c17;
        color: #e4e2db;
        font-size: 18px;
        font-weight: 800;
    }
    pre {
        background: #1b1c17;
        border: 1px solid #666;
        border-left: 3px solid #acd452;
        page-break-inside: avoid;
        font-size: 15px;
        line-height: 1.6;
        overflow: auto;
        padding: 1em 1.5em;
        display: block;
        word-wrap: break-word;
        min-width:100%;
        min-height:100%;
    }
    .form-decrypt {
        margin-left: 30%;
        margin-right: 30%;
        margin-top: 8%;
    }
    .form-content {
        display: none;
    }
</style>

<body>
    <div id="div_form" class="form-decrypt">
        <div class="form-group">
            <div style="text-align: center;">
                <label class="text-center">Password</label>
            </div>
            <input type="password" class="form-control" id="txtPassword" placeholder="Password">
        </div>
        <div class="row justify-content-center">
            <button class="btn btn-success" onclick="decodeMessage()">Decrypt</button>
        </div>
    </div>

    <div id="div_content" class="form-content">
        <pre id="content"></pre>
    </div>

</body>

<script>

    function decodeMessage() {

        const password = document.getElementById("txtPassword").value;

        const message = "[MESSAGE_ENCRYPT]";
        const iv = "[MESSAGE_IV]";

        const decryptedMessage = CryptoJS.AES.decrypt(message, password, { iv: iv }).toString(CryptoJS.enc.Utf8);

        document.getElementById("content").innerHTML = decryptedMessage;

        document.getElementById("div_form").style.display = "none";
        document.getElementById("div_content").style.display = "block";

    }

</script>

</html>
    `;

    htmlDocument = htmlDocument.replace("[DOCUMENT_NAME]", name);
    htmlDocument = htmlDocument.replace("[MESSAGE_ENCRYPT]", content);
    htmlDocument = htmlDocument.replace("[MESSAGE_IV]", iv);

    return htmlDocument;

}
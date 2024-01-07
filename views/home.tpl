<html>
  <head>
    <title>Timeline Annotation Home</title>
    <link href="/static/css/main.css" rel="stylesheet">
  </head>
  <body>
      <h2>Medication Timeline Annotation</h2>
      <p>Welcome to the Bottle sample app.</p>
      <form method='get' action='/annotate'>
        <label for="sample-select">Select a sample to annotate:</label>
        <select name="sample-name" id="sample-select">
            <option value="doc0086">Sample 1</option>
            <option value="sample2.json">Sample 2</option>
            <option value="sample3.json">Sample 3</option>
        </select>
        <input type='submit' value='Submit'>
      </form>
      <form method='post' action='/annotate-upload' enctype='multipart/form-data'>
        <label for="file-upload">Or upload a text file:</label>
        <input type='file' name='file-upload' id="file-upload" accept=".txt">
        <input type='submit' value='Submit'>
      </form>
  </body>
</html>

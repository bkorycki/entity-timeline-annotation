<!DOCTYPE html>
<html lang="en">
<head>  
    <meta charset="utf-8">
    <title>Medication-Timeline Annotation</title>
    <link href="/static/css/main.css" rel="stylesheet">
</head>
<body>
  <div id="home-section">
    <h1>Medication Timeline Annotation: Demo</h1>
    <form method='get' action='/annotate'>
      <label for="sample-select">Select a sample to annotate:</label>
      <select name="sample-name" id="sample-select">
          <option value="doc0006">Sample 1</option>
          <option value="doc0086">Sample 2</option>
      </select>
      <input type='submit' value='Try it out!'>
    </form>
  </div>
    <!-- <form method='post' action='/annotate-upload' enctype='multipart/form-data'>
      <label for="file-upload">Or upload a text file:</label>
      <input type='file' name='file-upload' id="file-upload" accept=".txt">
      <input type='submit' value='Submit'>
    </form> -->
</body>
</html>

var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  // var reader = new FileReader();
  // reader.onload = function(e) {
  //   el("image-picked").src = e.target.result;
  //   el("image-picked").className = "";
  // };
  // reader.readAsDataURL(input.files[0]);
}

function analyze_vocals() {
  var uploadFiles = el("file-input").files;
  // var email = el("email").value;
  if (uploadFiles.length !== 1) 
  {
    alert("Please select a file to analyze!");
    return;
  }

  el("analyze-button-vocals").innerHTML = "Separating...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/separate_vocals`,
    true);
  xhr.setRequestHeader('Accept', 'audio/wav');
  xhr.responseType = 'blob';
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    // if (this.readyState === 4) {
    //   var response = JSON.parse(e.target.responseText);
    //   el("result-label").innerHTML = `Result = ${response["result"]}`;
    // }
    if (this.readyState == 4) 
    {
      try {
        // var blob = new Blob([e.target.response], { type: 'audio/wav' });
        var blob = e.target.response;
        var contentDispo = this.getResponseHeader('Content-Disposition');
        console.log(contentDispo);
        var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
        console.log(fileName);
        saveBlob(blob, fileName);
        // var url = URL.createObjectURL(blob)
        // console.log(url)
        // audio = new Audio();
        // audio.src = url;
        // // window.audio.crossOrigin = 'anonymous';
        // audio.onload = function(evt) {
        //   URL.revokeObjectURL(url);
        // };
        // audio.play();
      }
      catch (error)
      {
        console.log(error.message);
      }
    }
    el("analyze-button-vocals").innerHTML = "Separate vocals";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  // fileData.append("email", email);
  xhr.send(fileData);
}

function saveBlob(blob, fileName) {
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  // console.log(blob)
  fileName = fileName.slice(1, -1);
  a.download = fileName;
  // console.log(a.href);
  // a.dispatchEvent(new MouseEvent('click'));
  a.click();
  window.URL.revokeObjectURL(a.href);
}

function analyze_accompaniment() {
  var uploadFiles = el("file-input").files;
  // var email = el("email").value;
  if (uploadFiles.length !== 1) 
  {
    alert("Please select a file to analyze!");
    return;
  }

  el("analyze-button-accompaniment").innerHTML = "Separating...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
 
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/separate_accompaniment`,
    true);
    xhr.setRequestHeader('Accept', 'audio/wav');
    xhr.responseType = 'blob';
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    // if (this.readyState === 4) {
    //   var response = JSON.parse(e.target.responseText);
    //   el("result-label").innerHTML = `Result = ${response["result"]}`;
    // }
    if (this.readyState == 4)
    {
      try {
        // var blob = new Blob([e.target.response], { type: 'audio/wav' });
        var blob = e.target.response;
        var contentDispo = this.getResponseHeader('Content-Disposition');
        console.log(contentDispo);
        var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
        console.log(fileName);
        saveBlob(blob, fileName);
        // var url = URL.createObjectURL(blob)
        // console.log(url)
        // audio = new Audio();
        // audio.src = url;
        // // window.audio.crossOrigin = 'anonymous';
        // audio.onload = function(evt) {
        //   URL.revokeObjectURL(url);
        // };
        // audio.play();
      }
      catch (error)
      {
        console.log(error.message);
      }
    }
    el("analyze-button-accompaniment").innerHTML = "Separate accompaniment";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  // fileData.append("email", email);
  xhr.send(fileData);
}
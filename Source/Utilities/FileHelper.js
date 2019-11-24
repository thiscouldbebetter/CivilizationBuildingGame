
function FileHelper()
{
	// do nothing
}

{
	FileHelper.saveTextToFile = function(textToWrite, fileNameToSaveAs)
	{
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = this.destroyClickedElement.bind(this);
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	}

	FileHelper.destroyClickedElement = function(event)
	{
		document.body.removeChild(event.target);
	}

	FileHelper.loadFileAsText = function(fileToLoad, callback)
	{
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) 
		{
			var textFromFileLoaded = fileLoadedEvent.target.result;
			callback(textFromFileLoaded);
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	}

} // end FileHelper

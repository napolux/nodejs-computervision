var openalpr = require ("node-openalpr");
var path = require ("path");
 
function identify(expected, path) {
    console.log (openalpr.IdentifyLicense (path, options, function (error, output) {
        var results = output.results;

        if(results.length > 0) {
	        console.log("-------------------");
        	if(results[0].plate == expected) {
		        console.log("Plate found!");
        	} else {
		        console.log("Not sure about this plate... But...");
        	}
	        console.log ("Time spent: "+ output.processing_time_ms +"ms "+ 
	        	         "Plate: " + results[0].plate + 
	        	         " Confidence: " + results[0].confidence + 
	        	         " Expected plate: " + expected);
	        console.log("-------------------\n")
        } else {
	        console.log("-------------------");
	        console.log ("Plate "+ expected + " not found! Time spent: " 
	        	         + output.processing_time_ms +"ms");
	        console.log("-------------------\n")
        }
	}));
}
 
openalpr.Start(path.join (__dirname, "eu.conf"));
openalpr.GetVersion();

var options = {
	detectRegion: true
}
 
identify("AD001NM", "immagini/targa1.jpg", options);
identify("AR334AW", "immagini/targa2.jpg", options);
identify("AW315CN", "immagini/targa3.jpg", options);
identify("AW315CN", "immagini/targa4.jpg", options);
identify("AY765WJ", "immagini/targa5.jpg", options);

openalpr.Stop();
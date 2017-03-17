var cv = require('opencv');

var RED = [0, 0, 255]; 
var thickness = 3; 

cv.readImage('./immagini/esempio-facedetection.jpg', function(err, im) {

  // Controlliamo di aver caricato correttamente l'immagine
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  // Lanciamo il detect dei volti usando i dati precompilati
  im.detectObject('./data/face.xml', {}, function(err, faces) {
    if (err) throw err;

    // Circondiamo ogni volto con un rettangolo colorato
    for (var i = 0; i < faces.length; i++) {
      face = faces[i];
      im.rectangle([face.x, face.y], [face.width, face.height], RED, 2);
    }

    // Salviamo l'immagine
    im.save('./output/esempio-facedetection.jpg');
    console.log("Immagine salvata");
  });

});
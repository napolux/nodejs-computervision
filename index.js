const cv = require('opencv');

cv.readImage("./immagini/esempio.png", function (err, img) {  

    // Se c'è un errore nel caricamento dell'immagine lo dobbiamo segnalare
    if (err) {
        console.log("Errore nel caricamento dell'immagine");    
        throw err;
    }

    // Ricaviamo le dimensioni dell'immagine
    const width = img.width();
    const height = img.height();

    if (width < 1 || height < 1) {
        console.log("Errore nel caricamento dell'immagine");    
        throw new Error('Error');
    }

    // Stampiamo le dimensioni dell'immagine
    console.log("Dimensioni immagine: " + width + "x" + height);

    // Convertiamo l'immagine in bianco e nero e la salviamo su disco.
    img.convertGrayscale();
    img.save("./output/esempio-scalagrigi.png");
    console.log("Immagine salvata correttamente");

    // Eseguiamo il crop dell'immagine, dopo averla convertita in scala di grigi
    let croppedImg = img.crop(300, 300, 500, 500);
    croppedImg.save("./output/esempio-crop.png");
});
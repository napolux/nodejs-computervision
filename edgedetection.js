const cv = require('opencv');

cv.readImage("./immagini/esempio-edge-detection.jpg", function (err, img) {  

    // Se c'è un errore nel caricamento dell'immagine lo dobbiamo segnalare
    if (err) {
        console.log("Errore nel caricamento dell'immagine");    
        throw err;
    }

    // Convertiamo l'immagine in bianco e nero e applichiamo un rumore gaussiano.
    img.convertGrayscale();
    img.gaussianBlur([7, 7]);

    // Definiamo i parametri di esecuzione dell'algoritmo di Canny per edge detection
    const lowThresh = 0;
    const highThresh = 200;
    const iterations = 10;

    // Applichiamo l'algoritmo
    img.canny(lowThresh, highThresh);
    img.dilate(iterations);

    // Troviamo i contorni dell'immagine e salviamo l'immagine risultante
    const WHITE = [255, 255, 255];
  
    let contours = img.findContours();
    img.drawAllContours(contours, WHITE);    
    img.save("./output/esempio-edge-detection.jpg");
});
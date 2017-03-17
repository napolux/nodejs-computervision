// Individuiamo triangoli e rettangoli/quadrati
var cv = require('opencv');

// Parametri della funzione di Edge Detection
var lowThresh = 0;
var highThresh = 50;
var nIters = 5;
var minArea = 2000;

// Definiamo alcuni colori da usare
var RED  = [0, 0, 255];  // Per i quadrilateri
var GREEN = [0, 255, 0]; // Per i triangoli
var WHITE = [255, 255, 255]; 

// Leggiamo l'immagine di partenza
cv.readImage('./immagini/esempio-poligoni.jpg', function(err, im) {
    
    // Check degli errori
    if (err) throw err;
    width = im.width()
    height = im.height()
    if (width < 1 || height < 1) throw new Error("Immagine non caricata correttamente");

    // Definiamo l'mmagine di output
    var out = new cv.Matrix(height, width);

    // Convertiamo l'immagine di partenza in scala di grigi
    im.convertGrayscale();

    // Applichiamo l'algoritmo di Canny
    im_canny = im.copy();
    im_canny.canny(lowThresh, highThresh);
    im_canny.dilate(nIters);

    // Troviamo i contorni presenti nell'immagine
    contours = im_canny.findContours();

    // Cicliamo sui contorni
    for (i = 0; i < contours.size(); i++) {

        // Se non è dell'area minima definita non continuiamo ad elaborare questo contorno
        if (contours.area(i) < minArea) continue;

        // Tracciamo un poligono attorno al contorno trovato
        var arcLength = contours.arcLength(i, true);
        contours.approxPolyDP(i, 0.01 * arcLength, true);

        // In base al numero di angoli (quindi di lati) usiamo un colore diverso per i poligoni trovati
        switch (contours.cornerCount(i)) {
            case 3:
                out.drawContour(contours, i, GREEN);
                break;
            case 4:
                out.drawContour(contours, i, RED);
                break;
            default:
                out.drawContour(contours, i, WHITE);
        }
    }

    // Ruotiamo l'immagine, se necessario
    out.rotate(270);

    // Salviamo l'immagine
    out.save('./output/esempio-poligoni.jpg');
    console.log("Immagine salvata")
});
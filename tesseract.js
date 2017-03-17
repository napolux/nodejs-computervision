var tesseract = require('node-tesseract');

// Opzioni
var options = {
    l: 'ita'
};

// Riconoscimento del testo in qualsiasi linguaggio
tesseract.process("./immagini/esempio-tesseract.png", options, function(err, text) { 
    if(err) {
        // Si è verificato un errore nel caricamento o nell'elaborazione dell'immagine
        console.error(err);
    } else {
        // Stampiamo il testo trovato
        console.log("Il testo estratto dall'immagine è:\n\n" + text);
    }
});
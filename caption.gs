function updateCaptions() {

  // user input - prefix
  let abbildungInput = DocumentApp.getUi().prompt("Bitte gebe das Prefix für Abbildungen ein:");
  let tabelleInput = DocumentApp.getUi().prompt("Bitte gebe das Prefix für Tabellen ein:");
  const abbildungPrefix = abbildungInput.getResponseText();
  const tabellePrefix = tabelleInput.getResponseText();

  // Caption w/ hyphen
  // const abbildungRegex = new RegExp("^" + abbildungPrefix + "\\s+\\d+\\s*-\\s*");
  // const tabelleRegex = new RegExp("^" + tabelleRegex + "\\s+\\d+\\s*-\\s*");
  
  // Caption with hyphen
  const abbildungRegex = new RegExp("^" + abbildungPrefix + "\\s+\\d+\\s*-\\s*");
  const tabelleRegex = new RegExp("^" + tabellePrefix + "\\s+\\d+\\s*-\\s*");

  // get a list of all paragraphs in the document
  const paragraphs = DocumentApp.getActiveDocument().getBody().getParagraphs();
  
  // set start of counters to 1
  let figureCounter = 1;
  let tableCounter = 1;
  
  paragraphs.forEach(paragraph => {
    const heading = paragraph.getHeading();
    const text = paragraph.getText();

    let cleanedText = text
      .replace(abbildungRegex, "")
      .replace(tabelleRegex, "");
    
    // update figure captions
    if (heading === DocumentApp.ParagraphHeading.HEADING5) {
      paragraph.setText(`${abbildungPrefix} ${figureCounter} - ${cleanedText}`);
      figureCounter++;
    }
    
    // update table captions
    if (heading === DocumentApp.ParagraphHeading.HEADING6) {
      paragraph.setText(`${tabellePrefix} ${tableCounter} - ${cleanedText}`);
      tableCounter++;
    }
  });
}

function onOpen() {
  DocumentApp.getUi().createMenu('Abbildungsverzeichnis').addItem('Abb.- & Tabellenverzeichnis aktualisieren', 'updateCaptions').addToUi(); 
}

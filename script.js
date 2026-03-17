let phoneNumbers = [];

async function fetchPhoneNumbers() {
	try {
		const response = await fetch('phoneNumbers.json');
		const data = await response.json();
		phoneNumbers = data.sort((a, b) => a.name.localeCompare(b.name));
		console.log("Telefonnummern geladen.");
	} catch (error) {
		console.error("Fehler beim Laden der Telefonnummern:", error);
	}
}

let noteItems = JSON.parse(localStorage.getItem('noteItems')) || [];

const CALCULATOR_INPUT_IDS = [
	'behaelterOben', 'positionOben', 'behaelterUnten', 'positionUnten',
	'behaelterOben2', 'positionOben2', 'behaelterUnten2', 'positionUnten2',
	'nacharbeit', 'zusatzFront', 'zusatzHeck'
];

function checkMax(input) {
	if (parseInt(input.value) > 14) input.value = 14;
	if (parseInt(input.value) < 0) input.value = 0;
}

function saveInput(input) {
	localStorage.setItem(input.id, input.value);
}

function loadInputs() {
	CALCULATOR_INPUT_IDS.forEach(id => {
		const saved = localStorage.getItem(id);
		const inputElement = document.getElementById(id);

		if (saved !== null) {
			inputElement.value = saved;
		} else {
			if (id.startsWith('position')) {
				inputElement.value = 0;
			} else {
				inputElement.value = '';
			}
		}
	});
	berechneAlle();

	const currentTheme = localStorage.getItem('theme');
	if (currentTheme === 'light-mode') {
		document.body.classList.add('light-mode');
	}

	const savedBackgroundColor = localStorage.getItem('customBackgroundColor');
	if (savedBackgroundColor) {
		document.body.style.backgroundColor = savedBackgroundColor;
		document.querySelectorAll('.marquee-header-container').forEach(header => {
			header.style.backgroundColor = savedBackgroundColor;
		});
		document.getElementById('backgroundColorPicker').value = savedBackgroundColor;
	}

	const lastView = localStorage.getItem('activeView') || 'calculator';
	const viewToLoad = lastView === 'notesChecklist' ? 'notes' : lastView;
	showView(viewToLoad);

	renderNotes();
}

function resetCalculatorInputs() {
	if (confirm("Möchten du wirklich alle Eingaben löschen?")) {
		CALCULATOR_INPUT_IDS.forEach(id => {
			const inputElement = document.getElementById(id);
			inputElement.value = '';
			localStorage.removeItem(id);
		});

		document.getElementById('positionOben').value = 0;
		document.getElementById('positionUnten').value = 0;
		document.getElementById('positionOben2').value = 0;
		document.getElementById('positionUnten2').value = 0;

		berechneAlle();
		alert('Alle Eingaben wurden zurückgesetzt.');
	}
}

function berechneDifferenz(idOben, idPosOben, idUnten, idPosUnten, idErgebnis, idZusatz) {
	let behOben = parseInt(document.getElementById(idOben).value) || 0;
	let posOben = parseInt(document.getElementById(idPosOben).value) || 0;
	let behUnten = parseInt(document.getElementById(idUnten).value) || 0;
	let posUnten = parseInt(document.getElementById(idPosUnten).value) || 0;
	let zusatz = parseInt(document.getElementById(idZusatz).value) || 0;

	let gesamtOben = behOben * 14 + posOben;
	let gesamtUnten = behUnten * 14 + posUnten;
	let differenz = gesamtUnten - gesamtOben + zusatz;

	document.getElementById(idErgebnis).textContent = differenz >= 0 ? differenz : 0;
}

function berechneAlle() {
	berechneDifferenz('behaelterOben', 'positionOben', 'behaelterUnten', 'positionUnten', 'ergebnis', 'zusatzFront');
	berechneDifferenz('behaelterOben2', 'positionOben2', 'behaelterUnten2', 'positionUnten2', 'ergebnis2', 'zusatzHeck');
	berechneGesamtanzahl();
	berechneNacharbeitProzent();
}

function berechneGesamtanzahl() {
	let ergebnisFront = parseInt(document.getElementById('ergebnis').textContent) || 0;
	let ergebnisHeck = parseInt(document.getElementById('ergebnis2').textContent) || 0;
	let gesamtanzahl = (ergebnisFront + ergebnisHeck) * 2;
	document.getElementById('gesamtanzahl').textContent = gesamtanzahl;
}

function berechneNacharbeitProzent() {
	let nacharbeit = parseInt(document.getElementById('nacharbeit').value) || 0;
	let gesamtanzahl = parseInt(document.getElementById('gesamtanzahl').textContent) || 0;
	let nacharbeitProzent = gesamtanzahl > 0 ? (nacharbeit * 100 / gesamtanzahl).toFixed(2) : 0;
	document.getElementById('nacharbeitProzent').textContent = nacharbeitProzent + '%';
}

function shareResults() {
    const front = document.getElementById('ergebnis').textContent;
    const heck = document.getElementById('ergebnis2').textContent;
    const gesamt = document.getElementById('gesamtanzahl').textContent;
    const text = `Behälter-Kalkulation:\nFront: ${front}\nHeck: ${heck}\nGesamtanzahl: ${gesamt}`;

    if (navigator.share) {
        navigator.share({ title: 'Kalkulationsergebnis', text: text }).catch(console.error);
    } else {
        navigator.clipboard.writeText(text);
        alert('Ergebnisse in die Zwischenablage kopiert!');
    }
}

function toggleColors() {
	document.body.classList.toggle('light-mode');
	if (document.body.classList.contains('light-mode')) {
		localStorage.setItem('theme', 'light-mode');
	} else {
		localStorage.setItem('theme', 'dark-mode');
	}
	document.body.style.backgroundColor = '';
	document.querySelectorAll('.marquee-header-container').forEach(header => {
		header.style.backgroundColor = '';
	});
	document.getElementById('backgroundColorPicker').value = '#000000';
	localStorage.removeItem('customBackgroundColor');
}

function handleColorChange(event) {
	const selectedColor = event.target.value;
	document.body.style.backgroundColor = selectedColor;
	document.querySelectorAll('.marquee-header-container').forEach(header => {
		header.style.backgroundColor = selectedColor;
	});
	document.body.classList.remove('light-mode');
	localStorage.removeItem('theme');
	localStorage.setItem('customBackgroundColor', selectedColor);
}

function renderPhoneList(filter = '') {
	const searchResultsDiv = document.getElementById('phoneListSearchResults');
	const allNumbersDiv = document.getElementById('phoneListAllNumbers');
	searchResultsDiv.innerHTML = '';

	const filteredNumbers = phoneNumbers.filter(contact =>
		contact.name.toLowerCase().includes(filter.toLowerCase()) ||
		contact.number.includes(filter)
	);

	if (filter) {
		allNumbersDiv.classList.add('hidden');
		if (filteredNumbers.length > 0) {
			filteredNumbers.forEach(contact => {
				const div = document.createElement('div');
				div.classList.add('phone-list-item');
				div.innerHTML = `<span class="name">${contact.name}:</span> <span class="number">${contact.number}</span>`;
				div.addEventListener('click', () => openDialog(contact.name, contact.number));
				searchResultsDiv.appendChild(div);
			});
		} else {
			searchResultsDiv.innerHTML = '<p class="no-results">Keine Ergebnisse gefunden.</p>';
		}
	} else {
		searchResultsDiv.innerHTML = '';
		if (!allNumbersDiv.classList.contains('hidden')) {
			allNumbersDiv.innerHTML = '';
			phoneNumbers.forEach(contact => {
				const div = document.createElement('div');
				div.classList.add('phone-list-item');
				div.innerHTML = `<span class="name">${contact.name}:</span> <span class="number">${contact.number}</span>`;
				div.addEventListener('click', () => openDialog(contact.name, contact.number));
				allNumbersDiv.appendChild(div);
			});
		}
	}
}

function showView(view) {
	const views = ['calculatorView', 'phoneListView', 'notesView', 'qrGeneratorView'];
	views.forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.add('hidden');
	});

	const navButtons = ['navCalcButton', 'navPhoneButton', 'navNotesButton', 'navQRButton'];
	navButtons.forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.remove('active-nav');
	});

	if (view === 'calculator') {
		document.getElementById('calculatorView').classList.remove('hidden');
		document.getElementById('navCalcButton').classList.add('active-nav');
	} else if (view === 'phoneList') {
		document.getElementById('phoneListView').classList.remove('hidden');
		document.getElementById('navPhoneButton').classList.add('active-nav');
	} else if (view === 'notes') {
		document.getElementById('notesView').classList.remove('hidden');
		document.getElementById('navNotesButton').classList.add('active-nav');
	} else if (view === 'qrGenerator') {
		document.getElementById('qrGeneratorView').classList.remove('hidden');
		document.getElementById('navQRButton').classList.add('active-nav');
	}

	localStorage.setItem('activeView', view);
}

function openDialog(name, number) {
	const dialog = document.getElementById('phoneNumberDialog');
	document.getElementById('dialogContactName').textContent = name;
	const fullNumber = DIAL_PREFIX + number;
	document.getElementById('dialogContactNumber').textContent = fullNumber;
	currentFullPhoneNumber = fullNumber;
	dialog.classList.add('show');
}

function closeDialog() {
	document.getElementById('phoneNumberDialog').classList.remove('show');
}

function copyNumber() {
	if (currentFullPhoneNumber) {
		navigator.clipboard.writeText(currentFullPhoneNumber).then(() => {
			alert('Nummer kopiert: ' + currentFullPhoneNumber);
			closeDialog();
		}).catch(err => {
			console.error('Kopieren fehlgeschlagen:', err);
			alert('Kopieren der Nummer fehlgeschlagen.');
		});
	}
}

function callNumber() {
	if (currentFullPhoneNumber) {
		window.location.href = 'tel:' + currentFullPhoneNumber;
		closeDialog();
	}
}

function toggleAllContacts() {
	const allNumbersDiv = document.getElementById('phoneListAllNumbers');
	const phoneSearchInput = document.getElementById('phoneSearch');
	const searchResultsDiv = document.getElementById('phoneListSearchResults');

	if (allNumbersDiv.classList.contains('hidden')) {
		allNumbersDiv.classList.remove('hidden');
		searchResultsDiv.innerHTML = '';
		phoneSearchInput.value = '';
		renderPhoneList();
	} else {
		allNumbersDiv.classList.add('hidden');
	}
}

function addNoteItem() {
	const input = document.getElementById('noteInput');
	const photoInput = document.getElementById('notePhotoInput');
	const text = input.value.trim();
	const photoFile = photoInput.files[0];

	if (text === '') {
		alert('Bitte geben Sie einen Text für die Notiz ein.');
		return;
	}

	const newItem = {
		id: Date.now(),
		text: text,
		timestamp: new Date().toLocaleString('de-DE'),
		photo: null
	};

	if (photoFile) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newItem.photo = e.target.result;
			noteItems.push(newItem);
			saveNotes();
			renderNotes();
			input.value = '';
			photoInput.value = '';
		};
		reader.readAsDataURL(photoFile);
	} else {
		noteItems.push(newItem);
		saveNotes();
		renderNotes();
		input.value = '';
		photoInput.value = '';
	}
}

function saveNotes() {
	localStorage.setItem('noteItems', JSON.stringify(noteItems));
}

function renderNotes() {
	const notesDiv = document.getElementById('noteItems');
	notesDiv.innerHTML = '';
	
	const sortedItems = [...noteItems].reverse();
	
	sortedItems.forEach(item => {
		const div = document.createElement('div');
		div.classList.add('note-item');
		
		const formattedText = item.text.replace(/\n/g, '<br>');
		
		div.innerHTML = `
            <div class="note-content">
                <small>${item.timestamp || ''}</small><br>
                <span>${formattedText}</span>
            </div>
            <div class="item-actions">
                ${item.photo ? `<button class="view-photo" onclick="openImageDialog('${item.photo}')">Foto ansehen</button>` : ''}
                <button onclick="editNoteItem(${item.id})">Ändern</button>
                <button onclick="deleteNoteItem(${item.id})">Löschen</button>
            </div>
        `;
		notesDiv.appendChild(div);
	});
}

function editNoteItem(id) {
    const item = noteItems.find(i => i.id === id);
    const newText = prompt('Notiz bearbeiten:', item.text);
    if (newText !== null) {
        item.text = newText;
        saveNotes();
        renderNotes();
    }
}

function deleteNoteItem(id) {
	if (confirm('Möchten Sie diese Notiz wirklich löschen?')) {
		noteItems = noteItems.filter(item => item.id !== id);
		saveNotes();
		renderNotes();
	}
}

function openImageDialog(imageData) {
	const dialog = document.getElementById('imageDialog');
	const img = document.getElementById('dialogImage');
	img.src = imageData;
	dialog.classList.add('show');
}

function closeImageDialog() {
	document.getElementById('imageDialog').classList.remove('show');
	setTimeout(() => { document.getElementById('dialogImage').src = ''; }, 200);
}


/* --- Angepasste QR Scanner Logik --- */
let html5QrcodeScanner = null;
let isFlashlightOn = false;

function openScanner() {
    const dialog = document.getElementById('scannerDialog');
    dialog.classList.add('show');
    document.getElementById('scanner-status').textContent = "Kamera wird gestartet...";
    
    // Verstecke die Taschenlampe standardmäßig, bis wir sicher sind, dass das Gerät sie unterstützt
    const torchBtn = document.getElementById('torchButton');
    torchBtn.style.display = 'none';
    torchBtn.innerText = "🔦 Taschenlampe An";
    isFlashlightOn = false;

    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear();
    }

    // Nutze native Barcode Detector API falls verfügbar (Hardware-Beschleunigung)
    html5QrcodeScanner = new Html5Qrcode("reader", { 
        experimentalFeatures: {
            useBarCodeDetectorIfSupported: true 
        }
    });

    // Dynamische Berechnung der Scan-Box für bessere Erkennung
    const config = { 
        fps: 25, 
        qrbox: (viewfinderWidth, viewfinderHeight) => {
            // Breite Box für Barcodes, nutzt 80% der Displaybreite
            const width = viewfinderWidth * 0.8;
            const height = 140; 
            return { width: width, height: height };
        },
        aspectRatio: 1.0 
    };

    html5QrcodeScanner.start(
        { 
            facingMode: "environment",
            // Höhere Auflösung ist entscheidend für feine Barcodes
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        },
        config,
        onScanSuccess,
        onScanFailure
    ).then(() => {
        // Prüfen, ob die Kamera eine Taschenlampe hat und blende dann den Button ein
        setTimeout(() => {
            const track = html5QrcodeScanner.getRunningTrackCameraCapabilities();
            if (track && track.torchFeature().isSupported()) {
                torchBtn.style.display = 'block';
            }
        }, 500); // Kurz warten, bis der Videostream initialisiert ist
    }).catch((err) => {
        document.getElementById('scanner-status').textContent = "Fehler beim Kamerazugriff.";
        console.error("Camera error:", err);
    });
}

function toggleFlashlight() {
    if (html5QrcodeScanner) {
        isFlashlightOn = !isFlashlightOn;
        const torchBtn = document.getElementById('torchButton');
        
        html5QrcodeScanner.applyVideoConstraints({
            advanced: [{ torch: isFlashlightOn }]
        }).then(() => {
            torchBtn.innerText = isFlashlightOn ? "🔦 Taschenlampe Aus" : "🔦 Taschenlampe An";
        }).catch(err => {
            console.error("Taschenlampe konnte nicht aktiviert werden", err);
            alert("Taschenlampe wird von diesem Gerät / Browser nicht unterstützt.");
            isFlashlightOn = !isFlashlightOn; // Status zurücksetzen
        });
    }
}

function closeScanner() {
    const dialog = document.getElementById('scannerDialog');
    dialog.classList.remove('show');
    
    if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
        // Taschenlampe sicherheitshalber ausschalten
        if (isFlashlightOn) toggleFlashlight();

        html5QrcodeScanner.stop().then(() => {
            html5QrcodeScanner.clear();
        }).catch(err => {
            console.error("Fehler beim Stoppen des Scanners", err);
        });
    }
}

function onScanSuccess(decodedText, decodedResult) {
    const noteInput = document.getElementById('noteInput');
    
    if (noteInput.value.trim() !== '') {
        noteInput.value += '\n[Gescannt]: ' + decodedText;
    } else {
        noteInput.value = '[Gescannt]: ' + decodedText;
    }
    
    closeScanner();
    document.getElementById('navNotesButton').classList.add('active-nav');
}

function onScanFailure(error) {
    // Wird gefeuert, wenn kein Code im Bild ist.
}


/* --- QR Generator Logik --- */
function generateQRCode() {
    const text = document.getElementById('qrGenerateInput').value.trim();
    const qrDisplay = document.getElementById('qrcodeDisplay');
    
    if (text === "") {
        alert("Bitte gib einen Text oder eine Sachnummer ein, um einen QR-Code zu erstellen.");
        return;
    }

    qrDisplay.innerHTML = "";
    qrDisplay.classList.add('show');

    new QRCode(qrDisplay, {
        text: text,
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

// Event Listener
window.onload = () => {
	fetchPhoneNumbers();
	loadInputs();
	document.getElementById('backgroundColorPicker').addEventListener('input', handleColorChange);
	document.getElementById('phoneSearch').addEventListener('input', (e) => renderPhoneList(e.target.value));
	document.getElementById('toggleAllContactsHeading').addEventListener('click', toggleAllContacts);
};

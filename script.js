Const phoneNumbers = [
	{ name: "Abnahme Flex Line eQ", number: "5596" },
	{ name: "Achtnicht Daniel", number: "4576" },
	{ name: "Anthofer Maximilian", number: "5410" }
].sort((a, b) => a.name.localeCompare(b.name));

const DIAL_PREFIX = "0840277";

let currentFullPhoneNumber = '';
let checklistItems = JSON.parse(localStorage.getItem('checklistItems')) || [];
let noteItems = JSON.parse(localStorage.getItem('noteItems')) || [];

// Liste aller IDs der Calculator-Eingabefelder, die resettet werden sollen
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
			// Setzt Standardwerte für Positionsfelder, wenn nichts gespeichert ist
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
	showView(lastView);

	renderChecklist();
	renderNotes();
	scheduleNotifications(); // Benachrichtigungen beim Laden planen
}

// NEUE FUNKTION: Setzt alle Calculator-Eingaben zurück
function resetCalculatorInputs() {
	if (confirm("Möchten Sie wirklich alle Eingaben des Rechners (Behälter, Positionen, Zusatz, Nacharbeit) löschen?")) {
		CALCULATOR_INPUT_IDS.forEach(id => {
			const inputElement = document.getElementById(id);
			inputElement.value = ''; // Eingabefeld leeren
			localStorage.removeItem(id); // Eintrag aus dem localStorage entfernen
		});

		// Setze die Positionsfelder explizit auf 0 (wie in HTML definiert)
		document.getElementById('positionOben').value = 0;
		document.getElementById('positionUnten').value = 0;
		document.getElementById('positionOben2').value = 0;
		document.getElementById('positionUnten2').value = 0;

		// Erzwungenes Neuladen der Berechnung und Anzeige
		berechneAlle();
		alert('Rechnerdaten zurückgesetzt.');
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
		allNumbersDiv.style.display = 'none';
		if (filteredNumbers.length > 0) {
			filteredNumbers.forEach(contact => {
				const div = document.createElement('div');
				div.classList.add('phone-list-item');
				div.innerHTML = `<span class="name">${contact.name}:</span> <span class="number">${contact.number}</span>`;
				div.addEventListener('click', () => openDialog(contact.name, contact.number));
				searchResultsDiv.appendChild(div);
			});
		} else {
			searchResultsDiv.innerHTML = '<p style="color: #888;">Keine Ergebnisse gefunden.</p>';
		}
	} else {
		searchResultsDiv.innerHTML = '';
		if (allNumbersDiv.style.display === 'block') {
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
	const calculatorView = document.getElementById('calculatorView');
	const phoneListView = document.getElementById('phoneListView');
	const notesChecklistView = document.getElementById('notesChecklistView');

	const navCalcButton = document.getElementById('navCalcButton');
	const navPhoneButton = document.getElementById('navPhoneButton');
	const navNotesButton = document.getElementById('navNotesButton');

	// Alle Views ausblenden
	calculatorView.style.display = 'none';
	phoneListView.style.display = 'none';
	notesChecklistView.style.display = 'none';

	// Alle Navigationsbuttons anzeigen
	navCalcButton.style.display = 'block';
	navPhoneButton.style.display = 'block';
	navNotesButton.style.display = 'block';

	// Gewünschten View anzeigen und entsprechenden Button ausblenden
	if (view === 'calculator') {
		calculatorView.style.display = 'block';
		navCalcButton.style.display = 'none';
	} else if (view === 'phoneList') {
		phoneListView.style.display = 'block';
		document.getElementById('phoneListAllNumbers').style.display = 'none';
		document.getElementById('phoneSearch').value = '';
		document.getElementById('phoneListSearchResults').innerHTML = '';
		navPhoneButton.style.display = 'none';
	} else if (view === 'notesChecklist') {
		notesChecklistView.style.display = 'block';
		showTab('checklist'); // Standardmäßig Checkliste anzeigen
		navNotesButton.style.display = 'none';
	}
	localStorage.setItem('activeView', view);
}

function openDialog(name, number) {
	const dialog = document.getElementById('phoneNumberDialog');
	document.getElementById('dialogContactName').textContent = name;

	const fullNumber = DIAL_PREFIX + number;
	document.getElementById('dialogContactNumber').textContent = fullNumber;

	currentFullPhoneNumber = fullNumber;
	dialog.style.display = 'flex';
}

function closeDialog() {
	document.getElementById('phoneNumberDialog').style.display = 'none';
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

// Function to toggle visibility of 'Alle Kontakte'
function toggleAllContacts() {
	const allNumbersDiv = document.getElementById('phoneListAllNumbers');
	const phoneSearchInput = document.getElementById('phoneSearch');
	const searchResultsDiv = document.getElementById('phoneListSearchResults');

	if (allNumbersDiv.style.display === 'none' || allNumbersDiv.style.display === '') {
		allNumbersDiv.style.display = 'block';
		searchResultsDiv.innerHTML = '';
		phoneSearchInput.value = '';
		renderPhoneList();
	} else {
		allNumbersDiv.style.display = 'none';
	}
}

// --- NEUE FUNKTIONEN FÜR NOTIZEN UND CHECKLISTEN ---

function showTab(tabId) {
	const tabs = document.querySelectorAll('.tab-content');
	tabs.forEach(tab => tab.classList.remove('active'));

	const buttons = document.querySelectorAll('.tab-button');
	buttons.forEach(button => button.classList.remove('active'));

	document.getElementById(tabId + 'Tab').classList.add('active');
	document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function addChecklistItem() {
	const input = document.getElementById('checklistInput');
	const timeInput = document.getElementById('checklistTime');
	const photoInput = document.getElementById('checklistPhotoInput');
	const text = input.value.trim();
	const time = timeInput.value;
	const photoFile = photoInput.files[0];

	if (text === '') {
		alert('Bitte geben Sie einen Text für den Checklistenpunkt ein.');
		return;
	}

	const newItem = {
		id: Date.now(),
		text: text,
		checked: false,
		time: time,
		photo: null // Wird später als Base64-String gespeichert
	};

	if (photoFile) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newItem.photo = e.target.result;
			checklistItems.push(newItem);
			saveChecklist();
			renderChecklist();
			scheduleNotificationForChecklistItem(newItem);
			input.value = '';
			timeInput.value = '';
			photoInput.value = ''; // Dateiauswahl zurücksetzen
		};
		reader.readAsDataURL(photoFile);
	} else {
		checklistItems.push(newItem);
		saveChecklist();
		renderChecklist();
		scheduleNotificationForChecklistItem(newItem);
		input.value = '';
		timeInput.value = '';
		photoInput.value = '';
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

function saveChecklist() {
	localStorage.setItem('checklistItems', JSON.stringify(checklistItems));
}

function saveNotes() {
	localStorage.setItem('noteItems', JSON.stringify(noteItems));
}

function renderChecklist() {
	const checklistDiv = document.getElementById('checklistItems');
	checklistDiv.innerHTML = '';
	checklistItems.forEach(item => {
		const div = document.createElement('div');
		div.classList.add('checklist-item');
		if (item.checked) {
			div.style.textDecoration = 'line-through';
			div.style.opacity = '0.7';
		}
		div.innerHTML = `
            <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleChecklistItem(${item.id})">
            <span>${item.text}</span>
            ${item.time ? `<span class="timestamp">${item.time} Uhr</span>` : ''}
            <div class="item-actions">
                ${item.photo ? `<button class="view-photo" onclick="openImageDialog('${item.photo}')">Foto ansehen</button>` : ''}
                <button onclick="deleteChecklistItem(${item.id})">Löschen</button>
            </div>
        `;
		checklistDiv.appendChild(div);
	});
}

function renderNotes() {
	const notesDiv = document.getElementById('noteItems');
	notesDiv.innerHTML = '';
	noteItems.forEach(item => {
		const div = document.createElement('div');
		div.classList.add('note-item');
		div.innerHTML = `
            <span>${item.text}</span>
            <div class="item-actions">
                ${item.photo ? `<button class="view-photo" onclick="openImageDialog('${item.photo}')">Foto ansehen</button>` : ''}
                <button onclick="deleteNoteItem(${item.id})">Löschen</button>
            </div>
        `;
		notesDiv.appendChild(div);
	});
}

function toggleChecklistItem(id) {
	const item = checklistItems.find(item => item.id === id);
	if (item) {
		item.checked = !item.checked;
		saveChecklist();
		renderChecklist();
	}
}

function deleteChecklistItem(id) {
	if (confirm('Möchten Sie diesen Checklistenpunkt wirklich löschen?')) {
		checklistItems = checklistItems.filter(item => item.id !== id);
		saveChecklist();
		renderChecklist();
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
	dialog.style.display = 'flex';
}

function closeImageDialog() {
	document.getElementById('imageDialog').style.display = 'none';
	document.getElementById('dialogImage').src = ''; // Bild zurücksetzen
}

// Benachrichtigungslogik
function scheduleNotificationForChecklistItem(item) {
	if (!item.checked && item.time) {
		const [hours, minutes] = item.time.split(':').map(Number);
		const now = new Date();
		const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

		// Wenn die Zeit heute schon vorbei ist, für morgen planen
		if (notificationTime.getTime() <= now.getTime()) {
			notificationTime.setDate(notificationTime.getDate() + 1);
		}

		const delay = notificationTime.getTime() - now.getTime();

		if (delay > 0) {
			setTimeout(() => {
				// Überprüfen, ob das Element noch existiert und nicht als erledigt markiert ist
				const currentItem = checklistItems.find(i => i.id === item.id);
				if (currentItem && !currentItem.checked) {
					if (Notification.permission === 'granted') {
						new Notification('Erinnerung: Checklistenpunkt', {
							body: `"${currentItem.text}" ist noch nicht erledigt!`,
							icon: 'ios/192.png'
						});
					}
				}
			}, delay);
		}
	}
}

function scheduleNotifications() {
	checklistItems.forEach(item => {
		scheduleNotificationForChecklistItem(item);
	});
}


// Event Listener
window.onload = () => {
	loadInputs();
	document.getElementById('backgroundColorPicker').addEventListener('input', handleColorChange);
	document.getElementById('phoneSearch').addEventListener('input', (e) => renderPhoneList(e.target.value));
	document.getElementById('toggleAllContactsHeading').addEventListener('click', toggleAllContacts);

	// Initialisiere die Notizen/Checklisten-Ansicht
	document.getElementById('checklistInput').addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			addChecklistItem();
		}
	});
	document.getElementById('noteInput').addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			addNoteItem();
		}
	});
};
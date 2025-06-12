const phoneNumbers = [
    { name: "Abnahme Flex Line eQ", number: "5596" },
    { name: "Achtnicht Daniel", number: "4576" },
    { name: "Anthofer Maximilian", number: "5410" },
    { name: "Aufnahme Flex Line eQ", number: "5595" },
    { name: "AZUBI Magazin", number: "4448" },
    { name: "Azubi I-Tafel", number: "4747" },
    { name: "Balaba Alexander S1", number: "4051" },
    { name: "Behrendt Sebastian", number: "4717" },
    { name: "Bereich Spritzerei", number: "4713" },
    { name: "Bereiche KL1 bis KL5", number: "4977" },
    { name: "Bereiche KL1 bis KL5", number: "4978" },
    { name: "Binkowski Rainer", number: "4624" },
    { name: "Böhm Konrad", number: "4901" },
    { name: "Bool Waldemar S3", number: "4056" },
    { name: "Brandl Dieter", number: "4811" },
    { name: "Brunner Arthur", number: "4073" },
    { name: "Budarin Alex", number: "5125" },
    { name: "Chumakov Sergej", number: "4380" },
    { name: "Dechant Christian", number: "5419" },
    { name: "Dürmeier Bernhard", number: "4832" },
    { name: "Elektriker U10 / Frimo 1", number: "4715" },
    { name: "Elektriker U1x", number: "4793" },
    { name: "Euringer Kurt", number: "4716" },
    { name: "Felder Sergej", number: "4053" },
    { name: "Feuerwehr Schichtleiter", number: "5426" },
    { name: "Fischer David S2", number: "4858" },
    { name: "Forstner Florian", number: "4800" },
    { name: "Forstner Sigi", number: "4923" },
    { name: "Fritsch Markus", number: "4922" },
    { name: "Früchtl Jörg", number: "4907" },
    { name: "Fuchs Siglinde", number: "4667" },
    { name: "Gallmaier Alfons", number: "4505" },
    { name: "Gammel - Roith.", number: "4310" },
    { name: "Gonda Slawomir S3", number: "4568" },
    { name: "Greb Johann", number: "4017" },
    { name: "Grünert Stefan", number: "4912" },
    { name: "Hecker Florian", number: "4010" },
    { name: "Hegner Markus", number: "4697" },
    { name: "Hermann Gerhard", number: "4335" },
    { name: "Herzo Karl S2", number: "5241" },
    { name: "Hilz Albert", number: "4975" },
    { name: "Höfer Michael", number: "4077" },
    { name: "Hofmann Sven", number: "4260" },
    { name: "Hohenester Peter S1", number: "4597" },
    { name: "Hopf Rainer", number: "4257" },
    { name: "Hoyer Manfred", number: "4940" },
    { name: "Huber Albert", number: "4908" },
    { name: "Huber Markus", "number": "4678" },
    { name: "Hüttner Stefan", number: "5135" },
    { name: "IT AZUBI", number: "4747" },
    { name: "Jakolev Andreas S2", number: "5563" },
    { name: "JIT Springer", number: "4602" },
    { name: "Kaufteillager", number: "4288" },
    { name: "Kilich Furkan", number: "5253" },
    { name: "KL 1+2 Folie Springer", number: "4295" },
    { name: "KL 1+2 Kontrolle Bühne", number: "4275" },
    { name: "Koller Thomas", number: "4910" },
    { name: "Kramschuster Anton", number: "4643" },
    { name: "Krojer Anton", number: "4738" },
    { name: "Krzoska Klaus", number: "4527" },
    { name: "Kügel Richard", number: "4339" },
    { name: "Leitstand L1", number: "4618" },
    { name: "Leyk Michael", number: "4869" },
    { name: "Liedl Jürgen", number: "4797" },
    { name: "Limmer Markus", number: "4740" },
    { name: "Malkow Vitali", number: "5103" },
    { name: "Mayer Johannes", number: "4434" },
    { name: "Meier Wolfgang", number: "4707" },
    { name: "Michel Andreas S1", number: "4001" },
    { name: "Mies Markus S1", number: "4099" },
    { name: "Mittermeier", number: "5438" },
    { name: "Müller Alfons", number: "4914" },
    { name: "Obermeier Simon", number: "4860" },
    { name: "Olber Erik", number: "4093" },
    { name: "Pforte", number: "4260" },
    { name: "Reger Dominic", number: "5086" },
    { name: "Rottmeier Robert", number: "4390" },
    { name: "Rösel Sandra", number: "4578" },
    { name: "Rußwurm Hemut", number: "4874" },
    { name: "Rußwurm Roland S2", number: "5530" },
    { name: "Rusch Maria", number: "4813" },
    { name: "Schierlinger Daniel", number: "4459" },
    { name: "Schierlinger Sebastian", number: "4422" },
    { name: "Schlosser Werkstatt", number: "4783" },
    { name: "Schlosser Werkstatt", number: "4784" },
    { name: "Schmid Dominik S2", number: "4482" },
    { name: "Schroedl Michael", number: "4878" },
    { name: "Schulz Stefan", number: "5077" },
    { name: "Schwaiger Franz", number: "4020" },
    { name: "Sedlmeier Dominik", number: "4905" },
    { name: "Sieckmann Walter", number: "4644" },
    { name: "Simmerl Klaus", number: "4768" },
    { name: "Singer Alexander", number: "4709" },
    { name: "Springer AAL Schäumen", number: "4000" },
    { name: "Springer F39", number: "4065" },
    { name: "Springer I-Tafel Montage", number: "4935" },
    { name: "Springer I-Tafel Schäumen", number: "4494" },
    { name: "Springer I-Tafel Slush neu", number: "4939" },
    { name: "Springer Frimo 4", number: "5122" },
    { name: "Springer Kiefel", number: "5216" },
    { name: "Springer Q6", number: "4064" },
    { name: "Springer U10_1", number: "4601" },
    { name: "Springer U10_2", number: "4602" },
    { name: "Springer U1x Endmontage", number: "5586" },
    { name: "Springer U1x Vormontage", number: "5583" },
    { name: "Tereschenko Alex", number: "5560" },
    { name: "Todt Herbert", number: "5335" },
    { name: "Trübswetter Stefan", number: "4906" },
    { name: "Umschüler", number: "4076" },
    { name: "Vogt Franz", number: "4611" },
    { name: "Vorarbeiter BMW U1X", number: "5562" },
    { name: "Vorarbeiter I-Tafel", number: "4700" },
    { name: "Vorarbeiter MAN + L 4+5", number: "5121" },
    { name: "Vorarbeiter Q6", number: "4830" },
    { name: "Vorarbeiter U10", number: "4508" },
    { name: "Vorarbeiter U1x", number: "4098" },
    { name: "Weber Antje", number: "4131" },
    { name: "Weininger Franz", number: "4890" },
    { name: "Werksärztin Dr. Pietsch", number: "4250" },
    { name: "Werkzeugbau", number: "4777" },
    { name: "Werkzeugbau", number: "4888" },
    { name: "Winkler Theresa", number: "4266" },
    { name: "Ziegler Michael S3", number: "4735" },
    { name: "Zinner Michael", number: "5183" },
    { name: "Zola Nico", number: "6560" }
].sort((a, b) => a.name.localeCompare(b.name));

const DIAL_PREFIX = "0840277";

let currentFullPhoneNumber = '';
let checklistItems = JSON.parse(localStorage.getItem('checklistItems')) || [];
let noteItems = JSON.parse(localStorage.getItem('noteItems')) || [];

function checkMax(input) {
  if (parseInt(input.value) > 14) input.value = 14;
  if (parseInt(input.value) < 0) input.value = 0;
}

function saveInput(input) {
  localStorage.setItem(input.id, input.value);
}

function loadInputs() {
  const ids = [
    'behaelterOben', 'positionOben', 'behaelterUnten', 'positionUnten',
    'behaelterOben2', 'positionOben2', 'behaelterUnten2', 'positionUnten2',
    'nacharbeit', 'zusatzFront', 'zusatzHeck'
  ];
  ids.forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved !== null) {
      document.getElementById(id).value = saved;
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
  berechneDifferenz('behaelterOben','positionOben','behaelterUnten','positionUnten','ergebnis','zusatzFront');
  berechneDifferenz('behaelterOben2','positionOben2','behaelterUnten2','positionUnten2','ergebnis2','zusatzHeck');
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
    const notesChecklistView = document.getElementById('notesChecklistView'); // Neuer View

    calculatorView.style.display = 'none';
    phoneListView.style.display = 'none';
    notesChecklistView.style.display = 'none'; // Neuen View ausblenden

    if (view === 'calculator') {
        calculatorView.style.display = 'block';
    } else if (view === 'phoneList') {
        phoneListView.style.display = 'block';
        document.getElementById('phoneListAllNumbers').style.display = 'none';
        document.getElementById('phoneSearch').value = '';
        document.getElementById('phoneListSearchResults').innerHTML = '';
    } else if (view === 'notesChecklist') { // Neuer View
        notesChecklistView.style.display = 'block';
        showTab('checklist'); // Standardmäßig Checkliste anzeigen
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

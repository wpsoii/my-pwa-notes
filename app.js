document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');

    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const listItem = document.createElement('li');
            listItem.textContent = noteText;
            notesList.appendChild(listItem);
            noteInput.value = '';
        }
    });
});

function save_options() {
    var selectedCount = document.getElementById('countOption').value;
    chrome.storage.sync.set({
        numResults: selectedCount,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        numResults: 3,
    }, function(items) {
        document.getElementById('countOption').value = items.numResults;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
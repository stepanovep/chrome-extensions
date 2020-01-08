document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#find').addEventListener('click', onclick);

    function onclick() {
        let rating = document.getElementById('rating').value;
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                let payload = {
                    'message_id': 'find',
                    'rating': rating
                };
                chrome.tabs.sendMessage(tabs[0].id, payload);
            });

        let status = document.getElementById('status');
        status.textContent = 'in progress...';
    }
});
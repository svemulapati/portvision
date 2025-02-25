document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('portScanForm');
    const stopButton = document.getElementById('stopButton');
    let scanning = false;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Form submitted');

        const ipAddress = document.getElementById('ipAddress').value;
        const startPort = document.getElementById('startPort').value || 1;
        const endPort = document.getElementById('endPort').value || 1024;

        if (!ipAddress) {
            alert('Please enter a valid IP address.');
            return;
        }

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = 'Scanning...';
        scanning = true;
        stopButton.style.display = 'inline-block';

        try {
            console.log('Sending request to /scan with data:', { ip: ipAddress, start_port: startPort, end_port: endPort });
            const response = await fetch('http://127.0.0.1:5000/scan', { // Ensure the correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip: ipAddress, start_port: startPort, end_port: endPort }),
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access blocked by the server.');
                } else if (response.status === 500) {
                    throw new Error('Internal server error.');
                } else {
                    throw new Error('Network response was not ok');
                }
            }

            const data = await response.json();
            console.log('Received response:', data);
            displayResults(data);
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
            console.error('Error:', error);
        } finally {
            scanning = false;
            stopButton.style.display = 'none';
        }
    });

    stopButton.addEventListener('click', async function() {
        if (scanning) {
            console.log('Stopping scan');
            await fetch('http://127.0.0.1:5000/stop', { method: 'POST' });
            scanning = false;
            stopButton.style.display = 'none';
            document.getElementById('results').innerHTML = 'Scan stopped.';
        }
    });
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const openPorts = data.ports.filter(port => port.state === 'open');

    if (openPorts.length === 0) {
        resultsContainer.innerHTML = '<p>No open ports found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'results-table';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Port Number', 'Protocol', 'State', 'Service', 'Version'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    openPorts.forEach(portInfo => {
        const row = document.createElement('tr');
        Object.values(portInfo).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsContainer.appendChild(table);
}
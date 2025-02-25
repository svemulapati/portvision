from flask import Flask, request, jsonify
from flask_cors import CORS
from scanner import PortScanner
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all origins
scanner = PortScanner()

logging.basicConfig(level=logging.DEBUG)

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    ip_address = data.get('ip')
    start_port = int(data.get('start_port', 1))  # Convert to integer
    end_port = int(data.get('end_port', 1024))   # Convert to integer

    app.logger.debug(f"Scanning IP: {ip_address}, Ports: {start_port}-{end_port}")

    try:
        results = scanner.scan_ports(ip_address, start_port, end_port)
        app.logger.debug(f"Scan results: {results}")
        return jsonify(results)
    except Exception as e:
        app.logger.error(f"Error scanning ports: {e}", exc_info=True)
        return jsonify({'error': 'Error scanning ports'}), 500

@app.route('/stop', methods=['POST'])
def stop():
    scanner.stop()
    return jsonify({'status': 'Scan stopped'})

if __name__ == '__main__':
    app.run(debug=True)
import socket

class PortScanner:
    def __init__(self):
        self.stop_scan = False

    def scan_ports(self, ip, start_port, end_port):
        self.stop_scan = False
        ports = []
        for port in range(start_port, end_port + 1):
            if self.stop_scan:
                break
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((ip, port))
            state = 'open' if result == 0 else 'closed'
            service = self.get_service_name(port) if state == 'open' else 'N/A'
            ports.append({
                'port': port,
                'protocol': 'TCP',
                'state': state,
                'service': service,
                'version': 'N/A'  # Version detection can be complex and may require additional tools
            })
            sock.close()
        return {'ports': ports}

    def get_service_name(self, port):
        try:
            return socket.getservbyport(port, 'tcp')
        except:
            return 'Unknown'

    def stop(self):
        self.stop_scan = True
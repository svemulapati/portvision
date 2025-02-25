# PortVision

PortVision is a simple port scanner application designed to help users identify open ports on their network. It features a modern user interface built with HTML, JavaScript, and Tailwind CSS, while the backend is powered by Python using Flask.

## Project Structure

```
PortVision
├── backend
│   ├── app.py          # Entry point of the backend application
│   ├── scanner.py      # Contains the port scanning logic
│   └── requirements.txt # Lists the dependencies for the backend
├── frontend
│   ├── index.html      # Main HTML file for the frontend
│   ├── styles.css      # Styles for the frontend using Tailwind CSS
│   └── app.js          # JavaScript code for handling user interactions
├── README.md           # Documentation for the project
└── .gitignore          # Specifies files to be ignored by Git
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/PortVision.git
   cd PortVision
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install the required dependencies:
     ```
     pip install -r requirements.txt
     ```

3. Run the backend server:
   ```
   python app.py
   ```

4. Open the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Open `index.html` in your web browser.

## Usage

- Enter the IP address you want to scan.
- Specify the port range (default is 1 to 1024).
- Click the "Scan" button to initiate the port scan.
- The results will be displayed on the UI.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
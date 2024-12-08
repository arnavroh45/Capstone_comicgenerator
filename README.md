# Comic Generator Capstone Project 🎨📖

## Project Setup and Installation Guide

### Prerequisites
- Git
- Node.js
- Python
- pip (Python package manager)

### 🚀 Quick Start Guide

#### 1. Clone the Repository
```bash
git clone https://github.com/Vanshikakhurana/Capstone_comicgenerator.git
cd Capstone_comicgenerator
```

#### 2. Backend Setup (Node.js)
```bash
# Initialize Node project
npm init

# Install required Node packages
npm install \
    express \
    body-parser \
    mongodb \
    cors \
    axios \
    web-vitals \
    react-router-dom \
    jsonwebtoken \
    mongoose \
    nodemailer \
    dotenv \
    ejs \
    react-scripts
```

#### 3. Python Environment Setup
```bash
# Create Python virtual environment
# For Windows
python -m venv env_name
.\env_name\Scripts\activate

# For macOS/Linux
python -m venv env_name
source env_name/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

#### 4. Configuration
1. Create a `.env` file in the project root
2. **Important:** Contact Arnav Sharma for the contents of the file

#### 5. Running the Application

##### Start Backend Services
```bash
# In the Model directory
uvicorn running:app --reload

# In a new terminal, backend directory
node server.js
```

##### Start Frontend
```bash
# In frontend directory
npm start
```

### 🌟 Explore and Create Comics!
Open your browser and start generating exciting comics! 

### 📞 Support
For `.env` file configuration, please contact Arnav Sharma.

### 🛠 Troubleshooting
- Ensure all prerequisites are installed
- Verify virtual environment is activated
- Check that all dependencies are correctly installed

### 📝 Note
This project requires multiple terminal windows/tabs to run all services simultaneously.

Structure-->
|-->Backend-->db.js, server.js
|-->Frontend-->Components


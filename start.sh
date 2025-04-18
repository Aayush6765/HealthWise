# HealthWise Startup Script

echo "Starting HealthWise application..."
echo "Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

pip3 install -r requirements.txt

python3 import_notebook_model.py

echo "Starting Flask backend on port 5001..."
python3 app.py

sleep 2

cd ../frontend
echo "Setting up frontend..."
npm install
echo "Starting React frontend..."
npm run dev


import os
import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = Flask(__name__)

# ============================================================================
# PROFESSIONAL CORS CONFIGURATION FOR PRODUCTION
# ============================================================================
# Production: Allow ONLY the Vercel frontend
# Development: Allow localhost for testing
# ============================================================================

ALLOWED_ORIGINS = [
    # Production
    "https://intel-ar-website.vercel.app",
    "https://www.intel-ar-website.vercel.app",
    # Development (local testing on common ports)

     # Main custom domain
    "https://intel-ar.ca",

    # WWW version
    "https://www.intel-ar.ca",

    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:8000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:8000"
]

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": ALLOWED_ORIGINS,
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": [
                "Content-Type",
                "Authorization"
            ],
            "expose_headers": ["Content-Type"],
            "supports_credentials": False,
            "max_age": 3600
        }
    },
    send_wildcard=False,
    automatic_options=True,
    vary_header=True
)

# Environment variables
SENDER_EMAIL = os.getenv("MAIL_USERNAME")
SENDER_PASSWORD = os.getenv("MAIL_PASSWORD")
RECIPIENT_EMAIL = os.getenv("MAIL_RECIPIENT", SENDER_EMAIL)
SMTP_SERVER = os.getenv("MAIL_SERVER", "mail.intel-ar.ca")
SMTP_PORT = int(os.getenv("MAIL_PORT", 465))
USE_SSL = os.getenv("MAIL_USE_SSL", "True") == "True"

# Simple in-memory rate limiting (per IP)
RATE_LIMIT = int(os.getenv("RATE_LIMIT", 5))
RATE_LIMIT_WINDOW = int(os.getenv("RATE_LIMIT_WINDOW", 60))
rate_limit_cache = {}

def is_rate_limited(ip):
    now = time.time()
    window = RATE_LIMIT_WINDOW
    if ip not in rate_limit_cache:
        rate_limit_cache[ip] = []
    rate_limit_cache[ip] = [t for t in rate_limit_cache[ip] if now - t < window]
    if len(rate_limit_cache[ip]) >= RATE_LIMIT:
        return True
    rate_limit_cache[ip].append(now)
    return False

def is_spam(data):
    # Basic anti-spam: check for URLs, suspicious content, or missing fields
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return True
    if "http://" in data['message'] or "https://" in data['message']:
        return True
    if len(data['message']) < 10:
        return True
    return False

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for Render deployment."""
    return jsonify({"status": "ok"}), 200


@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def contact():
    """Handle contact form submissions with email sending."""
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 204
    
    # Only process POST requests
    if request.method != 'POST':
        return jsonify({'success': False, 'error': 'Method not allowed'}), 405
    
    # Validate Content-Type
    if not request.is_json:
        return jsonify({'success': False, 'error': 'Content-Type must be application/json'}), 400
    
    ip = request.remote_addr
    if is_rate_limited(ip):
        return jsonify({'success': False, 'error': 'Too many requests. Please try again later.'}), 429

    data = request.get_json()
    if is_spam(data):
        return jsonify({'success': False, 'error': 'Invalid or suspicious input.'}), 400

    user_name = data.get('name', 'Anonyme')
    user_email = data.get('email', 'No Email')
    user_phone = data.get('phone', 'N/A')
    user_company = data.get('company', 'N/A')
    user_profile = data.get('profile', 'Général')
    user_message = data.get('message', '')

    subject = f"Nouveau Contact via Site Web : {user_name}"
    body = f"""
Vous avez reçu un nouveau message via le formulaire de contact.
--------------------------------------------------
👤 DE LA PART DE :
Nom : {user_name}
Email : {user_email}
Téléphone : {user_phone}
Entreprise : {user_company}
🎯 INTÉRÊT :
Profil recherché : {user_profile}
📝 MESSAGE :
{user_message}
--------------------------------------------------
Pour répondre à ce client, cliquez simplement sur \"Répondre\".
"""

    try:
        msg = MIMEMultipart()
        msg['From'] = f"Intel-Ar Website <{SENDER_EMAIL}>"
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = subject
        msg.add_header('Reply-To', user_email)
        msg.attach(MIMEText(body, 'plain'))

        if USE_SSL:
            server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        else:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"Email sent successfully from {user_name}")
        return jsonify({"success": True, "message": "Email sent successfully"}), 200

    except Exception as e:
        print("Error sending email:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # For development only
    app.run(debug=True, port=5000)
    
    # For production on Render, use gunicorn instead:
    # gunicorn -w 4 -b 0.0.0.0:5000 app:app
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ==============================================================================
# ⚙️ CONFIGURATION (YOU MUST CHANGE THESE 2 LINES)
# ==============================================================================
# 1. THE COURIER EMAIL (The Gmail account you just created to send messages)
SENDER_EMAIL = "intelwebsitebot@gmail.com" 

# 2. THE APP PASSWORD for the courier email (16 characters)
SENDER_PASSWORD = "lqfk bcop xnlh yqew" 

# 3. THE COMPANY EMAIL (Where the message arrives)
RECIPIENT_EMAIL = "infos@intel-ar.ca" 
# ==============================================================================

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        
        # User Data
        user_name = data.get('name', 'Anonyme')
        user_email = data.get('email', 'No Email')
        user_phone = data.get('phone', 'N/A')
        user_company = data.get('company', 'N/A')
        user_profile = data.get('profile', 'Général')
        user_message = data.get('message', '')

        # --- EMAIL FORMATTING ---
        subject = f"Nouveau Contact via Site Web : {user_name}"
        
        # This is what you read in the email body
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
        
        Pour répondre à ce client, cliquez simplement sur "Répondre".
        """

        msg = MIMEMultipart()
        msg['From'] = f"Intel-Ar Website <{SENDER_EMAIL}>" # Shows as "Intel-Ar Website"
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = subject
        
        # *** THE MAGIC TRICK ***
        # This makes the "Reply" button go to the USER, not the courier.
        msg.add_header('Reply-To', user_email) 

        msg.attach(MIMEText(body, 'plain'))

        # Send via Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"Email sent successfully from {user_name}")
        return jsonify({"success": True}), 200

    except Exception as e:
        print("Error sending email:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
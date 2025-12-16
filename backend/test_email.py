import smtplib
from email.mime.text import MIMEText

# ==========================================
# 👇 PASTE YOUR CREDENTIALS HERE TO TEST 👇
# ==========================================
SENDER_EMAIL = "intelwebsitebot@gmail.com"  # The Bot/Courier Email
SENDER_PASSWORD = "lqfk bcop xnlh yqew"        # The 16-char App Password
RECIPIENT_EMAIL = "infos@intel-ar.ca"          # Where to send it
# ==========================================

def run_test():
    print(f"1. Attempting to connect to Gmail as: {SENDER_EMAIL}")
    
    try:
        msg = MIMEText("This is a test email from your Localhost script.")
        msg['Subject'] = "Test Email System"
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECIPIENT_EMAIL

        # Connect to Gmail
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        print("2. TLS Connection Established. Logging in...")
        
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        print("3. Login SUCCESSFUL! Sending email...")
        
        server.send_message(msg)
        server.quit()
        
        print("✅ SUCCESS! The email was sent. Your credentials are correct.")
    
    except smtplib.SMTPAuthenticationError:
        print("❌ ERROR: Authentication Failed.")
        print("   - Check if SENDER_EMAIL is exactly right.")
        print("   - Check if SENDER_PASSWORD is the 16-char App Password (no spaces).")
        print("   - Ensure 2-Step Verification is ON for this Google Account.")
        
    except Exception as e:
        print(f"❌ CRITICAL ERROR: {e}")

if __name__ == "__main__":
    run_test()
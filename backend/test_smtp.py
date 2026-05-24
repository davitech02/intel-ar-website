import smtplib
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("MAIL_SERVER", "mail.intel-ar.ca")
SMTP_PORT = int(os.getenv("MAIL_PORT", 465))
SENDER_EMAIL = os.getenv("MAIL_USERNAME")
SENDER_PASSWORD = os.getenv("MAIL_PASSWORD")

print(f"Testing SMTP connection to {SMTP_SERVER}:{SMTP_PORT}")
print(f"Email: {SENDER_EMAIL}")

try:
    print("\nConnecting...")
    server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=10)
    print("✅ Connected successfully!")
    
    print("\nLogging in...")
    server.login(SENDER_EMAIL, SENDER_PASSWORD)
    print("✅ Login successful!")
    
    server.quit()
    print("\n✅ SMTP connection is working correctly!")
    
except smtplib.SMTPAuthenticationError as e:
    print(f"\n❌ Login failed. Check your email/password: {e}")
except smtplib.SMTPException as e:
    print(f"\n❌ SMTP error: {e}")
except Exception as e:
    print(f"\n❌ Connection error: {e}")

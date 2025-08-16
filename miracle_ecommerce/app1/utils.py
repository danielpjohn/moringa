from django.core.mail import send_mail
import random

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_email(email, otp):
    subject = 'Your OTP Verification Code'
    message = f'Your OTP is: {otp}'
    from_email = 'your@example.com'  # Update this with your email
    send_mail(subject, message, from_email, [email])

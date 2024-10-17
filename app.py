from flask import Flask, render_template, request, redirect, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import EMAIL_USER, EMAIL_PASS

# Use EMAIL_USER and EMAIL_PASS instead of hardcoded credentials

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Secret key for flash messages

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/')
def contact():
    return render_template('contact.html')

# Route to handle form submission
@app.route('/send-email', methods=['POST'])
def send_email():
    # Get form data
    name = request.form['name']
    phone = request.form['number']
    email = request.form['email']
    service = request.form['service']
    message = request.form['message']

    # Email settings
    sender_email = EMAIL_USER # Replace with your email
    sender_password = EMAIL_PASS  # Replace with your email password
    recipient_email = "orders@theshopap.com" # Replace with the email to receive form submissions

    # Email content
    subject = f"New Contact Form Submission: {service}"
    email_message = f"Name: {name}\nPhone: {phone}\nEmail: {email}\nService: {service}\nMessage: {message}"

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(email_message, 'plain'))

    try:
        # Set up the server and send the email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        flash('Message sent successfully!', 'success')
    except Exception as e:
        print(f"Failed to send email: {e}")
        flash('Error sending message. Please try again later.', 'error')

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)



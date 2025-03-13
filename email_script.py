import mailersend.emails
import creds
import main
import requests
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from mailersend import emails
import os

#mailer = emails.NewEmail(os.getenv('mlsn.26de32861e87d469692f2d5187805d7b32b181bd4b42b2d29d7b0e5e858ed9b8'))

def email_new(data):

    
#    mailer = emails.NewEmail('mlsn.26de32861e87d469692f2d5187805d7b32b181bd4b42b2d29d7b0e5e858ed9b8')

#    subject = "Prices"
#    text = "Updated prices: "
#    html = data

#    my_mail = "adamj00001@gmail.com"
#    subscriber_list = [ 'adjohn36@yahoo.com',
#    'adamj00001@gmail.com']
#    mail_body = {}

#    mailer.set_mail_from(my_mail, mail_body)
#    mailer.set_mail_to(subscriber_list, mail_body)
#    mailer.set_subject(subject, mail_body)
#    mailer.set_html_content(html, mail_body)
#    mailer.set_plaintext_content(text, mail_body)
#    mailer.set_reply_to('adamj00001@gmail.com', mail_body)

#    mailer.send(mail_body)
#    print(mail_body)


    message = MIMEMultipart()
    message['Subject'] = "Prices from today"
    message['From'] = creds.sender
    message['To'] = creds.recipient

    
    message.attach(data)
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(creds.sender, creds.password)
        server.sendmail(creds.sender, creds.recipient, message.as_string())

    
    if __name__ == '__main__':
        main()

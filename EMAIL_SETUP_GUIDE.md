# 📧 Email Setup Guide for EZTicket

## **Current Status**
- ✅ **Development Mode**: OTP codes shown in console
- ❌ **Production Mode**: Real emails not sent (needs SMTP configuration)

## **🔧 How to Enable Real Email Sending**

### **Step 1: Choose Your Email Provider**

#### **Option A: Gmail (Recommended for Development)**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update Configuration**:
   ```json
   "EmailSettings": {
     "SMTPHost": "smtp.gmail.com",
     "SMTPPort": "587",
     "SMTPUsername": "your-email@gmail.com",
     "SMTPPassword": "your-16-char-app-password",
     "FromEmail": "your-email@gmail.com",
     "FromName": "EZTicket",
     "EnableSSL": true,
     "UseDevelopmentMode": false
   }
   ```

#### **Option B: Outlook/Hotmail**

1. **Enable App Passwords** in your Microsoft account
2. **Update Configuration**:
   ```json
   "EmailSettings": {
     "SMTPHost": "smtp-mail.outlook.com",
     "SMTPPort": "587",
     "SMTPUsername": "your-email@outlook.com",
     "SMTPPassword": "your-app-password",
     "FromEmail": "your-email@outlook.com",
     "FromName": "EZTicket",
     "EnableSSL": true,
     "UseDevelopmentMode": false
   }
   ```

#### **Option C: Custom SMTP Server**

```json
"EmailSettings": {
  "SMTPHost": "your-smtp-server.com",
  "SMTPPort": "587",
  "SMTPUsername": "your-username",
  "SMTPPassword": "your-password",
  "FromEmail": "noreply@yourdomain.com",
  "FromName": "EZTicket",
  "EnableSSL": true,
  "UseDevelopmentMode": false
}
```

### **Step 2: Update Configuration**

1. **Edit** `EZTicket.API/appsettings.json`
2. **Set** `"UseDevelopmentMode": false`
3. **Add** your SMTP credentials
4. **Restart** the backend

### **Step 3: Test Email Sending**

1. **Register** a new user at http://localhost:3000/register/
2. **Check** if you receive the verification email
3. **Check** backend logs for success/error messages

## **🔍 Troubleshooting**

### **Common Issues:**

1. **"Authentication failed"**
   - Check username/password
   - Ensure 2FA is enabled and app password is used

2. **"Connection timeout"**
   - Check SMTP host and port
   - Verify firewall settings

3. **"SSL/TLS error"**
   - Try `"EnableSSL": false` for port 587
   - Use port 465 with SSL enabled

4. **"Relay denied"**
   - Some SMTP servers require authentication
   - Check if your IP is whitelisted

### **Testing Commands:**

```bash
# Test registration (check console for OTP)
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "your-test-email@gmail.com",
    "password": "TestPass123!",
    "confirmPassword": "TestPass123!",
    "acceptTerms": true
  }'
```

## **🚀 Production Recommendations**

### **For Production Use:**

1. **Use Environment Variables**:
   ```json
   "EmailSettings": {
     "SMTPUsername": "${EMAIL_USERNAME}",
     "SMTPPassword": "${EMAIL_PASSWORD}"
   }
   ```

2. **Use Professional Email Service**:
   - **SendGrid** (recommended)
   - **Mailgun**
   - **Amazon SES**
   - **Postmark**

3. **Set Up SPF/DKIM Records** for better deliverability

## **📋 Quick Setup Checklist**

- [ ] Choose email provider
- [ ] Enable 2FA/app passwords
- [ ] Update `appsettings.json`
- [ ] Set `UseDevelopmentMode: false`
- [ ] Restart backend
- [ ] Test registration
- [ ] Check email delivery
- [ ] Verify OTP works

## **💡 Development vs Production**

| Mode | UseDevelopmentMode | Behavior |
|------|-------------------|----------|
| **Development** | `true` | OTP shown in console |
| **Production** | `false` | Real emails sent |

---

**Need Help?** Check the backend logs for detailed error messages!


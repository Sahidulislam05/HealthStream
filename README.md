# HealthStream Backend

A scalable backend API for **HealthStream**, an online healthcare consultation platform that connects patients with doctors for appointments, online consultations, digital prescriptions, and secure account management.

🔗 **Live Backend:** https://health-stream-lac.vercel.app

---

## 📌 About HealthStream

**HealthStream** is a healthcare consultation platform designed to make doctor-patient communication easier and more accessible.

Patients can discover available doctors, book consultation slots, complete payments, join scheduled video consultations, and receive digital prescriptions after their appointments.

Doctors can apply to join the platform, manage their schedules, conduct consultations, and provide prescriptions.

Admins and Super Admins manage doctors, patients, administrators, and the overall platform.

---

## ✨ Core Features

### 👤 User Authentication

- Patient registration with email and password
- Patient Google authentication
- Doctor application system
- Email OTP verification
- Login with email and password
- Forgot password functionality
- Password reset through OTP
- Change password for authenticated users
- Set password for Google-only patients
- Access token authentication
- Refresh token based session management
- Cookie-based token storage
- Role-based authorization

---

### 👥 User Roles

HealthStream supports four different user roles:

| Role          | Description                                       |
| ------------- | ------------------------------------------------- |
| `PATIENT`     | Registers directly and books doctor consultations |
| `DOCTOR`      | Applies to become a doctor and waits for approval |
| `ADMIN`       | Manages doctors, patients, and creates admins     |
| `SUPER_ADMIN` | Has full administrative control over the platform |

---

## 🔐 Role Permissions

### Patient

Patients can:

- Register their account
- Verify email using OTP
- Login using email/password
- Login using Google
- Reset forgotten passwords
- Change password
- Set password for Google accounts
- Browse available doctor schedules
- Select available consultation slots
- Pay for appointments
- View booked appointments
- Cancel appointments
- Join online consultations
- Receive consultation invoices
- Receive digital prescriptions

---

### Doctor

Doctors can:

- Apply to become a doctor
- Verify email using OTP
- Wait for admin approval
- Login after approval
- Create consultation schedules
- Publish schedules
- Update schedules according to platform rules
- Provide meeting links
- Manage appointments
- Start consultations
- Complete consultations
- Write prescriptions
- Send digital prescriptions to patients

---

### Admin

Admins can:

- Approve doctor applications
- Reject doctor applications
- Block doctors
- Unblock doctors
- Block patients
- Unblock patients
- Create new admin accounts
- Manage doctor-related activities
- Manage patient-related activities

Admins cannot:

- Create Super Admin accounts
- Block Admin accounts
- Block Super Admin accounts

---

### Super Admin

Super Admins can perform all administrative operations available to Admins.

Additionally, Super Admins can:

- Create Super Admin accounts
- Block Admin accounts
- Unblock Admin accounts
- Block Super Admin accounts
- Unblock Super Admin accounts

---

## 🔑 Authentication Flow

### Patient Registration

A patient can register using:

```text
Name
Email
Password
```

After registration:

```text
Registration
     ↓
OTP sent to email
     ↓
Email verification
     ↓
Account activated
     ↓
Login session created
```

Patients can also register using Google.

Google registration does not require separate OTP verification because Google already verifies the user's email.

---

## 👨‍⚕️ Doctor Registration Flow

Doctors cannot directly become active doctors.

The process is:

```text
Doctor Application
        ↓
Email OTP Verification
        ↓
Pending Application
        ↓
Admin / Super Admin Review
        ↓
Approve / Reject
        ↓
Doctor Account Activated
```

A doctor cannot log in or use the platform before approval.

After approval, the doctor receives a welcome email.

---

## 📧 Email Verification

HealthStream uses OTP-based email verification for self-registration flows.

OTP verification is required for:

- Patient registration
- Doctor application

OTP verification is not required for:

- Admin accounts
- Super Admin accounts
- Google patient registration

---

## 🔄 Password Management

HealthStream provides multiple password-related flows.

### Forgot Password

```text
User submits email
       ↓
OTP sent to email
       ↓
User submits OTP
       ↓
New password
       ↓
Password updated
```

### Change Password

Authenticated users can change their password by providing:

```text
Current Password
New Password
```

### Set Password

Patients who initially registered through Google can set a password later.

After setting a password, they can use both:

```text
Google Login
+
Email/Password Login
```

---

## 🍪 Token & Session Management

After a successful authentication, HealthStream issues:

- Access Token
- Refresh Token

Both tokens are handled through cookies.

Typical authentication flow:

```text
Login
 ↓
Access Token
 +
Refresh Token
 ↓
Authenticated Requests
 ↓
Access Token Expired
 ↓
Refresh Token
 ↓
New Access Token
```

This provides secure session management while allowing users to remain authenticated without repeatedly logging in.

---

# 🩺 Doctor Schedule Management

Doctors can publish their availability through schedules.

Each schedule belongs to:

```text
One Doctor
+
One Calendar Date
```

---

## 📅 Schedule Rules

HealthStream applies several schedule restrictions.

### One Schedule Per Day

A doctor can create a maximum of one schedule for a particular calendar date.

### Schedule Duration

A schedule must be:

```text
Minimum: 3 hours
Maximum: 8 hours
```

### Same-Day Schedule

The schedule must start and end on the same calendar date.

Valid:

```text
09:00 AM → 05:00 PM
03:00 PM → 11:00 PM
```

Invalid:

```text
09:00 PM → 03:00 AM
```

because it crosses into the next day.

---

## 🎥 Meeting Link

Each schedule contains a video consultation meeting link.

The same meeting link is used by appointments booked under that schedule.

---

## 📝 Schedule Status

A new schedule starts as:

```text
DRAFT
```

Patients cannot see draft schedules.

The doctor must publish the schedule before patients can book available slots.

---

## ⏱️ Automatic Slot Generation

Consultation slots are generated automatically in:

```text
20-minute intervals
```

Example:

```text
03:00 PM → 09:00 PM

6 Hours
360 Minutes

360 / 20 = 18 Slots
```

Therefore, the schedule contains:

```text
18 consultation slots
```

---

# 📆 Published Schedule Rules

After a schedule is published, different fields follow different update rules.

### Date

The date becomes locked after publishing.

### Time Range

The doctor can change the time range only until the first appointment is booked.

Once an appointment exists, the time range becomes locked.

### Other Fields

The following can still be updated:

- Schedule status
- Meeting link
- Other editable schedule information

---

# 📱 Patient Schedule Visibility

Patients can only see schedules for:

```text
Today
```

They cannot see:

- Past schedules
- Future schedules

A schedule also becomes unavailable for new bookings once its starting time arrives.

Example:

```text
Schedule:
03:00 PM → 09:00 PM
```

Before `03:00 PM`:

```text
Visible ✅
Bookable ✅
```

From `03:00 PM`:

```text
Visible ❌
New bookings ❌
```

A fully booked schedule is also removed from the patient's available schedule list.

---

# 📅 Appointment Booking

The appointment booking flow is:

```text
Patient
   ↓
View Today's Available Schedules
   ↓
Select Doctor
   ↓
Select Available Slot
   ↓
Payment
   ↓
Payment Successful
   ↓
Appointment Created
   ↓
Appointment Status = BOOKED
```

---

## 💳 Payment

Patients must pay for the appointment before the booking becomes confirmed.

After successful payment:

- Appointment is created
- Appointment status becomes `BOOKED`
- A serial number is assigned
- Invoice information is generated
- Invoice PDF is sent through email

---

# 🔢 Appointment Serial Number

Each appointment receives a serial number based on its booking order within the schedule.

Example:

```text
First booking  → Serial 1
Second booking → Serial 2
Third booking  → Serial 3
Fourth booking → Serial 4
```

---

# 🧾 Invoice

After successful payment, the system sends an invoice PDF to the patient.

The invoice contains important appointment information such as:

- Meeting link
- Consultation date
- Consultation time
- Payment information

---

# 🔄 Appointment Lifecycle

Appointments follow this lifecycle:

```text
BOOKED
   ↓
ONGOING
   ↓
COMPLETED
```

### BOOKED

Automatically assigned after successful payment.

### ONGOING

The doctor manually changes the appointment to ongoing when the consultation begins.

### COMPLETED

The doctor manually marks the appointment as completed after finishing the consultation.

---

# 💊 Digital Prescription

Doctors can create prescriptions only after an appointment is completed.

Prescription information can include:

- Key medical findings
- Prescribed medicines
- Other relevant prescription information

Flow:

```text
Appointment
     ↓
COMPLETED
     ↓
Doctor Creates Prescription
     ↓
Prescription Submitted
     ↓
Prescription PDF Generated
     ↓
PDF Emailed to Patient
```

A prescription cannot be created for an appointment that is still:

```text
BOOKED
```

or

```text
ONGOING
```

---

# ❌ Appointment Cancellation & Refund

Patients can cancel appointments based on the schedule start time.

| Cancellation Time                       | Refund |
| --------------------------------------- | ------ |
| More than 1 hour before schedule starts | ✅ Yes |
| Within 1 hour before schedule starts    | ❌ No  |
| During the schedule                     | ❌ No  |
| After the schedule ends                 | ❌ No  |

### Example

Suppose a schedule starts at:

```text
03:00 PM
```

Refundable cancellation:

```text
Before 02:00 PM
```

Non-refundable cancellation:

```text
02:00 PM onward
```

The appointment can still be cancelled, but the payment will not be refunded.

---

# 👨‍💼 Admin & Super Admin Management

Admin and Super Admin accounts are not self-registered.

They are created by authorized existing administrators.

When creating a new administrative account, two emails are involved:

### Organization Email

This is the email used as the new account's login identity.

### Personal Email

This is the person's actual inbox where the welcome credentials are delivered.

---

## 🔐 Admin Account Creation Flow

```text
Authorized Admin
       ↓
Create Admin / Super Admin
       ↓
System Generates Password
       ↓
Credentials Sent to Personal Email
       ↓
New Admin Logs In
       ↓
Password Changed
```

The generated password should be changed after the first login.

---

# 📬 Email Notifications

HealthStream sends emails for important account and healthcare events.

| Event                       | Recipient       |
| --------------------------- | --------------- |
| Patient registration        | Patient         |
| Doctor application approval | Doctor          |
| Admin creation              | New Admin       |
| Super Admin creation        | New Super Admin |
| OTP verification            | Relevant user   |
| Password reset OTP          | Relevant user   |
| Password reset success      | Relevant user   |
| Appointment invoice         | Patient         |
| Prescription generated      | Patient         |

---

# 🛡️ Security

HealthStream follows role-based and authentication-based access control.

Important security concepts include:

- Authentication
- Authorization
- Role-based access control
- Access tokens
- Refresh tokens
- Secure cookie-based sessions
- OTP verification
- Password hashing
- Protected administrative operations
- Protected doctor operations
- Protected patient operations

Sensitive operations are restricted according to the authenticated user's role.

---

# 🏗️ Backend Architecture

The backend is organized around modular application responsibilities.

Core areas include:

```text
Authentication
Users
Patients
Doctors
Admins
Schedules
Appointments
Payments
Prescriptions
Email
File/PDF Generation
Authorization
Audit / Platform Management
```

The project follows a service-oriented backend structure so that business logic remains separated from controllers and route handling.

---

# 🛠️ Technology Stack

The backend is built using modern TypeScript-based backend technologies.

### Core

- Node.js
- TypeScript
- Express.js
- Prisma ORM

### Authentication

- JWT-based authentication
- Access Token
- Refresh Token
- HTTP Cookies
- Google Authentication

### Database

- Prisma ORM
- Relational database

### Communication

- REST API
- Email-based OTP
- Transactional email notifications

### Documents

- PDF generation for invoices
- PDF generation for prescriptions

### Deployment

- Vercel

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd <your-project-folder>
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_database_url"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

SMTP_HOST="your_smtp_host"
SMTP_PORT="your_smtp_port"
SMTP_USER="your_smtp_user"
SMTP_PASSWORD="your_smtp_password"

FRONTEND_URL="your_frontend_url"
```

> Add the exact environment variables required by your project configuration before running the application.

---

## 4. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations when required:

```bash
npx prisma migrate dev
```

For production deployment:

```bash
npx prisma migrate deploy
```

---

## 5. Run the Development Server

```bash
npm run dev
```

The API should then be available on your configured local port.

Example:

```text
http://localhost:5000
```

---

# 🌍 Production Backend

HealthStream backend is deployed on Vercel.

### Production URL

```text
https://health-stream-lac.vercel.app
```

### Health Check

Open:

```text
https://health-stream-lac.vercel.app
```

Expected response:

```json
{
  "success": true,
  "message": "Welcome to HealthStream Backend"
}
```

---

# 📡 API Structure

The API follows a modular REST architecture.

Major API domains include:

```text
/auth
/users
/patients
/doctors
/admin
/schedules
/appointments
/payments
/prescriptions
```

> Exact endpoint names and request/response structures depend on the current implementation of the deployed API.

---

# 🔁 Typical Healthcare Consultation Flow

The complete HealthStream workflow can be summarized as:

```text
Patient Registration
        ↓
Email Verification
        ↓
Login
        ↓
Browse Today's Doctor Schedules
        ↓
Select Available Slot
        ↓
Make Payment
        ↓
Appointment Confirmed
        ↓
Receive Invoice
        ↓
Join Consultation
        ↓
Doctor Starts Consultation
        ↓
Appointment Ongoing
        ↓
Doctor Completes Consultation
        ↓
Appointment Completed
        ↓
Doctor Creates Prescription
        ↓
Prescription PDF Generated
        ↓
Patient Receives Prescription
```

---

# 👨‍⚕️ Doctor Workflow

```text
Doctor Application
        ↓
Email OTP Verification
        ↓
Admin Review
        ↓
Approval
        ↓
Doctor Login
        ↓
Create Schedule
        ↓
Publish Schedule
        ↓
Receive Appointments
        ↓
Start Consultation
        ↓
Complete Consultation
        ↓
Create Prescription
```

---

# 🛠️ Admin Workflow

```text
Admin Login
      ↓
Dashboard
      ↓
Manage Doctors
      ↓
Approve / Reject Applications
      ↓
Block / Unblock Doctors
      ↓
Manage Patients
      ↓
Block / Unblock Patients
      ↓
Create Administrators
```

---

# 👑 Super Admin Workflow

```text
Super Admin Login
        ↓
Full Platform Management
        ↓
Doctor Management
        ↓
Patient Management
        ↓
Admin Management
        ↓
Create Admin
        ↓
Create Super Admin
        ↓
Block / Unblock Admin
        ↓
Block / Unblock Super Admin
```

---

# 🧪 Development

For development:

```bash
npm run dev
```

To build the project:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

> Make sure these scripts match the scripts defined in your project's `package.json`.

---

# 📦 Production Deployment

The backend is deployed using **Vercel**.

Production deployment flow:

```text
Git Repository
      ↓
Vercel
      ↓
Build
      ↓
Environment Variables
      ↓
Production Deployment
      ↓
HealthStream API
```

Production API:

```text
https://health-stream-lac.vercel.app
```

---

# 🔒 Environment Variable Security

Never commit sensitive credentials to Git.

Do not commit:

```text
.env
.env.local
.env.production
```

Make sure secrets such as the following remain private:

```text
Database credentials
JWT secrets
Google OAuth credentials
SMTP credentials
Payment credentials
API keys
```

For Vercel deployment, configure environment variables from the Vercel project settings.

---

# 📁 Recommended Project Structure

A typical modular structure for HealthStream can be organized as:

```text
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── patient/
│   │   ├── doctor/
│   │   ├── admin/
│   │   ├── schedule/
│   │   ├── appointment/
│   │   ├── payment/
│   │   └── prescription/
│   │
│   ├── middleware/
│   ├── routes/
│   ├── helpers/
│   ├── utils/
│   └── errors/
│
├── lib/
├── config/
└── server.ts
```

> Adjust this structure to match the exact folders and files in your repository.

---

# 📊 System Overview

```text
                     ┌─────────────────────┐
                     │     HealthStream     │
                     │   Healthcare API    │
                     └──────────┬──────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
      Patients              Doctors              Admins
          │                     │                     │
          │                     │                     │
          ▼                     ▼                     ▼
    Book Slots            Create Schedules     Manage Platform
          │                     │                     │
          └──────────────┬──────┴─────────────────────┘
                         │
                         ▼
                    Appointments
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
           Payment             Consultation
              │                     │
              ▼                     ▼
           Invoice             Prescription
                                    │
                                    ▼
                              Patient Email
```

---

# ✅ Main Platform Rules

HealthStream follows these core business rules:

- Patients can register directly.
- Doctors must apply before becoming active doctors.
- Doctor applications require email verification.
- Admin or Super Admin approval is required for doctors.
- Google authentication is available only for patients.
- Admins and Super Admins cannot self-register.
- Only Super Admins can create Super Admin accounts.
- Admins cannot manage other Admins or Super Admins.
- Doctors can publish one schedule per day.
- Schedule duration must be between 3 and 8 hours.
- Consultation slots are generated in 20-minute intervals.
- Patients can only book today's available schedules.
- Payment is required before appointment confirmation.
- Appointment statuses are `BOOKED`, `ONGOING`, and `COMPLETED`.
- Prescriptions can only be created after an appointment is completed.
- Appointment cancellation is allowed according to the platform's refund policy.
- Invoice and prescription documents are delivered through email.

---

# 🎯 Project Goals

HealthStream aims to provide:

- Simple patient-doctor communication
- Secure authentication
- Organized doctor scheduling
- Reliable appointment management
- Online consultation support
- Digital prescription delivery
- Automated email notifications
- Role-based platform management
- Secure and scalable backend infrastructure

---

# 📌 Backend Status

**Project:** HealthStream
**Backend:** HealthStream REST API
**Deployment:** Vercel
**Status:** Production

### Live API

```text
https://health-stream-lac.vercel.app
```

---

# 👨‍💻 Developer

## Sahidul Islam

---

# 📄 License

This project is for educational and project development purposes.

Add your preferred license here, for example:

```text
MIT License
```

---

## ⭐ HealthStream

**Connecting Patients with Doctors — Smarter, Simpler, Better.**

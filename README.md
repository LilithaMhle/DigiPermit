# DigiPermit Verification System

## Overview
DigiPermit is a digital permit verification system that allows institutions to verify permits in real-time using QR code scanning and a cloud-based backend.

The system simulates real-world verification processes used by government institutions such as Home Affairs, healthcare facilities, and law enforcement agencies.

---

## Problem Statement
Manual verification of permits is slow, error-prone, and vulnerable to fraud. Many institutions rely on physical documents, which can be forged or expired without detection.

DigiPermit provides a digital solution that ensures:
- Faster verification
- Improved security
- Reduced fraud
- Centralized record keeping

---

## System Features

- QR code-based permit verification
- Real-time validation using Supabase
- Expiry detection
- Fraud detection simulation
- Verification logging (audit trail)
- Mobile-friendly interface

---

## System Workflow

1. User scans QR code using mobile device camera  
2. System extracts permit number  
3. App queries Supabase database  
4. System validates permit:
   - Exists in database
   - Not expired
   - Not revoked  
5. Result is displayed to the user  

---

## Technologies Used

### Frontend
- Ionic Angular
- HTML / CSS
- TypeScript

### Backend
- Supabase (PostgreSQL + API)

### Tools
- GitHub
- Visual Studio Code
- Node.js

---

## Database Tables

- permit_holders
- permits
- verification_logs

---

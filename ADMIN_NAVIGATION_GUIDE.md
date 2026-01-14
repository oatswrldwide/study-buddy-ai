# Admin Navigation Guide - StudyBuddy AI

## 🎯 Getting Started as Admin

### Initial Access
1. **Login**: https://studybuddy-a045b.web.app/login
2. Sign in with your admin credentials
3. You'll be automatically redirected to the admin dashboard

---

## 📊 Admin Dashboard Overview

### Main Dashboard (`/admin` or `/admin/dashboard`)

**What You'll See:**
- **Total Statistics Cards**
  - School Leads count
  - Student Signups count  
  - Active Students count
  - Pending Payments count

- **Recent Activity Feed**
  - Latest school inquiries
  - New student registrations
  - Recent payment submissions

**Quick Actions:**
- View all leads
- View all students
- Process payments
- Export data

---

## 🏫 School Leads Management (`/admin/leads`)

### What You Can Do:
1. **View All School Inquiries**
   - School name
   - Contact person
   - Email and phone
   - Number of students
   - Status (New, Contacted, In Progress, Converted, Lost)

2. **Update Lead Status**
   - Click on any lead card
   - Change status dropdown
   - Add notes
   - Track progress

3. **Contact Schools**
   - Email and phone readily available
   - Click to copy contact info
   - Track communication history

### Lead Statuses:
- 🟡 **New** - Just submitted, needs review
- 🔵 **Contacted** - Initial contact made
- 🟣 **In Progress** - Negotiations ongoing
- 🟢 **Converted** - Deal closed!
- 🔴 **Lost** - Opportunity lost

### Filters & Search:
- Filter by status
- Search by school name
- Sort by date

---

## 👨‍🎓 Student Signups (`/admin/students`)

### Overview:
View and manage all student registrations

### What You'll See:
- **Student Information**
  - Full name
  - Email address
  - Phone number
  - School name
  - Grade level
  - Subjects interested in

- **Parent Information**
  - Parent name
  - Parent email
  - Parent phone

- **Status**
  - Active
  - Pending verification
  - Inactive

### Actions You Can Take:
1. **Approve Students**
   - Verify information
   - Activate account
   - Send welcome email

2. **Edit Student Details**
   - Update contact information
   - Change grade level
   - Modify subjects

3. **Suspend/Deactivate**
   - Temporarily suspend access
   - Deactivate account

4. **View Activity**
   - Chat history
   - Usage statistics
   - Performance data

### Bulk Actions:
- Export student list
- Bulk approve/reject
- Send bulk emails

---

## 💳 Payments Management (`/admin/payments`)

### What You Manage:
All payment proof submissions from students/parents

### Payment Information:
- **Student Details**
  - Student name
  - Email
  - Phone
  - Subscription plan

- **Payment Details**
  - Amount
  - Payment method
  - Reference number
  - Payment date
  - Proof image

- **Status**
  - 🟡 Pending Review
  - 🟢 Approved
  - 🔴 Rejected

### Actions:
1. **Review Payment Proof**
   - View uploaded image
   - Check reference number
   - Verify amount

2. **Approve Payment**
   - Mark as verified
   - Activate student subscription
   - Send confirmation

3. **Reject Payment**
   - Add reason for rejection
   - Request resubmission
   - Notify student/parent

4. **Download Proof**
   - Save payment proof locally
   - For accounting records

### Filters:
- By status (Pending, Approved, Rejected)
- By date range
- By student
- By amount

---

## 🔍 Navigation Tips

### Sidebar Menu
Located on the left side:
- **Dashboard** (📊) - Overview and stats
- **School Leads** (🏫) - Manage school inquiries
- **Students** (👨‍🎓) - Manage student accounts
- **Payments** (💳) - Process payments

### Top Bar
- **Search** - Quick search across all sections
- **Notifications** (🔔) - New leads, signups, payments
- **Profile** - Your admin profile and settings
- **Logout** - Sign out of admin panel

### Breadcrumbs
Top of each page shows navigation path:
```
Home > Admin > Students
```
Click any level to navigate back

---

## 🎨 Dashboard Features

### Quick Stats
At the top of every admin page:
- Real-time counts update automatically
- Color-coded status indicators
- Click to filter by status

### Data Tables
All data tables support:
- ✅ Sorting (click column headers)
- ✅ Filtering (dropdown filters)
- ✅ Searching (search box)
- ✅ Pagination (bottom controls)
- ✅ Export (CSV/Excel download)

### Action Buttons
- **Primary actions** - Blue buttons (Approve, Save)
- **Secondary actions** - Gray buttons (View, Edit)
- **Danger actions** - Red buttons (Reject, Delete)

---

## 🔐 Security & Permissions

### Admin Capabilities
As an admin, you can:
- ✅ View all school leads
- ✅ View all student accounts
- ✅ Manage all payments
- ✅ Create other admin users (via script)
- ✅ Modify user roles
- ✅ Access all analytics
- ✅ Export all data

### Data Protection
- All sensitive data is encrypted
- Payment proofs stored securely in Firebase Storage
- Firestore security rules prevent unauthorized access
- Audit logs track all admin actions

---

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar navigation
- Multi-column layouts
- Expanded data tables

### Tablet (768px - 1023px)
- Collapsible sidebar
- Two-column layouts
- Compact tables

### Mobile (< 768px)
- Hidden sidebar (hamburger menu)
- Single column layout
- Scrollable tables
- Touch-optimized buttons

---

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + K` - Quick search
- `Ctrl/Cmd + D` - Go to Dashboard
- `Ctrl/Cmd + L` - Go to Leads
- `Ctrl/Cmd + S` - Go to Students
- `Ctrl/Cmd + P` - Go to Payments
- `Esc` - Close modals/dialogs

---

## 🚀 Common Workflows

### Workflow 1: Process New School Lead
1. Navigate to **School Leads** (`/admin/leads`)
2. Click on a lead with status "New"
3. Review school details
4. Update status to "Contacted"
5. Add follow-up notes
6. Set reminder for next contact

### Workflow 2: Approve Student Signup
1. Navigate to **Students** (`/admin/students`)
2. Filter by "Pending" status
3. Review student information
4. Verify parent contact details
5. Click "Approve"
6. Student receives welcome email

### Workflow 3: Verify Payment
1. Navigate to **Payments** (`/admin/payments`)
2. Filter by "Pending Review"
3. Click payment to view details
4. View payment proof image
5. Verify reference number
6. Click "Approve" or "Reject"
7. Student subscription updated automatically

---

## 📊 Reports & Analytics

### Available Reports:
- **School Conversion Report**
  - Lead-to-conversion rate
  - Revenue by school
  - Active schools

- **Student Growth Report**
  - New signups by month
  - Active students trend
  - Churn rate

- **Revenue Report**
  - Payment collections
  - Outstanding payments
  - Revenue by subscription tier

### Export Options:
- CSV format
- Excel format
- PDF reports

---

## 🆘 Troubleshooting

### Can't See Admin Menu?
- **Check**: Your account has admin role set
- **Fix**: Run the create-admin script again
- **Verify**: Check browser console for role detection

### Permission Denied Errors?
- **Cause**: Firestore rules blocking access
- **Fix**: Verify `admin_users` document exists
- **Check**: Custom claims are set correctly

### Data Not Loading?
- **Try**: Refresh the page (F5)
- **Check**: Internet connection
- **Verify**: Firebase services are running

### Can't Upload Images?
- **Check**: File size (max 5MB)
- **Verify**: Supported formats (JPG, PNG, PDF)
- **Try**: Different browser

---

## 🔗 Quick Links

- **Admin Dashboard**: https://studybuddy-a045b.web.app/admin/dashboard
- **School Leads**: https://studybuddy-a045b.web.app/admin/leads
- **Students**: https://studybuddy-a045b.web.app/admin/students
- **Payments**: https://studybuddy-a045b.web.app/admin/payments
- **Firebase Console**: https://console.firebase.google.com/project/studybuddy-a045b

---

## 💡 Pro Tips

1. **Use Filters** - Save time by filtering data before searching
2. **Keyboard Shortcuts** - Learn them to navigate faster
3. **Bookmark Pages** - Add frequently used pages to browser bookmarks
4. **Check Notifications** - Stay updated with new activity
5. **Regular Exports** - Download data backups periodically
6. **Set Reminders** - Use notes to track follow-ups
7. **Mobile Access** - Admin panel works on mobile for quick checks

---

## 📞 Support

If you need help:
1. Check the **DEBUGGING_GUIDE.md** for common issues
2. Review browser console for error messages
3. Check Firebase Console for service status
4. Contact technical support with error details

---

**Last Updated**: January 2026
**Version**: 1.0

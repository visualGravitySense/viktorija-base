# Simplified Data Model for Beauty Salon POS System

Here's a streamlined data model for the key functions of your beauty salon POS MVP:

## 1. Appointment Booking

**Appointment**
- `appointment_id` (Primary Key)
- `customer_id` (Foreign Key)
- `employee_id` (Foreign Key)
- `service_id` (Foreign Key)
- `date`
- `start_time`
- `end_time`
- `status` (Confirmed, Completed, Cancelled, No-Show)
- `created_at`
- `last_updated`
- `notes`

**Service**
- `service_id` (Primary Key)
- `name`
- `description`
- `duration` (in minutes)
- `price`
- `category` (Hair, Nails, Facial, etc.)
- `active` (Boolean)

## 2. Customer Database

**Customer**
- `customer_id` (Primary Key)
- `first_name`
- `last_name`
- `email`
- `phone`
- `date_of_birth`
- `created_at`
- `last_visit_date`
- `total_visits`
- `total_spent`
- `preferred_employee_id` (Foreign Key, optional)
- `notes`

**CustomerPreference**
- `preference_id` (Primary Key)
- `customer_id` (Foreign Key)
- `preference_type` (Service preference, product allergies, etc.)
- `preference_value`

## 3. Payment Integration

**Transaction**
- `transaction_id` (Primary Key)
- `appointment_id` (Foreign Key)
- `customer_id` (Foreign Key)
- `amount`
- `payment_method` (Cash, Credit Card, etc.)
- `status` (Completed, Pending, Failed)
- `transaction_date`
- `payment_provider_reference` (for online payments)
- `notes`

**Invoice**
- `invoice_id` (Primary Key)
- `customer_id` (Foreign Key)
- `date_issued`
- `due_date`
- `total_amount`
- `status` (Paid, Unpaid, Partially Paid)

**InvoiceItem**
- `item_id` (Primary Key)
- `invoice_id` (Foreign Key)
- `service_id` (Foreign Key)
- `quantity`
- `unit_price`
- `discount`
- `total_price`
- `description`

## 4. Employee Schedule

**Employee**
- `employee_id` (Primary Key)
- `first_name`
- `last_name`
- `email`
- `phone`
- `role` (Stylist, Nail Tech, Manager, etc.)
- `hire_date`
- `active` (Boolean)

**WorkingHours**
- `schedule_id` (Primary Key)
- `employee_id` (Foreign Key)
- `day_of_week`
- `start_time`
- `end_time`
- `is_recurring` (Boolean)
- `specific_date` (Null if recurring)

**TimeOff**
- `timeoff_id` (Primary Key)
- `employee_id` (Foreign Key)
- `start_date`
- `end_date`
- `reason`
- `status` (Requested, Approved, Denied)

## 5. Demo, Analytics, and Feedback

**DemoAccount**
- `demo_id` (Primary Key)
- `salon_name`
- `contact_name`
- `email`
- `phone`
- `created_at`
- `expires_at`
- `access_level` (Full, Limited)

**Analytics**
- `analytics_id` (Primary Key)
- `salon_id` (Foreign Key, can be demo or real account)
- `date`
- `bookings_count`
- `completed_appointments`
- `cancellations`
- `total_revenue`
- `new_customers`
- `returning_customers`

**UserFeedback**
- `feedback_id` (Primary Key)
- `user_id` (Foreign Key, can be employee or customer)
- `user_type` (Employee, Customer, Owner)
- `feedback_type` (Bug, Feature Request, General)
- `feedback_text`
- `rating` (1-5)
- `date_submitted`
- `resolved` (Boolean)
- `resolution_notes`

## Key Relationships:

1. **Appointments** link customers, employees, and services
2. **Transactions** connect to appointments and customers
3. **Employees** connect to working hours and time off
4. **Customers** link to appointments, transactions, and preferences
5. **Analytics** track key metrics by salon

This simplified data model covers the essential functions while remaining manageable for MVP development. As you progress, you can extend these models to incorporate more advanced features like inventory management, loyalty programs, and AI-powered recommendations.
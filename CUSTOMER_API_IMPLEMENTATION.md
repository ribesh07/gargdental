# Customer API Implementation Guide

This document explains the implementation of customer-related API endpoints for your Next.js frontend that integrates with your Laravel backend.

## Overview

Your Laravel backend provides these customer endpoints:
```php
Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function () {
    Route::get('info', [CustomerController::class, 'get_info']);
    Route::post('update-profile', [CustomerController::class, 'update_profile']);
    Route::post('change-password', [CustomerController::class, 'change_password']);
    Route::delete('remove-account', [CustomerController::class, 'remove_account']);
});
```

## What's New in This Implementation

### 1. Customer API Service (`utils/customerApi.js`)
- **Purpose**: Centralized service for all customer-related API calls
- **Features**:
  - `getCustomerInfo()` - Fetch customer information
  - `updateCustomerProfile()` - Update customer profile
  - `changeCustomerPassword()` - Change customer password
  - `removeCustomerAccount()` - Delete customer account
  - Data validation helpers
  - Error handling and response formatting

### 2. Change Password Component (`components/ChangePasswordForm.js`)
- **Purpose**: Secure password change form with validation
- **Features**:
  - Current password verification
  - New password with confirmation
  - Password visibility toggles
  - Real-time validation
  - Loading states and error handling
  - Password requirements display

### 3. Account Removal Modal (`components/RemoveAccountModal.js`)
- **Purpose**: Safe account deletion with confirmation
- **Features**:
  - Warning messages about data loss
  - Type "DELETE" confirmation requirement
  - Clear explanation of consequences
  - Automatic logout and redirect after deletion

### 4. Enhanced Profile Management
- **Updated `EditProfileForm.js`**: Now integrates with customer API
- **Updated `MyAccount` page**: Includes security section with password change and account removal
- **New Profile page**: Comprehensive customer profile view

## API Endpoints Implementation

### 1. GET /customer/info
```javascript
// Usage
const result = await getCustomerInfo();
if (result.success) {
  console.log(result.data); // Customer information
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "image_full_url": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

### 2. POST /customer/update-profile
```javascript
// Usage
const profileData = {
  full_name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  province: "Bagmati",
  profile_image: "base64_image_data"
};

const result = await updateCustomerProfile(profileData);
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated customer data
  }
}
```

### 3. POST /customer/change-password
```javascript
// Usage
const passwordData = {
  current_password: "oldpassword",
  new_password: "newpassword",
  confirm_password: "newpassword"
};

const result = await changeCustomerPassword(passwordData);
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 4. DELETE /customer/remove-account
```javascript
// Usage
const result = await removeCustomerAccount();
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Account removed successfully"
}
```

## File Structure

```
utils/
├── customerApi.js          # Customer API service functions
├── apiHelper.js            # Updated to use new customer API
└── ApiSafeCalls.js         # Base API utilities

components/
├── ChangePasswordForm.js   # Password change component
└── RemoveAccountModal.js   # Account removal modal

app/
├── myaccount/
│   ├── page.js             # Updated MyAccount page
│   └── EditProfileForm.js  # Updated profile form
└── account/
    └── profile/
        └── page.js         # New comprehensive profile page
```

## Usage Examples

### 1. Fetching Customer Information
```javascript
import { getCustomerInfo } from "@/utils/customerApi";

const fetchUserData = async () => {
  const result = await getCustomerInfo();
  if (result.success) {
    setUser(result.data);
  } else {
    toast.error(result.error);
  }
};
```

### 2. Updating Profile
```javascript
import { updateCustomerProfile, validateProfileData } from "@/utils/customerApi";

const handleProfileUpdate = async (formData) => {
  // Validate data first
  const validation = validateProfileData(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  const result = await updateCustomerProfile(formData);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.error);
  }
};
```

### 3. Changing Password
```javascript
import ChangePasswordForm from "@/components/ChangePasswordForm";

// In your component
const [showChangePassword, setShowChangePassword] = useState(false);

// Render the form
{showChangePassword && (
  <ChangePasswordForm
    onCancel={() => setShowChangePassword(false)}
    onSuccess={() => {
      setShowChangePassword(false);
      toast.success("Password changed successfully!");
    }}
  />
)}
```

### 4. Removing Account
```javascript
import RemoveAccountModal from "@/components/RemoveAccountModal";

// In your component
const [showRemoveAccount, setShowRemoveAccount] = useState(false);

// Render the modal
<RemoveAccountModal
  isOpen={showRemoveAccount}
  onClose={() => setShowRemoveAccount(false)}
/>
```

## Security Features

### 1. Authentication
- All customer API calls require authentication token
- Token is automatically included in requests via `ApiSafeCalls.js`
- Unauthorized requests are handled gracefully

### 2. Data Validation
- Client-side validation for all forms
- Server-side validation expected from Laravel backend
- Password strength requirements
- Email format validation

### 3. Confirmation Dialogs
- Account removal requires typing "DELETE"
- Password change requires current password verification
- Clear warnings about irreversible actions

## Error Handling

### 1. API Errors
- Network errors are caught and displayed
- Server errors show user-friendly messages
- Console logging for debugging

### 2. Validation Errors
- Real-time form validation
- Clear error messages for each field
- Error clearing when user starts typing

### 3. Loading States
- Loading spinners during API calls
- Disabled buttons during processing
- Clear feedback for user actions

## Integration Points

### 1. Existing Code
- Updated `userDetails()` function in `apiHelper.js`
- Enhanced `MyAccount` page with new features
- Integrated with existing authentication system

### 2. State Management
- Uses existing Zustand store for cart management
- Local state for form data and UI states
- Toast notifications for user feedback

### 3. Routing
- Seamless navigation between pages
- Proper redirects after actions
- Back button functionality

## Testing Recommendations

### 1. API Testing
- Test all endpoints with valid data
- Test error scenarios (invalid token, network errors)
- Verify response formats match expectations

### 2. UI Testing
- Test form validation
- Test loading states
- Test error handling
- Test confirmation dialogs

### 3. Integration Testing
- Test complete user flows
- Test authentication integration
- Test data persistence

## Environment Variables

Make sure your `.env.local` file includes:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-laravel-backend.com/api/v1
```

## Dependencies

The implementation uses these existing dependencies:
- `react-hot-toast` - For notifications
- `lucide-react` - For icons
- `zustand` - For state management
- `js-cookie` - For cookie management

## Next Steps

1. **Test the implementation** with your Laravel backend
2. **Customize the UI** to match your design system
3. **Add additional validation** if needed
4. **Implement error boundaries** for better error handling
5. **Add unit tests** for the API functions
6. **Add integration tests** for the complete flows

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Laravel backend endpoints are working
3. Ensure authentication tokens are valid
4. Check network requests in browser dev tools

This implementation provides a solid foundation for customer management in your Next.js application while maintaining security and user experience best practices. 
# Google Authentication Setup

This guide provides instructions for setting up Google OAuth authentication in the Comfort Way application.

## Prerequisites

- A Google Developer account
- Access to Google Cloud Console
- Your application running locally or deployed

## Setting Up Google OAuth

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"

2. **Set Up OAuth Consent Screen**:
   - Go to "OAuth consent screen" tab
   - Select "External" user type (if not a Google Workspace user)
   - Fill in required information (App name, user support email, developer contact)
   - Add scopes (at minimum, include `.../auth/userinfo.email` and `.../auth/userinfo.profile`)
   - Save and continue

3. **Create OAuth Client ID**:
   - Go to "Credentials" tab
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application" as the application type
   - Provide a name for the client
   - Add Authorized JavaScript origins:
     - For local development: `http://localhost:5173` (or your local development URL)
     - For production: `https://comfortway.in` (your production domain)
   - Add Authorized redirect URIs:
     - For local development: `http://localhost:5173` (or your local development URL)
     - For production: `https://comfortway.in` (your production domain)
   - Click "Create"

4. **Get Your Client ID**:
   - After creation, you'll be provided with a Client ID
   - Copy this Client ID

5. **Configure the Application**:
   - Open `src/App.jsx`
   - Replace `YOUR_GOOGLE_CLIENT_ID` with the Client ID you copied:
     ```jsx
     const GOOGLE_CLIENT_ID = "your-client-id-here";
     ```
   - Alternatively, you can set this in an environment variable and reference it:
     ```jsx
     const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
     ```

6. **Set Up Environment Variables**:
   - Create or edit your `.env` file in the project root
   - Add the following line:
     ```
     VITE_GOOGLE_CLIENT_ID=your-client-id-here
     ```

## Testing Google Authentication

1. Start your application locally
2. Navigate to the Sign In or Sign Up page
3. Click the "Sign in with Google" or "Sign up with Google" button
4. Complete the Google authentication flow
5. You should be redirected to the appropriate page based on your user role

## Troubleshooting

If you encounter issues with Google Authentication:

- Ensure your Client ID is correctly set in the application
- Check that your authorized origins and redirect URIs match your actual application URLs
- Verify that the Google OAuth API is enabled in your Google Cloud Console
- Check browser console for any errors related to OAuth

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://github.com/MomenSherif/react-oauth) 
"use server";

import { signIn, signOut } from "@/auth";

export async function socialAuthLogin(formData: FormData): Promise<void> {
  const action = formData.get("action") as string | null;

  if (!action) {
    throw new Error("Action is required for social login.");
  }

  await signIn(action, { redirectTo: "/" });
}

export async function userLogOut(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
export async function credentialLogin(formData: FormData): Promise<{
  error?: string;
  ok: boolean;
  email?: string;
  userOtp?: string;
}> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validate inputs
  if (!email || !password) {
    return { error: "Email and password are required.", ok: false };
  }

  // Check API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return {
      error: "Internal server error. Please try again later.",
      ok: false,
    };
  }

  try {
    // Use POST method to send credentials
    const response = await fetch(`${apiUrl}/api/user/login`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Send data in the body
    });

    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Authentication failed.",
        ok: false,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      email: data.email,
      userOtp: data.userOtp,
    };
  } catch (err) {
    console.error("Error during credential login:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
      ok: false,
    };
  }
}

export async function credentialLoginOtpCheck(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  console.log("FormData Entries:", Object.fromEntries(formData.entries())); // Debugging

  const email = formData.get("email") as string | null;
  const otp = formData.get("otp") as string | null;

  // Validate input
  if (!email || !otp) {
    return { error: "Email and otp are required.", ok: false };
  }

  try {
    // Call NextAuth signIn with credentials
    const response = await signIn("credentials", {
      email,
      otp,
      redirect: false, // Prevent automatic redirection
    });

    console.log("check this message 99", response);

    // Ensure a valid response is returned
    if (!response) {
      return {
        error: "Unexpected error: No response from signIn.",
        ok: false,
      };
    }

    if (!response) {
      return {
        error: response.error || "Invalid login credentials.",
        ok: false,
      };
    }

    // Successful login
    return {
      ok: true,
      url: response.url, // Redirect URL if provided
    };
  } catch (err) {
    console.error("Error during credential login:", err);
    return {
      error: "An unexpected error occurred during login.",
      ok: false,
    };
  }
}

export async function userSignUp(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  const requiredFields = ["email", "password", "phone", "businessName"];
  const data = Object.fromEntries(formData.entries());

  for (const field of requiredFields) {
    if (!data[field]) {
      return { error: `${field} is required.`, ok: false };
    }
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/user/register`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { error } = await response.json().catch(() => ({}));
      return {
        error: error || "Failed to register. Please try again.",
        ok: false,
      };
    }

    return {
      ok: true,
      url: response.url,
    };
  } catch (err) {
    console.error("Error during user sign-up:", err);
    return {
      error: "A network error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function userSignUpOtpCheck(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  console.log("FormData Entries:", Object.fromEntries(formData.entries()));
  const email = formData.get("email") as string | null;
  const otp = formData.get("otp") as string | null;

  if (!email || !otp) {
    return { error: "Email and OTP are required.", ok: false };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/user/verify`, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData?.message || "Invalid OTP or server error.",
        ok: false,
      };
    }

    const responseData = await response.json();
    return {
      ok: true,
      url: responseData?.url || "",
    };
  } catch (err) {
    console.error("Error during OTP verification:", err);
    return {
      error: "An unexpected error occurred during OTP verification.",
      ok: false,
    };
  }
}

export async function userForgetPasswordProcess(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  const email = formData.get("email") as string | null;

  if (!email) {
    return {
      error: "Email is required.",
      ok: false,
    };
  }

  // Check API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return {
      error: "Internal server error. Please try again later.",
      ok: false,
    };
  }

  try {
    const response = await fetch(`${apiUrl}/api/user/forget-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        error:
          responseData?.error ||
          "Failed to process your request. Please try again.",
        ok: false,
      };
    }
    return {
      ok: true,
      url: responseData?.url || response.url,
    };
  } catch (err) {
    console.error("Error during forget password process:", err);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function userForgetPasswordProcessOtpCheck(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  console.log("FormData Entries:", Object.fromEntries(formData.entries()));
  const email = formData.get("email") as string | null;
  const otp = formData.get("otp") as string | null;

  if (!email || !otp) {
    return { error: "Email and OTP are required.", ok: false };
  }

  // Check API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return {
      error: "Internal server error. Please try again later.",
      ok: false,
    };
  }

  try {
    const response = await fetch(`${apiUrl}/api/user/forget-password/verify`, {
      method: "POST", // Corrected the HTTP method capitalization
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      // Attempt to parse error details from the response
      const errorData = await response.json().catch(() => null);
      return {
        error:
          errorData?.error ||
          "Failed to process your request. Please try again.",
        ok: false,
      };
    }

    const responseData = await response.json();
    return {
      ok: true,
      url: responseData?.url || "",
    };
  } catch (err) {
    console.error("Error during OTP verification:", err);
    return {
      error: "An unexpected error occurred during OTP verification.",
      ok: false,
    };
  }
}

export async function userForgetPasswordRecovery(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  console.log("FormData Entries:", Object.fromEntries(formData.entries()));

  const email = formData.get("email") as string | null;
  const newPassword = formData.get("newPassword") as string | null;

  if (!email || !newPassword) {
    return { error: "Email and New Password are required.", ok: false };
  }

  // Check API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return {
      error: "Internal server error. Please try again later.",
      ok: false,
    };
  }

  try {
    const response = await fetch(
      `${apiUrl}/api/user/forget-password/recovery`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData?.message || "Invalid New Password or server error.",
        ok: false,
      };
    }

    const responseData = await response.json();
    return {
      ok: true,
      url: responseData?.url || "",
    };
  } catch (err) {
    console.error("Error during New Password verification:", err);

    return {
      error: "An unexpected error occurred during New Password verification.",
      ok: false,
    };
  }
}

"use server";

import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

interface UserDataResponse {
  error?: string;
  ok: boolean;
  data?: any;
}

export async function getUserData(): Promise<UserDataResponse> {
  const session = await auth();

  // Check for authentication and access token
  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
        next: { revalidate: 360 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch user data:", errorData);
      return {
        error: errorData?.message || "Failed to fetch user data.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data: data?.payload?.user || null,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

export async function updateUserData(
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const file = formData.get("image");
  // Retrieve the user session to check if authenticated
  const session = await auth();

  // // Check for authentication and access token
  // if (!session?.user?.accessToken) {
  //   return {
  //     error: "User is not authenticated.",
  //     ok: false,
  //   };
  // }

  // console.log("check this data value 63", session);

  // if (!file || typeof file === "string") {
  //   return { message: "Invalid file", status: 400 };
  // }

  try {
    // Make the API request to update user data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/update-user`,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: formData,
      }
    );

    revalidateTag("userDataUpdate");

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user data.",
        ok: false,
      };
    }

    // Parse the response data if the update is successful
    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    // Log unexpected errors
    console.error("Error updating user data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function userImageUpload(
  formData: FormData
): Promise<{ message: string; status: number }> {
  const file = formData.get("image");

  const session = await auth();

  // Check for authentication and access token
  // if (!session?.user?.accessToken) {
  //   return {
  //     error: "User is not authenticated.",
  //     ok: false,
  //   };
  // }

  if (!file || typeof file === "string") {
    return { message: "Invalid file", status: 400 };
  }

  const response = await fetch("http://localhost:8000/api/update-user", {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    return { message: "Failed to upload image", status: response.status };
  }

  return { message: "Image uploaded successfully", status: 200 };
}

//  update user password

export async function updateUserPassword(
  formData: FormData
): Promise<{ error?: string; ok: boolean }> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password-otpcheck`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user password.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error updating user password:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function updateUserPasswordOtpVerify(
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password-verify`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user data.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error updating user password:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

//  update user email

export async function updateUserEmail(
  formData: FormData
): Promise<{ error?: string; ok: boolean }> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/email-change-otpcheck`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user email.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error updating user email", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function updateUserEmailOtpVerify(
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/email-change-verify`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user data.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error updating user email:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

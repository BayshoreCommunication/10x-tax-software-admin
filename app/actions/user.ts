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
        next: { tags: ["taxRangeSheetUpdate"], revalidate: 360 },
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

// Get all user list

export async function getAllUserData(
  search: string = "",
  page: number = 1,
  limit: number = 10000
): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  try {
    const query = new URLSearchParams({
      search: search,
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
        next: {
          tags: [""],
        },
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
      data: data?.payload || null,
    };
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return {
      error:
        error?.message ||
        "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

// export async function getAllUserData(
//   search: string = "",
//   page: number = 1,
//   limit: number = 10000
// ): Promise<UserDataResponse> {
//   const session = await auth();

//   if (!session?.user?.accessToken) {
//     return {
//       error: "User is not authenticated.",
//       ok: false,
//     };
//   }

//   try {
//     const query = new URLSearchParams({
//       search,
//       page: page.toString(),
//       limit: limit.toString(),
//     }).toString();

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${session.user.accessToken}`,
//         },
//         next: { tags: ["userUpdate", "userDelete"], revalidate: 360 },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Failed to fetch user data:", errorData);
//       return {
//         error: errorData?.message || "Failed to fetch user data.",
//         ok: false,
//         data: null,
//       };
//     }

//     const data = await response.json();

//     return {
//       ok: true,
//       data: data?.payload || null,
//     };
//   } catch (error: any) {
//     console.error("Error fetching user data:", error);
//     return {
//       error:
//         error?.message ||
//         "An unexpected error occurred. Please try again later.",
//       ok: false,
//       data: null,
//     };
//   }
// }

// User delted by id

export async function userDeletedById(id: string): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
      data: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
      }
    );
    revalidateTag("userDelete");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete user:", errorData);
      return {
        error: errorData?.message || "Failed to delete user.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data: data?.payload || null,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

// User delted by id

export async function userSubscriptionById(
  id: string,
  search: string = "",
  page: number = 1,
  limit: number = 100,
  selectFilterOption: string = "All" // New parameter for filtering
): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
      data: null,
    };
  }

  try {
    const queryParams = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
      selectFilterOption, // Add filter option to query params
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subscription/${id}?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
      }
    );

    revalidateTag("userUpdate");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch subscription data:", errorData);
      return {
        error: errorData?.message || "Failed to fetch subscription data.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data: data?.payload || null,
    };
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

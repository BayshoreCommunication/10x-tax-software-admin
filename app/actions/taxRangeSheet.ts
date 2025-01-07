"use server";

import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

interface UserDataResponse {
  error?: string;
  ok: boolean;
  data?: any;
}

export async function getTaxRangeSheetData(): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tax-range-sheet`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken}`,
        },
        next: { tags: ["taxRangeSheetUpdate"], revalidate: 360 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch tax range sheet data:", errorData);
      return {
        error: errorData?.message || "Failed to fetch tax range sheet data.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();

    const taxRangeSheet = data?.payload?.taxRangeSheet || null;

    return {
      ok: true,
      data: taxRangeSheet,
    };
  } catch (error) {
    console.error("Error fetching tax range sheet data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

export async function updateTaxRangeSheetData(
  taxData: Record<string, any>,
  id: string
): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tax-range-sheet/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
        body: JSON.stringify({ taxRates: taxData }),
      }
    );
    revalidateTag("taxRangeSheetUpdate");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update tax range sheet data:", errorData);
      return {
        error: errorData?.message || "Failed to update tax range sheet data.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();
    const taxRangeSheet = data?.payload?.taxRangeSheet || null;

    return {
      ok: true,
      data: taxRangeSheet,
    };
  } catch (error) {
    console.error("Error updating tax range sheet data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

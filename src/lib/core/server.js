"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

// Helper to determine if an error is an internal Next.js redirect token
const isNextRedirect = (error) => {
  return (
    error &&
    (error.digest?.includes("NEXT_REDIRECT") ||
      error.message?.includes("NEXT_REDIRECT"))
  );
};

export const authHeader = async () => {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
};

const handleStatusCode = (res, errorData = {}) => {
  // Prints the true backend error data directly to your terminal window running Next.js
  console.error("❌ BACKEND ERROR DETAILS:", {
    status: res.status,
    statusText: res.statusText,
    errorData: errorData,
  });

  const errorMessage =
    errorData.message ||
    errorData.error ||
    (typeof errorData === "string" ? errorData : null) ||
    `Request failed with status ${res.status}`;

  switch (res.status) {
    case 401:
      console.warn("Unauthorized request. Access tokens may be expired.");
      redirect("/unauthorized");
      break;
    case 403:
      console.warn("Forbidden. You do not have permission.");
      redirect("/forbidden");
      break;
    case 404:
      console.warn("Resource not found.");
      redirect("/not-found");
      break;
    case 500:
      console.error("Internal Server Error.");
      break;
    default:
      console.error(`HTTP Error: ${res.status}`);
  }

  throw new Error(errorMessage);
};

// Internal utility to securely pull error bodies regardless of format (JSON vs HTML/Text)
const parseErrorResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return { message: "Failed to parse JSON error response from server." };
    }
  } else {
    try {
      const textError = await res.text();
      return {
        message: textError || `Request failed with status ${res.status}`,
      };
    } catch {
      return {
        message: `Server returned status ${res.status} with an unreadable body.`,
      };
    }
  }
};

export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`);

    if (!res.ok) {
      const errorData = await parseErrorResponse(res);
      throw new Error(
        errorData.message || `Fetch failed with status ${res.status}`,
      );
    }

    return await res.json();
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    console.error(`Server Fetch error at ${path}:`, error);
    throw error;
  }
};

export const protectedFetch = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`, {
      headers: await authHeader(),
    });

    if (!res.ok) {
      const errorData = await parseErrorResponse(res);
      handleStatusCode(res, errorData);
    }

    return res.json();
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    console.error(`Protected Fetch error at ${path}:`, error);
    throw error;
  }
};

/**
 * Core utility for mutating data (POST, PUT, PATCH, DELETE) with robust error handling.
 */
export const serverMutation = async (path, data, method = "POST") => {
  try {
    console.log(`🚀 Request Method: ${method} | URL: ${baseURL}${path}`);

    const res = await fetch(`${baseURL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
      const errorData = await parseErrorResponse(res);
      handleStatusCode(res, errorData);
    }

    if (res.status === 204) {
      return { success: true };
    }

    return await res.json();
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    console.error(`Mutation failed at [${method}] ${path}:`, error);
    throw error;
  }
};

"use server";

import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  return header;
};

const handleStatusCode = (res, errorData = {}) => {
  const errorMessage =
    errorData.message || `Request failed with status ${res.status}`;

  switch (res.status) {
    case 401:
      console.warn("Unauthorized request. Access tokens may be expired.");
      redirect("/unauthorized"); // ✅ Fixed: NOT inside try/catch
      break;
    case 403:
      console.warn("Forbidden. You do not have permission.");
      redirect("/forbidden"); // ✅ Fixed: NOT inside try/catch
      break;
    case 404:
      console.warn("Resource not found.");
      redirect("/not-found"); // ✅ Fixed: NOT inside try/catch
      break;
    case 500:
      console.error("Internal Server Error.");
      break;
    default:
      console.error(`HTTP Error: ${res.status}`);
  }

  throw new Error(errorMessage);
};

export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`);

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }
      throw new Error(
        errorData.message || `Fetch failed with status ${res.status}`,
      );
    }

    return await res.json();
  } catch (error) {
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
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = {};
      }

      // ✅ Fix: Call handleStatusCode, but DO NOT wrap it in try/catch where it is called!
      // It contains redirect(), which Next.js needs to throw natively.
      handleStatusCode(res, errorData);
    }

    return res.json();
  } catch (error) {
    // 🛑 CRITICAL FIX: If Next.js throws a redirect, we must re-throw it so the redirect works!
    if (error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

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
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { message: "An unknown error occurred" };
      }

      // ✅ Fix: Call handleStatusCode, but do not catch the redirect here
      handleStatusCode(res, errorData);
    }

    if (res.status === 204) {
      return { success: true };
    }

    return await res.json();
  } catch (error) {
    // 🛑 CRITICAL FIX: If Next.js throws a redirect, we must re-throw it!
    if (error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error(`Mutation failed at [${method}] ${path}:`, error);
    throw error;
  }
};

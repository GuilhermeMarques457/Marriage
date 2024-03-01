"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { UserLogin } from "@/models/auth/user.login";
import { UserAuthenticated } from "@/models/auth/user.authenticated";
import Http from "../http";
import { UserRegister } from "@/models/auth/user.register";

const API_URL = "https://localhost:5000/api";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function login(prevState: any, formData: any) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const login: UserLogin = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const http = new Http();
  const userAuthenticated = await http.post<UserLogin, UserAuthenticated>(
    `${API_URL}/Account/Login`,
    login
  );

  return userAuthenticated;

  // await saveMeal(meal);
  // revalidatePath("/meals");
  // To all pages
  // revalidatePath( "/", "layout");
  // redirect("/meals");
}

export async function register(prevState: any, formData: any) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const register: UserRegister = {
    email: formData.get("email"),
    personName: formData.get("name"),
    phoneNumber: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  console.log(register);

  const http = new Http();
  const userAuthenticated = await http.post<UserLogin, UserAuthenticated>(
    `${API_URL}/Account/Register`,
    register
  );

  return userAuthenticated;

  // await saveMeal(meal);
  // revalidatePath("/meals");
  // To all pages
  // revalidatePath( "/", "layout");
  // redirect("/meals");
}

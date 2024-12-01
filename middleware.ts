import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/signin", req.url))
  }
});


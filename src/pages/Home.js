import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

export default function Home({ isSignedIn }) {
  return isSignedIn ? (
    <div>
      <p>Hello!</p>
    </div>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

"use client";

import { useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import config from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

// Configure Amplify in client-side code
Amplify.configure(config);

const client = generateClient<Schema>();

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Learning Management System</h1>
          <p className="text-gray-600">A platform for teachers and students to create and manage educational content</p>
        </div>

        <Authenticator>
          {({ user, signOut }) => {
            // Redirect to dashboard after successful sign-in
            useEffect(() => {
              if (user) {
                // Check user role attribute to determine which dashboard to show
                const userRole = (user as any).attributes?.role;

                if (userRole === 'teacher') {
                  router.push("/dashboard/teacher");
                } else if (userRole === 'student') {
                  router.push("/dashboard/student");
                } else {
                  // If role is not set, default to student dashboard
                  // In a production app, you might want to redirect to a role selection page
                  console.warn("User role not set, defaulting to student dashboard");
                  router.push("/dashboard/student");
                }
              }
            }, [user]);

            return (
              <div className="text-center">
                <p className="mb-4 text-green-600">Successfully signed in! Redirecting to dashboard...</p>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Sign out
                </button>
              </div>
            );
          }}
        </Authenticator>
      </div>
    </main>
  );
}
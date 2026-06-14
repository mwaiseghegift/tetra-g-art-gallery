"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { updateCurrentUser } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";

export default function SettingsPage() {
  const { user, accessToken } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;

    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await updateCurrentUser(
        { first_name: firstName, last_name: lastName, email },
        accessToken
      );
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="max-w-xl">
        <h2 className="mb-4 font-serif text-xl text-offwhite">Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input id="username" label="Username" value={user?.username ?? ""} disabled />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              id="first_name"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              id="last_name"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="text-sm text-terracotta" role="alert">
              {error}
            </p>
          )}
          {success && <p className="text-sm text-gold">Profile updated.</p>}

          <div className="flex justify-end">
            <Button type="submit" variant="primary" className="text-xs" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

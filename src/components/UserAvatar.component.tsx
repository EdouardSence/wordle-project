import { Avatar } from "react-native-paper";
import { auth } from "../config/firebase";

function getInitials(email: string | undefined): string {
  if (!email) return "NA";
  const parts = email.split("@")[0].split(".");
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export default function UserAvatar() {
  return <Avatar.Text size={40} label={getInitials(auth.currentUser?.email)} />;
}

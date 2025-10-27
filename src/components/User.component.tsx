import Avatar from "@mui/material/Avatar";
import { auth } from "../config/firebase";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import { StyleSheet } from "react-native";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const parts = name.split(" ").filter(Boolean);
  let initials = "";

  if (parts.length === 0) {
    initials = "?";
  } else if (parts.length === 1) {
    initials = parts[0][0];
  } else {
    initials = `${parts[0][0]}${parts[1][0]}`;
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}
export default function User() {
  return (
    <div>
      <ButtonBase onClick={() => {}}>
        <Avatar {...stringAvatar(auth.currentUser?.email || "")} />
      </ButtonBase>
      <Card style={styles.Card}>
        <div>{auth.currentUser?.email}</div>
        <ButtonBase onClick={() => {}}>Se déconnecter</ButtonBase>
      </Card>
    </div>
  );

}

  const styles = StyleSheet.create({
    Card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 16,
      marginTop: 8,
      backgroundColor: "#1A1A1B",
      borderRadius: 12,
    },
  });

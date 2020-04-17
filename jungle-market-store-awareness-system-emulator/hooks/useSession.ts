import { useContext } from "react";
import Session from "contexts/Session";

export default function useSession() {
  return useContext(Session);
}

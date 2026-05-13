import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestoreDb } from "@/core/persistence/firebase";

import type { Setting } from "../types";

function sanitizeSetting(userId: string, data?: Partial<Setting>): Setting {
  return {
    userId,
    monthlyLimit: data?.monthlyLimit ?? 500,
    currencyCode: data?.currencyCode ?? "PEN",
  };
}

function makeDefaultSetting(userId: string): Setting {
  return sanitizeSetting(userId);
}

export class SettingRepository {
  async get(userId: string): Promise<Setting> {
    const ref = doc(firestoreDb, "settings", userId);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      const defaultConfig = makeDefaultSetting(userId);
      await setDoc(ref, defaultConfig);
      return defaultConfig;
    }

    const data = snapshot.data() as Partial<Setting>;

    return sanitizeSetting(userId, data);
  }

  async save(config: Setting): Promise<void> {
    const ref = doc(firestoreDb, "settings", config.userId);
    await setDoc(ref, sanitizeSetting(config.userId, config));
  }
}

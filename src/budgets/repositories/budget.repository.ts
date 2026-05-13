import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { firestoreDb } from "@/core/persistence/firebase";

import type { Budget } from "../types";

export class BudgetRepository {
  private readonly collectionRef = collection(firestoreDb, "budgets");

  getCurrentPeriod(): string {
    return new Date().toISOString().slice(0, 7);
  }

  async listByUser(userId: string): Promise<Budget[]> {
    const q = query(
      this.collectionRef,
      where("userId", "==", userId),
      orderBy("period", "desc"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Budget),
    }));
  }

  async ensureMonthlySnapshot(budget: Budget): Promise<void> {
    const period = this.getCurrentPeriod();

    const q = query(
      this.collectionRef,
      where("userId", "==", budget.userId),
      where("period", "==", period),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(this.collectionRef, {
        userId: budget.userId,
        amount: budget.amount,
        period: period,
        spent: budget.spent,
        currency: budget.currency,
      });
    } else {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        amount: budget.amount,
        currency: budget.currency,
        spent: budget.spent,
      });
    }
  }
}

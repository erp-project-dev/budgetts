import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { Injectable } from "@/core/decorators/injectable.decorator";
import { firestoreDb } from "@/core/persistence/firebase";

import { getCurrentPeriod } from "@/shared/utils/date";

import type { Budget } from "../types";

@Injectable("budgetRepository")
export class BudgetRepository {
  private readonly collectionRef = collection(firestoreDb, "budgets");

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
    const period = getCurrentPeriod();

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

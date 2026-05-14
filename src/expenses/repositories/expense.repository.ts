/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { Injectable } from "@/core/decorators/injectable.decorator";
import { firestoreDb } from "@/core/persistence/firebase";

import type { Expense, NewExpenseInput, UpdateExpenseInput } from "../types";

function toExpenseRecord(id: string, data: any): Expense {
  return {
    id,
    userId: data.userId,
    amount: data.amount,
    categoryId: data.categoryId,
    ...(data.description ? { description: data.description } : {}),
    date: data.date.toDate(),
    currency: data.currency,
  };
}

@Injectable("expenseRepository")
export class ExpenseRepository {
  private readonly collectionRef = collection(firestoreDb, "expenses");

  async getTotalSpentForPeriod(
    userId: string,
    period: string,
  ): Promise<number> {
    const start = new Date(`${period}-01T00:00:00Z`);
    const end = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1),
    );

    const q = query(
      this.collectionRef,
      where("userId", "==", userId),
      where("date", ">=", Timestamp.fromDate(start)),
      where("date", "<", Timestamp.fromDate(end)),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.reduce((total, docSnapshot) => {
      const data = docSnapshot.data();
      return total + (Number(data.amount) || 0);
    }, 0);
  }

  async listByUser(userId: string): Promise<Expense[]> {
    const snapshot = await getDocs(
      query(this.collectionRef, where("userId", "==", userId)),
    );

    return snapshot.docs
      .map((docSnapshot) => toExpenseRecord(docSnapshot.id, docSnapshot.data()))
      .sort((left, right) => right.date.getTime() - left.date.getTime());
  }

  async create(input: NewExpenseInput): Promise<Expense> {
    const payload = {
      userId: input.userId,
      amount: input.amount,
      categoryId: input.categoryId,
      description: input.description?.trim() ?? null,
      date: Timestamp.fromDate(input.date),
      currency: input.currency,
    };

    const docRef = await addDoc(this.collectionRef, payload);

    return toExpenseRecord(docRef.id, payload);
  }

  async update(input: UpdateExpenseInput): Promise<Expense> {
    const docRef = doc(firestoreDb, "expenses", input.id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("Expense not found");
    }

    const current = snapshot.data();

    if (current.userId !== input.userId) {
      throw new Error("Expense does not belong to the current user");
    }

    const desc = input.description?.trim();
    await updateDoc(docRef, {
      amount: input.amount,
      categoryId: input.categoryId,
      description: desc || deleteField(),
    });

    return toExpenseRecord(input.id, {
      ...current,
      amount: input.amount,
      categoryId: input.categoryId,
      ...(desc ? { description: desc } : {}),
    });
  }

  async remove(userId: string, id: string): Promise<void> {
    void userId;
    await deleteDoc(doc(firestoreDb, "expenses", id));
  }
}

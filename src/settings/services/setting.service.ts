import { eventBus } from "@/core/events/event-bus";

import { BUDGET_TOPICS } from "@/budgets/listeners";

import { SettingRepository } from "../repositories/setting.repository";
import type { Setting } from "../types";

export class SettingService {
  private readonly repository: SettingRepository;

  constructor({ settingRepository }: { settingRepository: SettingRepository }) {
    this.repository = settingRepository;
  }

  get(userId: string): Promise<Setting> {
    return this.repository.get(userId);
  }

  async save(setting: Setting): Promise<void> {
    await this.repository.save(setting);
    void eventBus.emit(BUDGET_TOPICS.BUDGET_CHANGED, setting.userId);
  }
}

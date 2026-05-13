/* eslint-disable @typescript-eslint/no-explicit-any */
type EventHandler = (data: any) => void;

class EventBus {
  private subs = new Map<string, EventHandler>();

  on(topic: string, handler: EventHandler) {
    this.subs.set(topic, handler);

    return () => {
      if (this.subs.get(topic) === handler) {
        this.subs.delete(topic);
      }
    };
  }

  emit(topic: string, data?: any) {
    const handler = this.subs.get(topic);

    if (handler) {
      handler(data);
    }
  }
}

export const eventBus = new EventBus();

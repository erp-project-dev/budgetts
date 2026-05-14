/* eslint-disable @typescript-eslint/no-explicit-any */
type EventHandler = (data: any) => void;

class EventBus {
  private subs = new Map<string, Set<EventHandler>>();

  on(topic: string, handler: EventHandler) {
    if (!this.subs.has(topic)) {
      this.subs.set(topic, new Set());
    }

    const handlers = this.subs.get(topic)!;
    handlers.add(handler);

    return () => {
      handlers.delete(handler);

      if (handlers.size === 0) {
        this.subs.delete(topic);
      }
    };
  }

  emit(topic: string, data?: any) {
    const handlers = this.subs.get(topic);

    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error en listener de ${topic}:`, error);
        }
      });
    }
  }
}

export const eventBus = new EventBus();

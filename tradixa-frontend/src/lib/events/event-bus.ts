import type { DomainEvent, DomainEventName } from "./domain-events.types";

type EventHandler<TPayload = unknown> = (event: DomainEvent<TPayload>) => void;

const handlers = new Map<DomainEventName, EventHandler[]>();

export function subscribeToEvent(name: DomainEventName, handler: EventHandler): () => void {
  const existingHandlers = handlers.get(name) ?? [];
  handlers.set(name, [...existingHandlers, handler]);

  return () => {
    const nextHandlers = (handlers.get(name) ?? []).filter((item) => item !== handler);
    handlers.set(name, nextHandlers);
  };
}

export function publishEvent<TPayload>(event: DomainEvent<TPayload>): void {
  const eventHandlers = handlers.get(event.name) ?? [];
  eventHandlers.forEach((handler) => handler(event));
}

import { Variable } from 'astal';
import { Subscribable } from 'astal/binding';
import { Gtk } from 'astal/gtk3';

export class VarMap<K, V = Gtk.Widget> implements Subscribable {
  #map: Map<K, V>;
  #var = Variable<V[]>([]);

  #notify() {
    this.#var.set([...this.#map.values()]);
  }
  constructor(initialValue?: [K, V][]) {
    this.#map = new Map(initialValue);
    this.#notify();
  }

  get size() {
    return this.#map.size;
  }

  set(key: K, value: V) {
    this.#map.set(key, value);
    this.#notify();
  }

  delete(key: K) {
    this.#map.delete(key);
    this.#notify();
  }

  getItem(key: K): V | undefined {
    return this.#map.get(key);
  }

  getMap(): [K, V][] {
    return [...this.#map.entries()];
  }

  get(): V[] {
    return this.#var.get();
  }

  subscribe(callback: (value: V[]) => void): () => void {
    return this.#var.subscribe(callback);
  }
}

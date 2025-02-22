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

  private checkWidget(key: K) {
    const mapItem = this.#map.get(key);
    if (mapItem instanceof Gtk.Widget) {
      mapItem.destroy();
    }
  }

  set(key: K, value: V) {
    this.checkWidget(key);

    this.#map.set(key, value);
    this.#notify();
  }

  delete(key: K) {
    this.checkWidget(key);

    this.#map.delete(key);
    this.#notify();
  }

  get(): V[] {
    return this.#var.get();
  }

  subscribe(callback: (value: V[]) => void): () => void {
    return this.#var.subscribe(callback);
  }
}

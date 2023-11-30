import { unref, computed } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => {
    const unrefArgs = (args) => args.map(arg => unref(arg));
    return computed(() => func(...unrefArgs(args)));
  };
}

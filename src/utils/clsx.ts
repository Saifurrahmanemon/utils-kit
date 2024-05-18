/**
 * use cases:
* clsx('btn', 'primary'); // 'btn primary'
* clsx('btn', { active: true }); // 'btn active'
* clsx({ 'text-center': true }); // 'text-center'
* clsx({ 'text-center': false }); // ''
* clsx({ visible: true }, { hidden: true }); // 'visible hidden'
* clsx({ visible: true, hidden: true }); // 'visible hidden'
* clsx({ visible: true, hidden: false, selected: true }); // 'visible selected'
* clsx('list-item', ['flex', { 'justify-center': true, 'items-center': false }]); // 'list-item flex justify-center'
* clsx(
  'container',
  {
    'mx-auto': true,
    'max-w-md': false,
  },
  'p-4',
  { 'bg-white': true },
  ); // 'container mx-auto p-4 bg-white'
 * clsx({ active: true, disabled: true }, { active: false }); // 'disabled'
 * clsx('btn', () => 'primary'); // 'btn primary'
 * clsx('icon', () => 'icon-arrow-right'); // 'icon icon-arrow-right'
 * clsx(null, false, 'error', undefined, { success: null }, ''); // 'error'
 * clsx('btn', 'btn'); // 'btn'
 * clsx({ 'text-bold': true }, { 'text-bold': true }); // 'text-bold'
 *
 **/

type ClassObj = Record<string, any>;
type ClassValue =
  | ClassArray
  | ClassObj
  | Function
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassArray = Array<ClassValue>;

export default function clsx(...args: Array<ClassValue>): string {
  const classes: Set<string> = new Set();

  function clsxExe(...args: Array<ClassValue>) {
    args.forEach((arg) => {
      const argType = typeof arg;

      if (!arg) {
        return;
      }

      // check for string and numbers.
      if (argType === 'string' || argType === 'number') {
        classes.add(String(arg));
        return;
      }

      // check functions.
      if (argType === 'function') {
        const result = (arg as Function)();
        if (!result) {
          return;
        }

        classes.add(String(result));
      }

      // check arrays.
      if (Array.isArray(arg)) {
        for (const cls of arg) {
          clsxExe(cls);
        }

        return;
      }

      // check objects.
      if (argType === 'object') {
        const objArg = arg as ClassObj;
        for (const key in objArg) {
          // use Object.hasOwn()
          if (Object.prototype.hasOwnProperty.call(objArg, key)) {
            objArg[key] ? classes.add(key) : classes.delete(key);
          }
        }

        return;
      }
    });
  }

  clsxExe(args);

  return Array.from(classes).join(' ');
}

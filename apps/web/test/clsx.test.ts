import { describe, expect, test } from 'vitest';

import clsx from '../src/utils/clsx';

describe('clsx', () => {
  test('handles empty input', () => {
    expect(clsx([])).toEqual('');
  });

  test('handles single class', () => {
    expect(clsx('btn')).toEqual('btn');
  });

  test('combines two classes', () => {
    expect(clsx('btn', 'primary')).toEqual('btn primary');
  });

  test('combines array of classes', () => {
    expect(clsx(['btn', 'primary', 'large'])).toEqual('btn primary large');
  });

  test('handles object with class conditions', () => {
    expect(clsx({ 'text-center': true })).toEqual('text-center');
    expect(clsx({ 'text-center': false })).toEqual('');
    expect(clsx({ active: true }, { disabled: true })).toEqual(
      'active disabled'
    );
    expect(clsx({ active: true, disabled: false, hidden: true })).toEqual(
      'active hidden'
    );
  });

  test('combines mixed values', () => {
    expect(
      clsx('container', { flex: true, hidden: false }, 'mx-auto', {
        'max-w-md': true
      })
    ).toEqual('container flex mx-auto max-w-md');
    expect(
      clsx('card', true && 'shadow', false && 'rounded', {
        'p-4': true,
        'bg-white': false,
        border: 1
      })
    ).toEqual('card shadow p-4 border');
  });

  test('ignores falsey values', () => {
    expect(
      clsx(null, false, 'text-red-500', undefined, 0, 1, { error: null }, '')
    ).toEqual('text-red-500 1');
  });

  test('flattens arrays', () => {
    expect(
      clsx('item', ['flex', { 'justify-center': true, 'items-center': false }])
    ).toEqual('item flex justify-center');
    expect(clsx('nav', ['flex', ['space-x-4', ['list-none']]])).toEqual(
      'nav flex space-x-4 list-none'
    );
  });

  describe('duplicate values', () => {
    test('isolated', () => {
      expect(clsx('btn', 'btn')).toEqual('btn');
    });

    test('composite', () => {
      expect(clsx('btn', 'primary', 'btn')).toEqual('btn primary');
      expect(clsx('btn', { btn: true }, 'primary')).toEqual('btn primary');
      expect(clsx({ btn: true }, { primary: true }, { btn: true })).toEqual(
        'btn primary'
      );
      expect(clsx(1, '1')).toEqual('1');
      expect(clsx('btn', 1, '1')).toEqual('btn 1');
    });

    test('nested', () => {
      expect(clsx('btn', ['btn'])).toEqual('btn');
      expect(clsx('btn', [{ btn: true }])).toEqual('btn');
      expect(clsx([{ btn: true }, { btn: true }])).toEqual('btn');
      expect(clsx([1], '1')).toEqual('1');
    });
  });

  describe('function values', () => {
    test('single', () => {
      expect(clsx(() => 'icon')).toEqual('icon');
    });

    test('composite', () => {
      expect(clsx(() => 'icon', 'mr-2', 'icon')).toEqual('icon mr-2');
      expect(clsx(() => 'icon', { icon: true }, 'mr-2')).toEqual('icon mr-2');
      expect(clsx(() => 1, '1')).toEqual('1');
      expect(clsx('icon', 1, () => '1')).toEqual('icon 1');
    });

    test('nested', () => {
      expect(clsx('icon', [() => 'icon'])).toEqual('icon');
      expect(clsx('icon', [{ icon: true }, () => 'mr-2'])).toEqual('icon mr-2');
    });
  });

  describe('turning off values', () => {
    test('single', () => {
      expect(clsx('btn', { btn: false })).toEqual('');
    });

    test('on before off', () => {
      expect(clsx(() => 'btn', 'primary', { btn: false })).toEqual('primary');
      expect(clsx(() => 'btn', { btn: true }, 'primary')).toEqual(
        'btn primary'
      );
      expect(clsx(() => 1, '1', { 1: false })).toEqual('');
      expect(clsx('btn', 1, () => '1')).toEqual('btn 1');
    });

    test('off before on', () => {
      expect(clsx(() => 'btn', 'primary', { btn: false }, 'btn')).toEqual(
        'primary btn'
      );
      expect(
        clsx(() => 'btn', { btn: false }, { btn: true }, 'primary')
      ).toEqual('btn primary');
      expect(clsx(() => 1, '1', { 1: false }, 1)).toEqual('1');
    });

    describe('nested', () => {
      test('turn off in nested', () => {
        expect(clsx('btn', [{ btn: false }])).toEqual('');
        expect(clsx('btn', [() => 'btn', { btn: false }])).toEqual('');
      });

      test('turn on in nested', () => {
        expect(clsx('btn', [{ btn: false }, 'btn'])).toEqual('btn');
        expect(clsx('btn', [{ btn: false }, 'btn', { btn: false }])).toEqual(
          ''
        );
      });
    });
  });
});

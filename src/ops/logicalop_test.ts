/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '../index';
import {ALL_ENVS, describeWithFlags, expectArraysClose} from '../test_util';
import * as util from '../util';

const boolNaN = util.getNaN('bool');

describeWithFlags('logicalNot', ALL_ENVS, () => {
  it('Tensor1D.', () => {
    let a = tf.tensor1d([1, 0, 0], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 1, 1]);

    a = tf.tensor1d([0, 0, 0], 'bool');
    expectArraysClose(tf.logicalNot(a), [1, 1, 1]);

    a = tf.tensor1d([1, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 0]);
  });
  it('NaNs in Tensor1D', () => {
    const a = tf.tensor1d([1, NaN, 0], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, boolNaN, 1]);
  });
  it('Tests chaining in Tensor1D', () => {
    let a = tf.tensor1d([1, 0, 0], 'bool');
    expectArraysClose(a.logicalNot(), [0, 1, 1]);

    a = tf.tensor1d([0, 0, 0], 'bool');
    expectArraysClose(a.logicalNot(), [1, 1, 1]);

    a = tf.tensor1d([1, 1], 'bool');
    expectArraysClose(a.logicalNot(), [0, 0]);
  });

  it('Tensor2D', () => {
    let a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 1, 0, 1, 1, 1]);

    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    expectArraysClose(tf.logicalNot(a), [1, 1, 1, 0, 0, 0]);
  });
  it('NaNs in Tensor2D', () => {
    const a = tf.tensor2d([[1, NaN], [0, NaN]], [2, 2], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, boolNaN, 1, boolNaN]);
  });

  it('Tensor3D', () => {
    let a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 1, 0, 1, 1, 1]);

    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [1, 1, 1, 0, 0, 0]);
  });
  it('NaNs in Tensor3D', () => {
    const a =
        tf.tensor3d([[[1], [NaN], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, boolNaN, 0, 1, 1, 1]);
  });

  it('Tensor4D', () => {
    let a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 1, 0, 1]);

    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [1, 1, 1, 1]);

    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, 0, 0, 0]);
  });
  it('NaNs in Tensor4D', () => {
    const a = tf.tensor4d([1, NaN, 1, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalNot(a), [0, boolNaN, 0, 1]);
  });
});

describeWithFlags('logicalAnd', ALL_ENVS, () => {
  it('Tensor1D.', () => {
    let a = tf.tensor1d([1, 0, 0], 'bool');
    let b = tf.tensor1d([0, 1, 0], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0]);

    a = tf.tensor1d([0, 0, 0], 'bool');
    b = tf.tensor1d([0, 0, 0], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0]);

    a = tf.tensor1d([1, 1], 'bool');
    b = tf.tensor1d([1, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [1, 1]);
  });
  it('mismatched Tensor1D shapes', () => {
    const a = tf.tensor1d([1, 0], 'bool');
    const b = tf.tensor1d([0, 1, 0], 'bool');
    const f = () => {
      tf.logicalAnd(a, b);
    };
    expect(f).toThrowError();
  });
  it('NaNs in Tensor1D', () => {
    const a = tf.tensor1d([1, NaN, 0], 'bool');
    const b = tf.tensor1d([0, 0, NaN], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, boolNaN, boolNaN]);
  });

  it('Tensor2D', () => {
    let a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
    let b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0, 0, 0, 0]);

    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0, 1, 1, 1]);
  });
  it('broadcasting Tensor2D shapes', () => {
    const a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
    const b = tf.tensor2d([[0, 1, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 1, 0, 0, 0, 0]);
  });
  it('NaNs in Tensor2D', () => {
    const a = tf.tensor2d([[1, NaN], [0, NaN]], [2, 2], 'bool');
    const b = tf.tensor2d([[0, NaN], [1, NaN]], [2, 2], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, boolNaN, 0, boolNaN]);
  });

  it('Tensor3D', () => {
    let a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [1]]], [2, 3, 1], 'bool');
    let b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 1, 0, 0, 0]);

    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0, 1, 1, 1]);
  });
  it('broadcasting Tensor3D shapes', () => {
    const a = tf.tensor3d(
        [[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2],
        'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(
        tf.logicalAnd(a, b), [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]);
  });
  it('NaNs in Tensor3D', () => {
    const a =
        tf.tensor3d([[[1], [NaN], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [NaN]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, boolNaN, 1, 0, 0, boolNaN]);
  });

  it('Tensor4D', () => {
    let a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    let b = tf.tensor4d([0, 1, 1, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 1, 0]);

    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, 0, 0, 0]);

    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [1, 1, 1, 1]);
  });
  it('broadcasting Tensor4D shapes', () => {
    const a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d(
        [[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [1, 0, 0, 0, 0, 0, 0, 0]);
  });
  it('NaNs in Tensor4D', () => {
    const a = tf.tensor4d([1, NaN, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d([0, 1, 0, NaN], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalAnd(a, b), [0, boolNaN, 0, boolNaN]);
  });
});

describeWithFlags('logicalOr', ALL_ENVS, () => {
  it('Tensor1D.', () => {
    let a = tf.tensor1d([1, 0, 0], 'bool');
    let b = tf.tensor1d([0, 1, 0], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1, 0]);

    a = tf.tensor1d([0, 0, 0], 'bool');
    b = tf.tensor1d([0, 0, 0], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [0, 0, 0]);

    a = tf.tensor1d([1, 1], 'bool');
    b = tf.tensor1d([1, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1]);
  });
  it('mismatched Tensor1D shapes', () => {
    const a = tf.tensor1d([1, 0], 'bool');
    const b = tf.tensor1d([0, 1, 0], 'bool');
    const f = () => {
      tf.logicalOr(a, b);
    };
    expect(f).toThrowError();
  });
  it('NaNs in Tensor1D', () => {
    const a = tf.tensor1d([1, NaN, 0], 'bool');
    const b = tf.tensor1d([0, 0, NaN], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, boolNaN, boolNaN]);
  });

  it('Tensor2D', () => {
    let a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
    let b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 0, 1, 0, 1, 0]);

    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [0, 0, 0, 1, 1, 1]);
  });
  it('broadcasting Tensor2D shapes', () => {
    const a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
    const b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1, 1, 0, 1, 0]);
  });
  it('NaNs in Tensor2D', () => {
    const a = tf.tensor2d([[1, NaN], [0, NaN]], [2, 2], 'bool');
    const b = tf.tensor2d([[0, NaN], [1, NaN]], [2, 2], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, boolNaN, 1, boolNaN]);
  });

  it('Tensor3D', () => {
    let a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    let b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 0, 1, 1, 0, 0]);

    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [0, 0, 0, 1, 1, 1]);
  });
  it('broadcasting Tensor3D shapes', () => {
    const a = tf.tensor3d(
        [[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2],
        'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0]);
  });
  it('NaNs in Tensor3D', () => {
    const a =
        tf.tensor3d([[[1], [NaN], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [NaN]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, boolNaN, 1, 1, 0, boolNaN]);
  });

  it('Tensor4D', () => {
    let a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    let b = tf.tensor4d([0, 1, 0, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1, 1, 0]);

    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [0, 0, 0, 0]);

    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1, 1, 1]);
  });
  it('broadcasting Tensor4D shapes', () => {
    const a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d(
        [[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, 1, 0, 0, 1, 1, 1, 1]);
  });
  it('NaNs in Tensor4D', () => {
    const a = tf.tensor4d([1, NaN, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d([0, 1, 0, NaN], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalOr(a, b), [1, boolNaN, 1, boolNaN]);
  });
});

describeWithFlags('logicalXor', ALL_ENVS, () => {
  it('Tensor1D.', () => {
    let a = tf.tensor1d([1, 0, 0], 'bool');
    let b = tf.tensor1d([0, 1, 0], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, 1, 0]);

    a = tf.tensor1d([0, 0, 0], 'bool');
    b = tf.tensor1d([0, 0, 0], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0, 0]);

    a = tf.tensor1d([1, 1], 'bool');
    b = tf.tensor1d([1, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0]);
  });
  it('mismatched Tensor1D shapes', () => {
    const a = tf.tensor1d([1, 0], 'bool');
    const b = tf.tensor1d([0, 1, 0], 'bool');
    const f = () => {
      tf.logicalXor(a, b);
    };
    expect(f).toThrowError();
  });
  it('NaNs in Tensor1D', () => {
    const a = tf.tensor1d([1, NaN, 0], 'bool');
    const b = tf.tensor1d([0, 0, NaN], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, boolNaN, boolNaN]);
  });

  // Tensor2D:
  it('Tensor2D', () => {
    let a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
    let b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, 0, 1, 0, 1, 0]);

    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0, 0, 0, 0, 0]);
  });
  it('broadcasting Tensor2D shapes', () => {
    const a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
    const b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, 1, 1, 0, 1, 0]);
  });
  it('NaNs in Tensor2D', () => {
    const a = tf.tensor2d([[1, NaN], [0, NaN]], [2, 2], 'bool');
    const b = tf.tensor2d([[0, NaN], [1, NaN]], [2, 2], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, boolNaN, 1, boolNaN]);
  });

  // Tensor3D:
  it('Tensor3D', () => {
    let a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    let b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, 0, 0, 1, 0, 0]);

    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0, 0, 0, 0, 0]);
  });
  it('broadcasting Tensor3D shapes', () => {
    const a = tf.tensor3d(
        [[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2],
        'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
    expectArraysClose(
        tf.logicalXor(a, b), [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]);
  });
  it('NaNs in Tensor3D', () => {
    const a =
        tf.tensor3d([[[1], [NaN], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    const b =
        tf.tensor3d([[[0], [0], [1]], [[1], [0], [NaN]]], [2, 3, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, boolNaN, 0, 1, 0, boolNaN]);
  });

  // Tensor4D:
  it('Tensor4D', () => {
    let a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    let b = tf.tensor4d([0, 1, 1, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, 1, 0, 0]);

    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0, 0, 0]);

    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 0, 0, 0]);
  });
  it('broadcasting Tensor4D shapes', () => {
    const a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d(
        [[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [0, 1, 0, 0, 1, 1, 1, 1]);
  });
  it('NaNs in Tensor4D', () => {
    const a = tf.tensor4d([1, NaN, 1, 0], [2, 2, 1, 1], 'bool');
    const b = tf.tensor4d([0, 1, 0, NaN], [2, 2, 1, 1], 'bool');
    expectArraysClose(tf.logicalXor(a, b), [1, boolNaN, 1, boolNaN]);
  });
});

describeWithFlags('where', ALL_ENVS, () => {
  it('Scalars.', () => {
    const a = tf.scalar(10);
    const b = tf.scalar(20);
    const c = tf.scalar(1, 'bool');

    expectArraysClose(tf.where(c, a, b), [10]);
  });
  it('Tensor1D', () => {
    const c = tf.tensor1d([1, 0, 1, 0], 'bool');
    const a = tf.tensor1d([10, 10, 10, 10]);
    const b = tf.tensor1d([20, 20, 20, 20]);
    expectArraysClose(tf.where(c, a, b), [10, 20, 10, 20]);
  });

  it('Tensor1D different a/b shapes', () => {
    let c = tf.tensor1d([1, 0, 1, 0], 'bool');
    let a = tf.tensor1d([10, 10, 10]);
    let b = tf.tensor1d([20, 20, 20, 20]);
    let f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    c = tf.tensor1d([1, 0, 1, 0], 'bool');
    a = tf.tensor1d([10, 10, 10, 10]);
    b = tf.tensor1d([20, 20, 20]);
    f = () => {
      tf.where(c, a, b);
    };
  });

  it('Tensor1D different condition/a shapes', () => {
    const c = tf.tensor1d([1, 0, 1, 0], 'bool');
    const a = tf.tensor1d([10, 10, 10]);
    const b = tf.tensor1d([20, 20, 20]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor2D', () => {
    const c = tf.tensor2d([[1, 0], [0, 1]], [2, 2], 'bool');
    const a = tf.tensor2d([[10, 10], [10, 10]], [2, 2]);
    const b = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
    expectArraysClose(tf.where(c, a, b), [10, 5, 5, 10]);
  });

  it('Tensor2D different a/b shapes', () => {
    let c = tf.tensor2d([[1, 1], [0, 0]], [2, 2], 'bool');
    let a = tf.tensor2d([[5, 5, 5], [5, 5, 5]], [2, 3]);
    let b = tf.tensor2d([[4, 4], [4, 4]], [2, 2]);
    let f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    c = tf.tensor2d([[1, 1], [0, 0]], [2, 2], 'bool');
    a = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
    b = tf.tensor2d([[4, 4, 4], [4, 4, 4]], [2, 3]);
    f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor2D different condition/a shapes', () => {
    const c = tf.tensor2d([[1, 0], [0, 1]], [2, 2], 'bool');
    const a = tf.tensor2d([[10, 10, 10], [10, 10, 10]], [2, 3]);
    const b = tf.tensor2d([[5, 5, 5], [5, 5, 5]], [2, 3]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor2D different `a` dimension w/ condition rank=1', () => {
    const c = tf.tensor1d([1, 0, 1, 0], 'bool');
    let a = tf.tensor2d([[10, 10], [10, 10]], [2, 2]);
    let b = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    a = tf.tensor2d([[10], [10], [10], [10]], [4, 1]);
    b = tf.tensor2d([[5], [5], [5], [5]], [4, 1]);
    expectArraysClose(tf.where(c, a, b), [10, 5, 10, 5]);

    a = tf.tensor2d([[10, 10], [10, 10], [10, 10], [10, 10]], [4, 2]);
    b = tf.tensor2d([[5, 5], [5, 5], [5, 5], [5, 5]], [4, 2]);
    expectArraysClose(tf.where(c, a, b), [10, 10, 5, 5, 10, 10, 5, 5]);
  });

  it('Tensor3D', () => {
    const c =
        tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    const a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
    const b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
    expectArraysClose(tf.where(c, a, b), [5, 3, 5, 3, 3, 3]);
  });

  it('Tensor3D different a/b shapes', () => {
    const c =
        tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
    let a = tf.tensor3d([[[5], [5]], [[5], [5]]], [2, 2, 1]);
    let b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
    let f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
    b = tf.tensor3d([[[3], [3]], [[3], [3]]], [2, 2, 1]);
    f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor3D different condition/a shapes', () => {
    const c = tf.tensor3d([[[1], [0]], [[0], [0]]], [2, 2, 1], 'bool');
    const a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
    const b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor3D different `a` dimension w/ condition rank=1', () => {
    const c = tf.tensor1d([1, 0, 1, 0], 'bool');
    let a = tf.tensor3d([[[9, 9], [9, 9]], [[9, 9], [9, 9]]], [2, 2, 2]);
    let b = tf.tensor3d([[[8, 8], [8, 8]], [[8, 8], [8, 8]]], [2, 2, 2]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    a = tf.tensor3d([[[9]], [[9]], [[9]], [[9]]], [4, 1, 1]);
    b = tf.tensor3d([[[8]], [[8]], [[8]], [[8]]], [4, 1, 1]);
    expectArraysClose(tf.where(c, a, b), [9, 8, 9, 8]);

    a = tf.tensor3d(
        [[[9], [9]], [[9], [9]], [[9], [9]], [[9], [9]]], [4, 2, 1]);
    b = tf.tensor3d(
        [[[8], [8]], [[8], [8]], [[8], [8]], [[8], [8]]], [4, 2, 1]);
    expectArraysClose(tf.where(c, a, b), [9, 9, 8, 8, 9, 9, 8, 8]);
  });

  it('Tensor4D', () => {
    const c = tf.tensor4d([1, 0, 1, 1], [2, 2, 1, 1], 'bool');
    const a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
    const b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
    expectArraysClose(tf.where(c, a, b), [7, 3, 7, 7]);
  });

  it('Tensor4D different a/b shapes', () => {
    const c = tf.tensor4d([1, 0, 1, 1], [2, 2, 1, 1], 'bool');
    let a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [2, 2, 2, 1]);
    let b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
    let f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
    b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 1]);
    f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor4D different condition/a shapes', () => {
    const c = tf.tensor4d([1, 0, 1, 1, 1, 0, 1, 1], [2, 2, 2, 1], 'bool');
    const a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
    const b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();
  });

  it('Tensor4D different `a` dimension w/ condition rank=1', () => {
    const c = tf.tensor1d([1, 0, 1, 0], 'bool');
    let a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [2, 2, 2, 1]);
    let b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 1]);
    const f = () => {
      tf.where(c, a, b);
    };
    expect(f).toThrowError();

    a = tf.tensor4d([7, 7, 7, 7], [4, 1, 1, 1]);
    b = tf.tensor4d([3, 3, 3, 3], [4, 1, 1, 1]);
    expectArraysClose(tf.where(c, a, b), [7, 3, 7, 3]);

    a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [4, 2, 1, 1]);
    b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [4, 2, 1, 1]);
    expectArraysClose(tf.where(c, a, b), [7, 7, 3, 3, 7, 7, 3, 3]);
  });
});

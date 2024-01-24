import { memo } from 'react';
import { ICounterProps } from '@/types';
import styles from './Counter.module.css';

const Counter = memo(function Counter({ type, counter, denominator }: ICounterProps) {
  return <p className={styles.counter}>{`${type} ${counter} / ${denominator}`}</p>;
});

export default Counter;

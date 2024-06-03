
"use client";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/app/lib/features/counter/counterSlice";


export default function Home() {
  const count = useSelector((state) => state.counter.value); 
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1> {/* Display the counter state */}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
// components/button/index.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 rounded bg-blue-600 text-white">
      2{children}
    </button>
  );
}

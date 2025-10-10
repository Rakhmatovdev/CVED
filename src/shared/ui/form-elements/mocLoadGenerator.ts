export function generateMockDaysLived(
  base2024: number = 0,
  amplitude: number = 100_000
): { data2024: number[]; data2025: number[]; labels: string[] } {
  const labels = [
    "Янв.",
    "Февр.",
    "Март.",
    "Апр.",
    "Май.",
    "Июн.",
    "Июл.",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек."
  ];
  const data2024: number[] = [];
  const data2025: number[] = [];
  for (let i = 0; i < 12; i++) {
    // 2024: smooth seasonal rise/fall + random noise
    const seasonal24 = base2024 + amplitude * Math.sin((i / 11) * Math.PI);
    data2024.push(
      Math.round(seasonal24 + (Math.random() - 0.5) * amplitude * 0.2)
    );
    // 2025: offset phase + more volatility
    const seasonal25 =
      base2024 + amplitude * Math.sin(((i + 3) / 11) * Math.PI);
    data2025.push(
      Math.round(seasonal25 + (Math.random() - 0.5) * amplitude * 0.3)
    );
  }
  return { data2024, data2025, labels };
}

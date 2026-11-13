// Custom async function: menunggu sekian milidetik (simulasi server lambat)
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
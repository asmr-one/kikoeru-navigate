/**
 * 测试延迟
 * 访问失败时返回 -1
 * @param url
 * @return {Promise<number>}
 */
export async function testLatency(url) {
  const start = performance.now();

  try {
    const result = await fetch(url, {method: 'GET'})
    if (result.ok) {
      return performance.now() - start;
    }
  } catch (e) {
  }

  return -1
}

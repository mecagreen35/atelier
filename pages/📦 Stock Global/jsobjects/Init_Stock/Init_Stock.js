export default {
  async charger() {
    const data = await Get_Stock_Global.run();
    if (data && data.length > 0) {
      await storeValue('cache_stock_global', data, false);
    }
  }
}
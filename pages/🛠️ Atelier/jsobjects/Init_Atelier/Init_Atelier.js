export default {
  async chargerDonnees() {
    // Lance les 3 grosses requêtes simultanément (3x plus rapide)
    const [globalData, persoData, planningData] = await Promise.all([
      Get_Atelier_Global.run(),
      Get_Atelier_Perso.run()
    ]);
    
    // Sauvegarde les résultats dans la mémoire locale d'Appsmith
    if (globalData?.length) await storeValue('cache_atelier_global', globalData);
    if (persoData?.length) await storeValue('cache_atelier_perso', persoData);
  }
}
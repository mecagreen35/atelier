export default {
  // Cette fonction va tout charger
  async initialiserPage() {
    try {
      // 1. On lance les 3 requêtes en même temps de façon transparente
      const [locations, flotte, calendrier] = await Promise.all([
        get_locations.run(),
        Get_Flotte_Location.run(),
        Get_Calendar_Locations.run()
      ]);

      // 2. Dès qu'elles ont fini, on sauvegarde les résultats en mémoire
      if (locations) await storeValue('cache_locations', locations);
      if (flotte) await storeValue('cache_flotte', flotte);
      if (calendrier) await storeValue('cache_calendrier', calendrier);
      
    } catch (error) {
      console.error("Erreur lors du chargement en arrière-plan", error);
    }
  }
}
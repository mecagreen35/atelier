export default {
  initialiserApp: async () => {
    // 1. On lance la requête pour obtenir le rôle (assure-toi d'avoir une requête Get_Role_User globale)
    const roleData = await Get_Role_User.run();
    
    // 2. On sauvegarde le rôle dans la mémoire d'Appsmith
    if (roleData && roleData.length > 0) {
      await storeValue('user_role', roleData[0].Role);
    } else {
      await storeValue('user_role', 'Mecano'); // Rôle par défaut
    }
  }
}
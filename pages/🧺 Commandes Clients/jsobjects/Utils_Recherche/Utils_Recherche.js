export default {
  // 1. Outil de recherche pour le grand tableau des commandes (Déjà existant)
  lancerRecherche: _.debounce(() => {
    resetWidget("Table_commande_client", true).then(() => Get_Commandes_Clients.run());
  }, 600),
  
  inp_search_commandeonTextChanged () {
    this.lancerRecherche();
  },

  // 2. Outil de recherche pour le menu déroulant des clients (NOUVEAU)
  chercherClient: _.debounce(() => {
    Get_Clients_Options.run();
  }, 400)
}
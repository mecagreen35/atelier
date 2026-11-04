export default {
    async AjouteronClick () {
        await Insert_Ligne_Commande.run();
        await Get_Lignes_Commande.run();
        await Get_Commandes_Clients.run();
        resetWidget('sel_article', true);
        resetWidget('inp_add_qte', true);
        showModal('Vue_detail_commande_client');
    }
}
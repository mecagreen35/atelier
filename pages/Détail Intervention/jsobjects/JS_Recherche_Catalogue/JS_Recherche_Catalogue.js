export default {
  timer: null,

  rechercherAvecDelai() {
    clearTimeout(this.timer);
    const terme = (inp_recherche_profonde.text || "").trim();
    if (terme.length < 4) {
      return;
    }
    this.timer = setTimeout(() => {
      Search_Catalogue_Profond.run();
    }, 600);
  },

  rechercherImmediat() {
    clearTimeout(this.timer);
    const terme = (inp_recherche_profonde.text || "").trim();
    if (terme.length >= 2) {
      Search_Catalogue_Profond.run();
    }
  },

  async selectionnerLigne(row) {
    try {
      // 1. On importe ou réactive l'article dans la base
      const res = await Importer_Ou_Reactiver_Article.run({
        origine: row.Origine,
        id_existant: row.ID_Article_Existant || null,
        ref_nue: row.Ref_Nue_Import,
        designation: row.Designation_Brute,
        marque: row.Marque,
        fournisseur: row.Fournisseur,
        prix_achat: row.Prix_Achat_HT,
        ean: row.EAN || null,
        anciennes_refs: row.Anciennes_References_Calc || null
      });

      const idArticle = res?.[0]?.id_article;
      if (!idArticle) {
        showAlert("Impossible de récupérer l'identifiant de l'article.", "error");
        return;
      }

      // 2. On sauvegarde l'ID pour que le Select le sélectionne automatiquement
      await storeValue("nouvel_article_id", idArticle);
      
      // 3. IMPORTANT : On rafraîchit la liste des articles pour que le nouveau soit visible !
      await Get_Articles_Options.run();

      // 4. On ferme la modale de recherche et on ouvre celle d'ajout de ligne
      closeModal("modal_add_article");
      showModal("modal_add_ligne");
      showAlert("Article prêt et sélectionné !", "success");
      
    } catch (err) {
      showAlert("Erreur lors de l'import : " + err.message, "error");
    }
  }
}
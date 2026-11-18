export default {
  timer: null,

  rechercherAvecDelai() {
    clearTimeout(this.timer);
    const terme = (inp_recherche_profonde.text || "").trim();
    if (terme.length < 3) {
      return;
    }
    this.timer = setTimeout(() => {
      Search_Catalogue_Profond.run();
    }, 350);
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

      await storeValue("nouvel_article_id", idArticle);
      await Get_Articles_Options.run();

      closeModal("modal_add_article");
      showModal("modal_add_ligne");
      showAlert("Article prêt et sélectionné !", "success");
    } catch (err) {
      showAlert("Erreur lors de l'import : " + err.message, "error");
    }
  }
}
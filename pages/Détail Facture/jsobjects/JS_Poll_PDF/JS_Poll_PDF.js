export default {
  async verifierPDF() {
    const res = await Get_Facture_ById.run();
    const facture = res[0] || Get_Facture_ById.data[0];

    // Si la facture n'a pas encore son lien PDF
    if (facture && (!facture.Lien_Facture || facture.Lien_Facture.trim() === '')) {
      let tentatives = 0;
      const maxTentatives = 15; // 15 essais de 2s = 30 secondes

      const interval = setInterval(async () => {
        tentatives++;
        const update = await Get_Facture_ById.run();
        const f = update[0] || Get_Facture_ById.data[0];

        if (f && f.Lien_Facture && f.Lien_Facture.trim() !== '') {
          clearInterval(interval);
          showAlert('📄 PDF chargé avec succès !', 'success');
        } else if (tentatives >= maxTentatives) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }
}
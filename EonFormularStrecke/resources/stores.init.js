if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
    CQ_Analytics.ProfileDataMgr.addListener("update", function(event, property) {
        var authorizableId = this.getProperty("authorizableId");
        if (!authorizableId || authorizableId == "anonymous") {
            $CQ(".cq-cc-profile-not-anonymous").hide();
            $CQ(".cq-cc-profile-anonymous").show();
        } else {
            $CQ(".cq-cc-profile-not-anonymous").show();
            $CQ(".cq-cc-profile-anonymous").hide();
        }
    });

    
        CQ_Analytics.ProfileDataMgr.loadInitProperties({
  "avatar": "/etc/designs/default/images/social/avatar.png",
  "path": "/home/users/a/anonymous/profile",
  "isLoggedIn": false,
  "isLoggedIn_xss": "false",
  "authorizableId": "anonymous",
  "authorizableId_xss": "anonymous",
  "formattedName": "anonymous",
  "formattedName_xss": "anonymous"
});
    

    CQ_Analytics.ProfileDataMgr.init();
}
if( CQ_Analytics && CQ_Analytics.SurferInfoMgr) {
    CQ_Analytics.SurferInfoMgr.loadInitProperties({
  "IP": "10.233.253.140",
  "keywords": ""
}, true);
}
if ( CQ_Analytics && CQ_Analytics.CampaignMgr ) {


	var campaigns = [{"path":"/content/campaigns/eon_de/pk_schlichtungsstelle","title":"pk_schlichtungsstelle","id":"content-campaigns-eon_de-pk_schlichtungsstelle","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_grundversorgungstromlinkersatzversorgung","title":"pk_grundversorgung_strom_link_ersatzversorgung","id":"content-campaigns-eon_de-pk_grundversorgungstromlinkersatzversorgung","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_grundversorgungstromlinkdoppeltarifniedertarifzeiten","title":"pk_grundversorgung_strom_link_doppeltarif_niedertarifzeiten","id":"content-campaigns-eon_de-pk_grundversorgungstromlinkdoppeltarifniedertarifzeiten","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_grundversorgung-erdgas","title":"pk_grundversorgung Erdgas","id":"content-campaigns-eon_de-pk_grundversorgung-erdgas","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_ersatzversorgung-strom","title":"pk_ersatzversorgung Strom","id":"content-campaigns-eon_de-pk_ersatzversorgung-strom","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_ersatzversorgung-erdgas","title":"pk_ersatzversorgung Erdgas","id":"content-campaigns-eon_de-pk_ersatzversorgung-erdgas","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/gk_schlichtungsstelle","title":"gk_schlichtungsstelle","id":"content-campaigns-eon_de-gk_schlichtungsstelle","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/gk_grundversorgung-strom","title":"gk_grundversorgung Strom","id":"content-campaigns-eon_de-gk_grundversorgung-strom","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/gk_grundversorgung-erdgas","title":"gk_grundversorgung Erdgas","id":"content-campaigns-eon_de-gk_grundversorgung-erdgas","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/gk_ersatzversorgung-strom","title":"gk_ersatzversorgung Strom","id":"content-campaigns-eon_de-gk_ersatzversorgung-strom","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/gk_ersatzversorgung-erdgas","title":"gk_ersatzversorgung Erdgas","id":"content-campaigns-eon_de-gk_ersatzversorgung-erdgas","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/test-lp-mit-mbox","title":"Test LP mit mbox","id":"content-campaigns-eon_de-test-lp-mit-mbox","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_doorpage_energiezukunft","title":"pk_doorpage_energiezukunft","id":"content-campaigns-eon_de-pk_doorpage_energiezukunft","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/pk_productdetailpage","title":"pk_productdetailpage","id":"content-campaigns-eon_de-pk_productdetailpage","experiences":[],"cloudConfiguration":""},{"path":"/content/campaigns/eon_de/tnt-prod","title":"TNT_prod","id":"content-campaigns-eon_de-tnt-prod","experiences":[],"cloudConfiguration":""}];
    console.log(campaigns);
	CQ_Analytics.CampaignMgr.addInitProperty('campaigns', campaigns);
	CQ_Analytics.CampaignMgr.init();
}
if( CQ_Analytics && CQ_Analytics.TagCloudMgr) {
    CQ_Analytics.TagCloudMgr.init([
]);
}if( CQ_Analytics && CQ_Analytics.PageDataMgr) {
    CQ_Analytics.PageDataMgr.loadInitProperties({
  "hits": 0,
  "title": "Online-Vertragsabschluss",
  "path": "/content/eon_de/pk/de/tools/online-vertragsabschluss",
  "navTitle": "Online-Vertragsabschluss",
  "template": "/apps/eonde/templates/ovapage",
  "thumbnail": "/apps/eonde/templates/ovapage/thumbnail.png",
  "tags": "",
  "description": "",
  "sitesection": "pk",
  "subsection": "de",
  "random": "0.76"
}, true);
}
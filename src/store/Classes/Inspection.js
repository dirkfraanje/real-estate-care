import InspectionDetails from "./InspectionDetails";
import Location from "./Location";
import Damage from "@/store/Classes/Damage";
import DeferedMaintenance from "./DeferedMaintenance";
import TechnicalInstallation from "./TechnicalInstallation";
import Modification from "./Modification";

export default class Inspection {
    constructor(jsonInspection) {
        this.id = jsonInspection.id;
        //Details
        this.inspection = new InspectionDetails(jsonInspection.inspection);
        //Location details
        this.inspection.location = new Location(jsonInspection.inspection.location);
        //Damages
        this.damages = jsonInspection.damages.map(
            damage => new Damage(damage, this.id, null)
        );
        //Defered maintenance
        this.deferred_maintenance = jsonInspection.deferred_maintenance.map(
            maintenance => new DeferedMaintenance(maintenance)
        );
        //Technical installations
        this.technical_installations = jsonInspection.technical_installations.map(
            installation => new TechnicalInstallation(installation)
        );
        //Already documented modifications
        this.already_documented_modifications = jsonInspection.already_documented_modifications.map(
            modification => new Modification(modification)
        );
        //Newly inventoried modifications during inspection
        this.newly_inventoried_modifications_during_inspection = jsonInspection.newly_inventoried_modifications_during_inspection.map(
            modification => new Modification(modification)
        );
    }
}
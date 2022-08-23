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
            maintenance => new DeferedMaintenance(maintenance, this.id, null)
        );
        //Technical installations
        this.technical_installations = jsonInspection.technical_installations.map(
            installation => new TechnicalInstallation(installation, this.id, null)
        );
        //Modifications
        this.modifications = jsonInspection.modifications.map(
            modification => new Modification(modification, this.id, null)
        );
    }
}
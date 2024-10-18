import { mailModels } from "@mail/../tests/mail_test_helpers";
import { fields } from "@web/../tests/web_test_helpers";

export class ResPartner extends mailModels.ResPartner {
    out_of_office_date_end = fields.Date();

    compute_im_status(partner) {
        if (partner.out_of_office_date_end) {
            if (partner.im_status === "online") {
                return "leave_online";
            } else if (partner.im_status === "away") {
                return "leave_away";
            } else {
                return "leave_offline";
            }
        } else {
            return super.compute_im_status(partner);
        }
    }

    /**
     * Overrides to add out of office to employees.
     * @override
     * @type {typeof mailModels.ResPartner["prototype"]["mail_partner_format"]}
     */
    mail_partner_format(ids) {
        const partnerFormats = super.mail_partner_format(...arguments);
        const partners = this.browse(ids);
        for (const partner of partners) {
            // Not a real field but ease the testing
            partnerFormats[partner.id].out_of_office_date_end = partner.out_of_office_date_end;
        }
        return partnerFormats;
    }
}

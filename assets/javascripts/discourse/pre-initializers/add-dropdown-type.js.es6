import UserField from "admin/models/user-field";
import { i18n } from "discourse/lib/computed";

const UserFieldType = Ember.Object.extend({
  name: i18n("id", "admin.user_fields.field_types.%@")
});

export default{
  name:'update-post',
  before: 'inject-discourse-objects',
  initialize(){
    UserField.reopenClass({
      fieldTypes() {
        if (!this._fieldTypes) {
          this._fieldTypes = [
            UserFieldType.create({ id: "text" }),
            UserFieldType.create({ id: "confirm" }),
            UserFieldType.create({ id: "dropdown", hasOptions: true }),
            UserFieldType.create({ id: "multiselect-dropdown", hasOptions: true })
          ];
        }

        return this._fieldTypes;
      },
    });
  }
}

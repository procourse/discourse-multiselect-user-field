import { withPluginApi } from 'discourse/lib/plugin-api';
import { i18n } from "discourse/lib/computed";
import { observes, on } from "ember-addons/ember-computed-decorators";

const UserFieldType = Ember.Object.extend({
  name: i18n("id", "admin.user_fields.field_types.%@")
});

export default{
  name:'update-post',
  before: 'inject-discourse-objects',
  initialize(){
    withPluginApi('0.8.12', api => {

      api.modifyClassStatic('model:user-field',{
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

      api.modifyClass('component:user-field',{
        values: [],

        @on("init")
        initValues() {
          if (this.field.field_type == "multiselect-dropdown" && this.value) {
            try {
              const parsedValue = JSON.parse(this.value);
              this.set("values", parsedValue);
            } catch (e) {
              this.set("values", []);
            }
          }
        },

        @observes("values")
        setValue(){
          this.set("value", JSON.stringify(this.get("values")));
        },
      });
  });
  }
}

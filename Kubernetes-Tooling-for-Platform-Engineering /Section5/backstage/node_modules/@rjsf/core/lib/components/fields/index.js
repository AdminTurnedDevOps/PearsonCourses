import ArrayField from './ArrayField';
import BooleanField from './BooleanField';
import MultiSchemaField from './MultiSchemaField';
import NumberField from './NumberField';
import ObjectField from './ObjectField';
import SchemaField from './SchemaField';
import StringField from './StringField';
import NullField from './NullField';
function fields() {
    return {
        AnyOfField: MultiSchemaField,
        ArrayField: ArrayField,
        // ArrayField falls back to SchemaField if ArraySchemaField is not defined, which it isn't by default
        BooleanField,
        NumberField,
        ObjectField,
        OneOfField: MultiSchemaField,
        SchemaField,
        StringField,
        NullField,
    };
}
export default fields;
//# sourceMappingURL=index.js.map
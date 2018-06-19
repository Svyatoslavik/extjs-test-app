Ext.define('testApp.model.User', {
    extend: 'testApp.model.Base',
    idProperty: 'id',
    identifier: {
        type: 'sequential',
        seed: 1
    },
    requires: ['Ext.data.validator.Inclusion', 'Ext.data.validator.Length', 'Ext.data.identifier.Sequential'],

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name',  type: 'string'},
        {name: 'startDate',  type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'endDate',  type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'status',  type: 'string', defaultValue: testApp.model.UserStatus.STOPPED},
    ],

    validators: {
        name: { type: 'length', min: 1, max: 255 },
        status: { type: 'inclusion', list: [
            testApp.model.UserStatus.RUNNING, 
            testApp.model.UserStatus.STOPPED
        ] },
    }
});

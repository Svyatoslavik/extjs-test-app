/**
 * This view is an example list of people.
 */
Ext.define('testApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    selType: 'checkboxmodel',

    height: 250,
    columnWidth: 0.65,

    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },

    columns: [{
        text: 'ID',
        dataIndex: 'id',
        sortable: true
    }, {
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        sortable: true,
        items: {
            xtype: 'textfield',
            reference: 'nameFilterField',
            flex : 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Start Date',
        dataIndex: 'startDate',
        formatter: 'date("m/d/Y")',
        width: 115,
        sortable: true
    }, {
        text: 'End Date',
        dataIndex: 'endDate',
        formatter: 'date("m/d/Y")',
        width: 115,
        sortable: true,
    }, {
        text: 'Status',
        dataIndex: 'status',
        width: 100,
        sortable: true
    }]
});

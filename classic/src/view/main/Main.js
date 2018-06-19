/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('testApp.view.main.Main', {
    extend: 'Ext.form.Panel',
    xtype: 'app-main',
    controller: 'main',
    viewModel: 'main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.Toast',
        'testApp.view.main.MainController',
        'testApp.view.main.MainModel',
        'testApp.model.User',
        'testApp.store.User'
    ],

    title: 'Users editor',
    width: 880,
    frame: true,
    bodyPadding: 5,

    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 90,
        anchor: '100%',
        msgTarget: 'side'
    },

    tbar: {
        items: [{
            text: 'Add',
            handler: 'onAddNewPressed'
        }, {
            text: 'Remove',
            handler: 'onRemovePressed',
            disabled: true,
            bind: {
                disabled: '{!user}'
            }
        }, '-', {
            text: 'Run',
            handler: 'onRunPressed',
            disabled: true,
            bind: {
                disabled: '{!isRunBtnActive}'
            }
        }, {
            text: 'Stop',
            handler: 'onStopPressed',
            disabled: true,
            bind: {
                disabled: '{!isStopBtnActive}'
            }
        }]
    },

    items: [{
        layout: 'column',
        items: [{
            xtype: 'mainlist',
            reference: 'usersList',
            bind: {
                selection: '{user}'
            },
            listeners: {
                selectionchange: 'onSelectionChange',
            },
            store: {
                type: 'user'
            }
        }, {
            xtype: 'fieldset',
            title: 'User details',

            columnWidth: 0.35,
            margin: '0 0 0 10',
            layout: 'anchor',
            defaultType: 'textfield',
            modelValidation: true,
            disabled: true,
            bind: {
                disabled: '{!isFormActive}'
            },

            items: [{
                fieldLabel: 'id',
                bind: '{user.id}',
                readOnly: true,
                disabled: true
            }, {
                fieldLabel: 'Name',
                bind: '{user.name}'
            }, {
                fieldLabel: 'Start Date',
                xtype: 'datefield',
                bind: '{user.startDate}'
            }, {
                fieldLabel: 'End Date',
                xtype: 'datefield',
                bind: {
                    value: '{user.endDate}',
                    minValue:'{user.startDate}'
                }
            }]
        }]
    }, {
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [{
            xtype: 'button',
            text: 'Submit',
            handler: 'onSubmitPressed',
            disabled: true,
            bind: {
                disabled: '{!isStoreHasChanges}'
            }
        }, {
            xtype: 'button',
            text: 'Cancel',
            handler: 'onCancelPressed',
            disabled: true,
            bind: {
                disabled: '{!isStoreHasChanges}'
            }
        }]
    }]
});

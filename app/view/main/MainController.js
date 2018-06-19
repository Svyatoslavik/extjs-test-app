/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('testApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function() {
        this.usersList = this.lookupReference('usersList');
        this.store = this.usersList.getStore();
        this.store.on('datachanged', this.onStoreDataChanged.bind(this));
    },

    onSelectionChange: function (selModel, records) {
        this.checkFormAndShowWarningIfNeeded();
        this.getViewModel().set('isFormActive', records.length == 1);
        this.updateRunStopActiveState(records);
    },

    onStoreDataChanged() {
        this.getViewModel().set('isStoreHasChanges', 
            !!this.store.getModifiedRecords().concat(this.store.getRemovedRecords()).length);
            this.updateRunStopActiveState(this.usersList.selModel.selected.items);
    },

    updateRunStopActiveState(records) {
        this.getViewModel().setData({
            isRunBtnActive: records.some(r => r.get('status') === testApp.model.UserStatus.STOPPED),
            isStopBtnActive: records.some(r => r.get('status') === testApp.model.UserStatus.RUNNING)
        });
    },

    checkFormAndShowWarningIfNeeded: function() {
        if (this.getViewModel().get('isFormActive') && 
            !this.getView().getForm().isValid()) {
                Ext.Msg.alert('Waringin', 'Form has errors, changes haven\'t been saved.', Ext.emptyFn);
            }
    },

    onRemovePressed: function() {
        this.store.remove(this.usersList.selModel.selected.items);
    },

    onAddNewPressed: function() {
        var record = Ext.create('testApp.model.User');
        this.store.add(record);
    },

    onSubmitPressed: function() {
        Ext.Msg.confirm('Save', 
                'Are you sure that you want to save all changes?', 
                'onConfirmSubmit', this);
    },

    onCancelPressed: function() {
        Ext.Msg.confirm('Cancel', 
                'Are you sure that you want to reject all changes?', 
                'onConfirmRejectChanges', this);
        
    },

    onConfirmSubmit: function(choise) {
        if( 'yes' === choise){
            this.store.sync({
                success: function() {
                    Ext.toast('All changes have been saved!', 'Success', 't')
                },
                failure: function() {
                    Ext.Msg.alert('An error occurred', 'Data has\'n been saved.', Ext.emptyFn);
                }
            });
        }
    },

    onConfirmRejectChanges: function(choise) {
        if( 'yes' === choise){
            this.store.rejectChanges();
        }
    },

    onRunPressed: function() {
        this.changeStatus(this.usersList.selModel.selected.items, testApp.model.UserStatus.RUNNING);
    },

    onStopPressed: function() {
        this.changeStatus(this.usersList.selModel.selected.items, testApp.model.UserStatus.STOPPED);
    },

    changeStatus: function(list, newStatus) {
        list.forEach(el => el.set('status', newStatus));
    },

    onNameFilterKeyup: function() {
        var filterField = this.lookupReference('nameFilterField'),
        filters = this.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'nameFilter',
                property      : 'name',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
});

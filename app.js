/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'testApp.Application',

    name: 'testApp',

    requires: [
        // This will automatically load all classes in the testApp namespace
        // so that application classes do not need to require each other.
        'testApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'testApp.view.main.Main'
});

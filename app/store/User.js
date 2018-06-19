Ext.define('testApp.store.User', {
    extend: 'Ext.data.Store',

    alias: 'store.user',

    model: 'testApp.model.User',

    data: { 
        items: [
            {"name":"Joe Doe","startDate":"2018-06-13 00:00:00","endDate":"2018-06-19 00:00:00","status":"STOPPED"},
            {"name":"Alisa","startDate":"2018-06-03 00:00:00","endDate":"2018-06-30 00:00:00","status":"RUNNING"},
            {"name":"Manager","startDate":"2018-06-17 00:00:00","endDate":"2018-06-29 00:00:00","status":"STOPPED"},
            {"name":"Iron Man","startDate":"2018-06-18 00:00:00","endDate":"2024-01-05 00:00:00","status":"RUNNING"}
        ]
    },

    // autoLoad: true,
    // requires: ['Ext.data.proxy.LocalStorage'],
    // proxy: {
    //     type: 'localstorage',
    //     id: 'userstorage'
    // }

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
   
});

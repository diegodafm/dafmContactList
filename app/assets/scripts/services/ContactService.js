app.service( 'ContactService', [ '$log',
    function ( $log ) {

        return {
            add: function ( contact ) {
                var list = this.getAllContacts();
                contact.id = 'id_' + ( new Date() ).getTime();
                list.push( contact );
                localStorage.dafmContactList = angular.toJson( list );
            },

            edit: function ( contact ) {
                var list = angular.fromJson( localStorage.dafmContactList );
                for ( var i = list.length - 1; i >= 0; i-- ) {
                    if ( list[ i ].id == contact.id ) {
                        list[ i ] = contact;
                    }
                }
                localStorage.dafmContactList = angular.toJson( list );
            },

            remove: function ( contact ) {
                var list = angular.fromJson( localStorage.dafmContactList );
                for ( var i = list.length - 1; i >= 0; i-- ) {
                    if ( list[ i ].id == contact.id ) {
                        list.splice( i, 1 );
                    }
                }
                localStorage.dafmContactList = angular.toJson( list );
            },

            getAllContacts: function () {
                if ( !localStorage.dafmContactList || localStorage.dafmContactList === "" ) {
                    return [];
                } else {
                    return angular.fromJson( localStorage.dafmContactList );
                }
            }
        };
    }
] );

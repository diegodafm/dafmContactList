app.controller( 'ContactController', [ 'ContactService', '$scope', '$modal',

    function ( ContactService, $scope, $modal ) {

        $scope.list = ContactService.getAllContacts();

        $scope.editContact = function ( $contact ) {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/editContact.html',
                controller: 'EditUserController',
                resolve: {
                    contact: function () {
                        return $contact;
                    }
                }
            } ).result.then( function ( result ) {
                ContactService.edit( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };

        $scope.newContact = function () {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/editContact.html',
                controller: 'NewUserController'
            } ).result.then( function ( result ) {
                ContactService.add( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };

        $scope.removeContact = function ( $contact ) {
            var modalInstance = $modal.open( {
                templateUrl: 'templates/removeContact.html',
                controller: 'RemoveUserController',
                resolve: {
                    contact: function () {
                        return $contact;
                    }
                }
            } ).result.then( function ( result ) {
                ContactService.remove( result.contact );
                $scope.list = ContactService.getAllContacts();
            } );
        };
    }
] );

app.controller( 'EditUserController', function ( $rootScope, $scope, $modalInstance, contact ) {
    $scope.title = 'Edit Contact';
    $scope.contact = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };
} );


app.controller( 'NewUserController', function ( $rootScope, $scope, $modalInstance ) {
    $scope.title = 'Add Contact';
    $scope.contact = {
        id: '',
        name: '',
        phone: '',
        address: ''
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

} );

app.controller( 'RemoveUserController', function ( $rootScope, $scope, $modalInstance, contact ) {
    $scope.title = 'Remove Contact';
    $scope.contact = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
    };

    $scope.cancel = function () {
        $modalInstance.dismiss( 'cancel' );
    };

    $scope.ok = function () {
        $modalInstance.close( $scope );
    };

} );
